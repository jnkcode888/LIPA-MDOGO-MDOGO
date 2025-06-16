import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('website_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Fetched data:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-container">
      <h1>Website Requests Dashboard</h1>
      <div className="admin-grid">
        {users.map((user) => (
          <div key={user.id} className="admin-card">
            <div className="admin-card-header">
              <h2>{user.businessDescription || 'New Request'}</h2>
              <span className="admin-date">{formatDate(user.created_at)}</span>
            </div>
            
            <div className="admin-card-section">
              <h3>Contact Information</h3>
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>WhatsApp:</strong> {user.whatsapp}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="admin-card-section">
              <h3>Business Details</h3>
              <p><strong>Business Description:</strong> {user.businessDescription}</p>
              <p><strong>Website Types:</strong> {user.websiteTypes?.join(', ')}</p>
              <p><strong>Target Audience:</strong> {user.targetAudience}</p>
              <p><strong>Competitors:</strong> {user.competitors}</p>
            </div>

            <div className="admin-card-section">
              <h3>Features</h3>
              <p><strong>Selected Features:</strong> {user.features?.join(', ')}</p>
              <p><strong>Additional Features:</strong> {user.additionalFeatures}</p>
            </div>

            <div className="admin-card-section">
              <h3>Design Preferences</h3>
              <p><strong>Branding:</strong> {user.branding}</p>
              <p><strong>Design Styles:</strong> {user.designStyles?.join(', ')}</p>
              <p><strong>Reference Websites:</strong> {user.referenceWebsites}</p>
            </div>

            <div className="admin-card-section">
              <h3>Technical Requirements</h3>
              <p><strong>Technical Needs:</strong> {user.technicalrequirements}</p>
              <p><strong>Hosting Preferences:</strong> {user.hostingpreferences}</p>
              <p><strong>Maintenance:</strong> {user.maintenance}</p>
            </div>

            <div className="admin-card-section">
              <h3>Timeline & Budget</h3>
              <p><strong>Timeline:</strong> {user.timeline}</p>
              <p><strong>Budget Range:</strong> {user.budgetRange}</p>
              <p><strong>Budget:</strong> {user.budget}</p>
              <p><strong>Deadline:</strong> {user.deadline}</p>
            </div>

            <div className="admin-card-section">
              <h3>Payment Details</h3>
              <p><strong>Payment Option:</strong> {user.paymentoption}</p>
              <p><strong>Deposit Amount:</strong> {user.depositamount}</p>
              <p><strong>Installments:</strong> {user.installments}</p>
              <p><strong>Installment Amount:</strong> {user.installmentamount}</p>
            </div>

            <div className="admin-card-section">
              <h3>Additional Information</h3>
              <p><strong>Additional Notes:</strong> {user.additionalNotes}</p>
              <p><strong>Uploaded Files:</strong> {user.files?.length || 0} files</p>
            </div>

            <div className="admin-card-footer">
              <span className="admin-status">Status: {user.status || 'New'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage; 