import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormContext } from '../../context/FormContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const FEATURES_OPTIONS = [
  'Contact form',
  'WhatsApp chat',
  'Payments',
  'Booking',
  'Blog',
  'Gallery',
  'Login system',
  'Multi-language',
  'Newsletter',
  'Search',
  'Other',
  "I'm not sure – recommend"
];

const Step3Features = () => {
  const { formData, setFormData, setCurrentStep } = useContext(FormContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.features || formData.features.length === 0) {
      newErrors.features = 'Please select at least one feature.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (option) => {
    setFormData(prev => {
      const arr = prev.features || [];
      return {
        ...prev,
        features: arr.includes(option)
          ? arr.filter(item => item !== option)
          : [...arr, option]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(4);
      navigate('/step4');
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
    navigate('/step2');
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
      <h2 className="form-title">Features You Want</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select the features you want</label>
          <div className="checkbox-group">
            {FEATURES_OPTIONS.map(option => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.features?.includes(option) || false}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <small className="helper-text">You can select more than one. If unsure, pick "I'm not sure – recommend".</small>
          {errors.features && <div className="error-message">{errors.features}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="additionalFeatures">
            Additional Features
          </label>
          <textarea
            id="additionalFeatures"
            className="form-textarea"
            value={formData.additionalFeatures}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalFeatures: e.target.value }))}
            placeholder="Describe any other features you want..."
            rows={3}
          />
          <small className="helper-text">Optional. List any features not covered above.</small>
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

export default Step3Features; 