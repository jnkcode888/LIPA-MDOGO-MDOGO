import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormContext } from '../../context/FormContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const WEBSITE_TYPE_OPTIONS = [
  'Online store',
  'Business profile',
  'School system',
  'Booking system',
  'Portfolio',
  'News site',
  'Other',
  "I'm not sure – suggest"
];

const Step2Purpose = () => {
  const { formData, setFormData, setCurrentStep } = useContext(FormContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = 'Please describe your business or project.';
    }
    if (!formData.websiteType || formData.websiteType.trim() === '') {
      newErrors.websiteType = 'Please select a website type.';
    }
    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = 'Target audience is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRadioChange = (option) => {
    setFormData(prev => ({ ...prev, websiteType: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(3);
      navigate('/step3');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    navigate('/');
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
      <h2 className="form-title">Tell Us About Your Business or Idea</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="businessDescription">
            What is your business or project about?
          </label>
          <textarea
            id="businessDescription"
            className="form-textarea"
            value={formData.businessDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
            placeholder="Describe your business, project, or idea..."
            rows={3}
          />
          <small className="helper-text">Give us a short summary of what you do or plan to do.</small>
          {errors.businessDescription && <div className="error-message">{errors.businessDescription}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">What type of website do you need?</label>
          <div className="website-type-radio-group">
            {WEBSITE_TYPE_OPTIONS.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="websiteType"
                  value={option}
                  checked={formData.websiteType === option}
                  onChange={() => handleRadioChange(option)}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <small className="helper-text">Select one option.</small>
          {errors.websiteType && <div className="error-message">{errors.websiteType}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="targetAudience">
            Who is your target audience?
          </label>
          <input
            type="text"
            id="targetAudience"
            className="form-input"
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            placeholder="Describe your ideal customer or user."
          />
          <small className="helper-text">Who are you building this for?</small>
          {errors.targetAudience && <div className="error-message">{errors.targetAudience}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="competitors">
            Do you have any competitors or similar websites you admire?
          </label>
          <input
            type="text"
            id="competitors"
            className="form-input"
            value={formData.competitors}
            onChange={(e) => setFormData(prev => ({ ...prev, competitors: e.target.value }))}
            placeholder="List URLs or names, separated by commas."
          />
          <small className="helper-text">Optional, but helps us understand your vision.</small>
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

export default Step2Purpose; 