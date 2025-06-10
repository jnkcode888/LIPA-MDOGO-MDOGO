import React from 'react';
import { motion } from 'framer-motion';
import './LandingHero.css';

const benefitData = [
  { icon: '💸', title: 'Affordable', desc: 'Pay in easy, flexible installments.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Get online quickly with our streamlined process.' },
  { icon: '🎨', title: 'Modern Designs', desc: 'Beautiful, mobile-friendly websites.' },
];

const trustedLogos = [
  'src/assets/logo1.png',
  'src/assets/logo2.png',
  'src/assets/logo3.png',
];

const LandingHero = ({ onGetStarted }) => (
  <section className="hero-bg">
    {/* Lottie animation as full background */}
    <div className="hero-lottie-bg">
      <iframe
        src="https://lottie.host/embed/6b3384b1-8a47-4bb7-aff8-a6bfd89a3886/MtWp1wvX1g.lottie"
        title="Lipa Mdogo Mdogo Animation"
        style={{ width: '100vw', height: '100vh', border: 'none', background: 'transparent', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        allowFullScreen
      />
    </div>
    <motion.div
      className="hero-content floating-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ position: 'relative', zIndex: 2 }}
    >
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Lipa Mdogo Mdogo Websites
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Get a professional website. Pay in affordable installments.
      </motion.p>
      <motion.button
        className="hero-btn"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGetStarted}
      >
        Get Started
      </motion.button>
      <motion.div className="hero-testimonial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
        💬 300+ websites built for Kenyan businesses
      </motion.div>
      <div className="hero-benefits">
        {benefitData.map((b, i) => (
          <motion.div className="benefit-card" key={b.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.2 }}>
            <span className="benefit-icon">{b.icon}</span>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="hero-trusted">
        <span>Trusted by businesses in Kenya</span>
        <div className="trusted-logos">
          {trustedLogos.map((src, i) => (
            <img src={src} alt="Trusted logo" key={i} />
          ))}
        </div>
      </div>
    </motion.div>
    {/* Floating shapes */}
    <div className="hero-shape hero-shape1" />
    <div className="hero-shape hero-shape2" />
    <div className="hero-shape hero-shape3" />
  </section>
);

export default LandingHero; 