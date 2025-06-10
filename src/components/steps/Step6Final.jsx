import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../context/FormContext';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import './Step6Final.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Step6Final = () => {
  const navigate = useNavigate();
  const { formData } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare the data for submission, matching the new Supabase schema
      const submissionData = {
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        businessDescription: formData.businessDescription,
        websiteTypes: formData.websiteTypes || [],
        targetAudience: formData.targetAudience,
        competitors: formData.competitors,
        features: formData.features || [],
        additionalFeatures: formData.additionalFeatures,
        branding: formData.branding,
        designStyles: formData.designStyles || [],
        referenceWebsites: formData.referenceWebsites,
        technicalrequirements: formData.technicalNeeds,
        hostingpreferences: formData.domain, // or formData.hostingPreferences if you use that
        maintenance: formData.maintenance,
        budget: formData.budget,
        deadline: formData.completionDate,
        additionalNotes: formData.additionalNotes,
        paymentoption: formData.paymentMethod,
        depositamount: formData.depositAmount,
        installments: formData.installments,
        installmentamount: formData.installmentAmount,
        files: formData.uploadedImages || [],
        isDraft: false,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('website_requests')
        .insert([submissionData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      navigate('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/step5');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="form-container"
    >
      <h2 className="form-title">Review Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          <div className="summary-section">
            <h3>1. Basic Information</h3>
            <div className="grid grid-cols-1">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">WhatsApp</p>
                <p className="font-medium">{formData.whatsapp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Step 2: Purpose */}
          <div className="summary-section">
            <h3>2. Business & Purpose</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Business Description</p>
                <p className="font-medium">{formData.businessDescription}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Website Types</p>
                <p className="font-medium">{formData.websiteTypes?.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Target Audience</p>
                <p className="font-medium">{formData.targetAudience}</p>
              </div>
              {formData.competitors && (
                <div>
                  <p className="text-sm text-gray-600">Competitors</p>
                  <p className="font-medium">{formData.competitors}</p>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Features */}
          <div className="summary-section">
            <h3>3. Features</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Selected Features</p>
                <p className="font-medium">{formData.features?.join(', ')}</p>
              </div>
              {formData.additionalFeatures && (
                <div>
                  <p className="text-sm text-gray-600">Additional Features</p>
                  <p className="font-medium">{formData.additionalFeatures}</p>
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Design */}
          <div className="summary-section">
            <h3>4. Design & Style</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Branding</p>
                <p className="font-medium">{formData.branding}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Design Styles</p>
                <p className="font-medium">{formData.designStyles?.join(', ')}</p>
              </div>
              {formData.referenceWebsites && (
                <div>
                  <p className="text-sm text-gray-600">Reference Websites</p>
                  <p className="font-medium">{formData.referenceWebsites}</p>
                </div>
              )}
              {formData.designMaterials?.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Uploaded Materials</p>
                  <p className="font-medium">{formData.designMaterials.length} files</p>
                </div>
              )}
            </div>
          </div>

          {/* Step 5: Timeline & Budget */}
          <div className="summary-section">
            <h3>5. Timeline & Budget</h3>
            <div className="grid grid-cols-1">
              <div>
                <p className="text-sm text-gray-600">Timeline</p>
                <p className="font-medium">{formData.timeline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Range</p>
                <p className="font-medium">{formData.budgetRange}</p>
              </div>
              {formData.additionalNotes && (
                <div>
                  <p className="text-sm text-gray-600">Additional Notes</p>
                  <p className="font-medium">{formData.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Step6Final;