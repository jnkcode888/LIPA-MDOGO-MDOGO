import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormContext } from '../../context/FormContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Not sure'
];

const BUDGET_RANGES = [
  'Under KES 100,000',
  'KES 100,000 - KES 300,000',
  'KES 300,000 - KES 500,000',
  'KES 500,000 - KES 1,000,000',
  'Over KES 1,000,000',
  'Not sure'
];

const PAYMENT_METHODS = [
  'Pay full amount',
  'Lipa Mdogo Mdogo'
];

const Step5Technical = () => {
  const { formData, setFormData, setCurrentStep } = useContext(FormContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.timeline) {
      newErrors.timeline = 'Please select a timeline.';
    }
    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Please select a budget range.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(6);
      navigate('/step6');
    }
  };

  const handleBack = () => {
    setCurrentStep(4);
    navigate('/step4');
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
      <h2 className="form-title">Timeline & Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">When do you need the website?</label>
          <div className="timeline-radio-group">
            {TIMELINE_OPTIONS.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timeline"
                  value={option}
                  checked={formData.timeline === option}
                  onChange={() => handleRadioChange('timeline', option)}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <small className="helper-text">Select when you need the website completed.</small>
          {errors.timeline && <div className="error-message">{errors.timeline}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">What is your budget range?</label>
          <div className="budget-radio-group">
            {BUDGET_RANGES.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="budgetRange"
                  value={option}
                  checked={formData.budgetRange === option}
                  onChange={() => handleRadioChange('budgetRange', option)}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <small className="helper-text">Select your budget range for the project.</small>
          {errors.budgetRange && <div className="error-message">{errors.budgetRange}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">How would you like to pay?</label>
          <div className="payment-radio-group">
            {PAYMENT_METHODS.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option}
                  checked={formData.paymentMethod === option}
                  onChange={() => handleRadioChange('paymentMethod', option)}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <small className="helper-text">Choose your preferred payment method.</small>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="additionalNotes">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            className="form-textarea"
            value={formData.additionalNotes || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            placeholder="Any other information about timeline or budget..."
            rows={4}
          />
          <small className="helper-text">Optional. Add any additional details about your timeline or budget requirements.</small>
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

export default Step5Technical; 