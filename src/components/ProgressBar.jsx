import { useLocation } from 'react-router-dom';
import './ProgressBar.css';

const ProgressBar = () => {
  const location = useLocation();
  const totalSteps = 6;
  
  const getCurrentStep = () => {
    const path = location.pathname;
    if (path === '/') return 1;
    if (path === '/success') return totalSteps;
    return parseInt(path.replace('/step', ''));
  };

  const currentStep = getCurrentStep();
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    'Basic Info',
    'Purpose & Pages',
    'Features',
    'Design',
    'Technical',
    'Final'
  ];

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-text">
        Step {currentStep} of {totalSteps}
      </div>
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${index + 1 <= currentStep ? 'active' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar; 