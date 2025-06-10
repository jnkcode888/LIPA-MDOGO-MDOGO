import { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    whatsapp: '',
    email: '',
    // Step 2
    businessDescription: '',
    websiteType: '', // radio (single selection)
    targetAudience: '',
    competitors: '',
    // Step 3
    features: [], // checkboxes
    additionalFeatures: '',
    // Step 4
    branding: '', // radio
    designStyles: [], // checkboxes
    referenceWebsites: '',
    uploadedImages: [], // file array
    // Step 5
    domain: '', // radio
    maintenance: '', // radio
    technicalNeeds: '',
    // Step 6
    budget: '',
    completionDate: '',
    paymentMethod: '', // radio
    depositAmount: '',
    installmentAmount: '',
    installments: '',
    // Step 7
    additionalNotes: '',
    // Step 8 (meta)
    isDraft: false,
  });

  // Debug log for initial state
  // console.log('FormContext initialized with:', { currentStep, formData });

  return (
    <FormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
}; 