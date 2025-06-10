import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="success-container"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="success-icon"
      >
        ✓
      </motion.div>
      <h1 className="success-title">Thank You!</h1>
      <p className="success-message">
        Your website request has been received. We'll review your requirements and
        contact you shortly.
      </p>
      <Link to="/" className="btn btn-primary">
        Submit Another Request
      </Link>
    </motion.div>
  );
};

export default Success; 