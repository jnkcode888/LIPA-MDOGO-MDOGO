import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import './AdminPage.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: 'spring', stiffness: 80 }
  })
};

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('website_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) setError('Failed to fetch data.');
      else setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Website Requests Admin</h1>
      {loading && <div className="admin-loading">Loading...</div>}
      {error && <div className="admin-error">{error}</div>}
      <div className="admin-grid">
        {requests.map((req, i) => (
          <motion.div
            className="admin-card"
            key={req.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(80,80,180,0.12)' }}
          >
            <div className="admin-card-header">
              <span className="admin-card-status {req.status}">{req.status || 'pending'}</span>
              <span className="admin-card-date">{new Date(req.created_at).toLocaleString()}</span>
            </div>
            <div className="admin-card-body">
              <h2>{req.name || req.fullName}</h2>
              <p><b>Email:</b> {req.email}</p>
              <p><b>WhatsApp:</b> {req.whatsapp}</p>
              <p><b>Website Type:</b> {req.websiteType || req.websiteTypes || req.businesstype || req.businessDescription}</p>
              <p><b>Features:</b> {Array.isArray(req.features) ? req.features.join(', ') : req.features}</p>
              <p><b>Budget:</b> {req.budget || req.budgetRange}</p>
              <p><b>Deadline:</b> {req.deadline || req.completionDate}</p>
              <p><b>Status:</b> {req.status}</p>
            </div>
            <div className="admin-card-footer">
              <a href={`mailto:${req.email}`} className="admin-card-action">Email</a>
              <a href={`https://wa.me/${req.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="admin-card-action">WhatsApp</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage; 