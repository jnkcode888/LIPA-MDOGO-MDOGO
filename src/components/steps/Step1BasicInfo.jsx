import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormContext } from '../../context/FormContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Step1BasicInfo = () => {
  const { formData, setFormData, setCurrentStep } = useContext(FormContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(2);
      navigate('/step2');
    }
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
      <h2 className="form-title">Let's Start With You</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="form-input"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name"
            autoComplete="name"
          />
          <small className="helper-text">Enter your full legal name.</small>
          {errors.fullName && <div className="error-message">{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="whatsapp">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            className="form-input"
            value={formData.whatsapp}
            onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="e.g., +254712345678"
            autoComplete="tel"
          />
          <small className="helper-text">We'll use this to contact you about your request.</small>
          {errors.whatsapp && <div className="error-message">{errors.whatsapp}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email address"
            autoComplete="email"
          />
          <small className="helper-text">We'll send updates to this email.</small>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="button-group">
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

export default Step1BasicInfo; 