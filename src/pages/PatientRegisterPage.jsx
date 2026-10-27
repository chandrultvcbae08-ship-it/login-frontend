import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Calendar, Heart, AlertCircle, CheckCircle2, Eye, EyeOff, Stethoscope, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PatientRegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    blood_group: 'O+',
    address: '',
    emergency_contact: '',
    medical_history: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerPatient } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      await registerPatient(formData);
      navigate('/patient/appointments');
    } catch (err) {
      let errorMsg = 'Registration failed. Please check your details and try again.';
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') {
          errorMsg = data;
        } else if (data.detail) {
          errorMsg = data.detail;
        } else if (data.message) {
          errorMsg = data.message;
        } else {
          const messages = [];
          for (const [key, val] of Object.entries(data)) {
            const field = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
            const text = Array.isArray(val) ? val.join(' ') : String(val);
            messages.push(`${field}: ${text}`);
          }
          if (messages.length > 0) {
            errorMsg = messages.join(' | ');
          }
        }
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '720px', padding: '36px 20px 60px' }}>
      {/* Role Switcher Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          backgroundColor: '#e2e8f0',
          padding: '6px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--primary)',
            backgroundColor: '#ffffff',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <User size={18} />
          <span>Patient Registration</span>
        </div>
        <Link
          to="/register/doctor"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <Stethoscope size={18} />
          <span>Doctor Registration</span>
          <span
            style={{
              fontSize: '0.68rem',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--primary-border)',
              fontWeight: 700,
            }}
          >
            Practitioners
          </span>
        </Link>
      </div>

      <div className="card" style={{ padding: '36px 32px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: '#eff6ff',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <User size={26} />
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '6px' }}>
            Patient Registration
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Create your MediConnect patient account to book appointments and track prescriptions
          </p>

          {/* Quick link banner to Doctor Registration */}
          <div
            style={{
              marginTop: '16px',
              backgroundColor: '#f0fdfa',
              border: '1px solid #99f6e4',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.825rem',
              color: '#0f766e',
            }}
          >
            <Stethoscope size={16} />
            <span>Are you a medical doctor or clinic?</span>
            <Link to="/register/doctor" style={{ fontWeight: 700, color: 'var(--primary)', textDecoration: 'underline' }}>
              Register as Doctor here
            </Link>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section: Basic Information */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
              Basic Information
            </h4>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: showPassword ? 'var(--primary)' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Medical & Profile Info */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
              Medical & Profile Details
            </h4>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  className="form-control"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select
                  name="blood_group"
                  className="form-control"
                  value={formData.blood_group}
                  onChange={handleChange}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Apartment, Street, City, Pincode"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Contact</label>
              <input
                type="text"
                name="emergency_contact"
                className="form-control"
                placeholder="Name & Relationship (e.g. Anita Sharma - Spouse: +91 98765 99999)"
                value={formData.emergency_contact}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Medical History / Known Allergies (Optional)</label>
              <textarea
                name="medical_history"
                rows="2"
                className="form-control"
                placeholder="e.g. Asthmatic, Penicillin allergy, Hypertension"
                value={formData.medical_history}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginBottom: '20px' }}
          >
            {loading ? <span className="spinner" style={{ width: '18px', height: '18px' }} /> : <CheckCircle2 size={18} />}
            Complete Registration
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              Already have an account? <Link to="/login" style={{ fontWeight: 700 }}>Log In here</Link>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
              Are you a medical doctor?{' '}
              <Link to="/register/doctor" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                Register as Doctor & Practitioner
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegisterPage;
