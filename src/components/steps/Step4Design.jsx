import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormContext } from '../../context/FormContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DESIGN_STYLE_OPTIONS = [
  'Modern',
  'Bold',
  'Minimal',
  'Creative',
  'Professional',
  'Show options'
];

const Step4Design = () => {
  const { formData, setFormData, setCurrentStep } = useContext(FormContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.branding) {
      newErrors.branding = 'Please select a branding option.';
    }
    if (!formData.designStyles || formData.designStyles.length === 0) {
      newErrors.designStyles = 'Please select at least one design style.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, branding: value }));
  };

  const handleCheckboxChange = (option) => {
    setFormData(prev => {
      const arr = prev.designStyles || [];
      return {
        ...prev,
        designStyles: arr.includes(option)
          ? arr.filter(item => item !== option)
          : [...arr, option]
      };
    });
  };

  const handleFileUpload = async (e) => {
    setUploadError('');
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Allowed types and max size (5MB)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only PNG and JPEG images are allowed.');
        return;
      }
      if (file.size > maxSize) {
        setUploadError('File size must be less than 5MB.');
        return;
      }
    }

    setUploadingFiles(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('website-requests')
          .upload(fileName, file);

        if (error) {
          setUploadError(error.message || 'Error uploading file.');
          throw error;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('website-requests')
          .getPublicUrl(fileName);
        
        uploadedUrls.push(publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        designMaterials: [...(prev.designMaterials || []), ...uploadedUrls]
      }));
    } catch (error) {
      if (!uploadError) setUploadError('Error uploading files. Please try again.');
      console.error('Error uploading files:', error);
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(5);
      navigate('/step5');
    }
  };

  const handleBack = () => {
    setCurrentStep(3);
    navigate('/step3');
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('website_requests')
        .insert([
          {
            ...formData,
            isDraft: true,
            created_at: new Date().toISOString()
          }
        ]);
      if (error) throw error;
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="form-container"
    >
      <h2 className="form-title">Design & Style</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Do you have branding materials?</label>
          <div className="branding-radio-group">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="branding"
                value="yes"
                checked={formData.branding === 'yes'}
                onChange={() => handleRadioChange('yes')}
                className="form-radio"
              />
              <span>Yes – I'll upload</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="branding"
                value="no"
                checked={formData.branding === 'no'}
                onChange={() => handleRadioChange('no')}
                className="form-radio"
              />
              <span>No – design for me</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="branding"
                value="not-sure"
                checked={formData.branding === 'not-sure'}
                onChange={() => handleRadioChange('not-sure')}
                className="form-radio"
              />
              <span>Not sure</span>
            </label>
          </div>
          <small className="helper-text">Select whether you have existing branding materials or need new ones.</small>
          {errors.branding && <div className="error-message">{errors.branding}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Design Style Preferences</label>
          <div className="checkbox-group">
            {DESIGN_STYLE_OPTIONS.map(option => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.designStyles?.includes(option) || false}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <small className="helper-text">Select the styles that appeal to you. You can choose multiple options.</small>
          {errors.designStyles && <div className="error-message">{errors.designStyles}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="referenceWebsites">
            Reference Websites
          </label>
          <input
            type="text"
            id="referenceWebsites"
            className="form-input"
            value={formData.referenceWebsites}
            onChange={(e) => setFormData(prev => ({ ...prev, referenceWebsites: e.target.value }))}
            placeholder="Enter URLs of websites you like..."
          />
          <small className="helper-text">Optional. Share links to websites whose design you admire.</small>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Design Materials</label>
          <div className="file-upload">
            <div className="file-upload-content">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/png, image/jpeg, image/jpg"
              />
              <label htmlFor="file-upload" className="file-upload-button cursor-pointer">
                {uploadingFiles ? 'Uploading...' : 'Choose files'}
              </label>
              <p className="file-upload-text">
                or drag and drop
              </p>
              <p className="file-upload-text text-xs">
                PNG, JPG up to 5MB
              </p>
              {uploadError && <div className="error-message">{uploadError}</div>}
            </div>
          </div>
          <small className="helper-text">Upload your logo, brand guidelines, or any other design materials.</small>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleBack} className="btn btn-secondary">
            Back
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Step4Design; 