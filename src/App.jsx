import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { FormProvider } from './context/FormContext';
import ProgressBar from './components/ProgressBar';
import Step1BasicInfo from './components/steps/Step1BasicInfo';
import Step2Purpose from './components/steps/Step2Purpose';
import Step3Features from './components/steps/Step3Features';
import Step4Design from './components/steps/Step4Design';
import Step5Technical from './components/steps/Step5Technical';
import Step6Final from './components/steps/Step6Final';
import Success from './components/Success';
import AdminPage from './components/AdminPage';
import LandingHero from './components/LandingHero';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <AnimatePresence mode="wait">
      {isLandingPage ? (
        <motion.div
          key="hero"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100vw', opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '100vw', minHeight: '100vh', top: 0, left: 0, zIndex: 20 }}
        >
          <LandingHero />
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100vw', opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ minHeight: '100vh', width: '100vw', position: 'relative', zIndex: 10 }}
        >
          <ProgressBar />
          <Routes>
            <Route path="/step2" element={<Step2Purpose />} />
            <Route path="/step3" element={<Step3Features />} />
            <Route path="/step4" element={<Step4Design />} />
            <Route path="/step5" element={<Step5Technical />} />
            <Route path="/step6" element={<Step6Final />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <FormProvider>
      <Router>
        <AppContent />
      </Router>
    </FormProvider>
  );
}

export default App; 