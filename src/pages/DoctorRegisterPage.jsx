import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Mail,
  Lock,
  Phone,
  Building,
  Award,
  MapPin,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  UserCheck,
  ShieldCheck,
  Calendar,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PRESET_AVATARS = [
  {
    label: 'Female Doctor 1',
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Male Doctor 1',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Female Doctor 2',
    url: 'https://images.unsplash.com/photo-1594824813572-c20e29b16521?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Male Doctor 2',
    url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
  },
];

const SPECIALIZATIONS = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'General Physician',
  'Orthopedic',
  'Gynecologist',
  'Ophthalmologist',
  'Psychiatrist',
  'Dentist',
];

const DoctorRegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    specialization: 'Cardiologist',
    qualifications: '',
    experience_years: 5,
    hospital_name: '',
    location: 'Bangalore, Indiranagar',
    consultation_fee: 600,
    bio: '',
    profile_image: PRESET_AVATARS[0].url,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerDoctor } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectAvatar = (url) => {
    setFormData((prev) => ({ ...prev, profile_image: url }));
  };

  const handleDemoFill = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setFormData({
      full_name: 'Dr. Sameer Deshmukh',
      email: `dr.sameer${randomNum}@mediconnect.com`,
      password: 'DoctorPass123!',
      confirm_password: 'DoctorPass123!',
      phone: '+91 98450 ' + randomNum,
      specialization: 'Cardiologist',
      qualifications: 'MBBS, MD (Cardiology), DM',
      experience_years: 8,
      hospital_name: 'Apollo Hospital & Heart Center',
      location: 'Bangalore, Koramangala',
      consultation_fee: 750,
      bio: 'Senior Consultant Cardiologist specializing in preventive cardiology, hypertension therapeutics, lipid management, and non-invasive cardiac diagnostic evaluations.',
      profile_image: PRESET_AVATARS[1].url,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please agree to the Medical Practitioner Terms of Practice and Code of Ethics.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    try {
      setLoading(true);
      // Clean up confirm_password before sending to API
      const { confirm_password, ...payload } = formData;
      await registerDoctor(payload);
      navigate('/doctor/dashboard');
    } catch (err) {
      let errorMsg = 'Doctor registration failed. Please verify your details.';
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') {
          errorMsg = data;
        } else if (data.detail) {
          errorMsg = data.detail;
        } else if (data.message) {
          errorMsg = data.message;
        } else {
          // Collect all validation errors across fields
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '820px', padding: '36px 20px 60px' }}>
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
        <Link
          to="/register/patient"
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
          <User size={18} />
          <span>Patient Registration</span>
        </Link>
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
        </div>
      </div>

      {/* Main Registration Card */}
      <div className="card" style={{ padding: '40px 36px', boxShadow: 'var(--shadow-lg)' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 18px rgba(37, 99, 235, 0.35)',
            }}
          >
            <Stethoscope size={30} />
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>
            Doctor & Specialist Registration
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto' }}>
            Join MediConnect to build your verified clinical practice, publish flexible appointment slots, manage patient consultations, and issue digital prescriptions.
          </p>

          {/* Quick Demo Fill Helper */}
          <div style={{ marginTop: '16px' }}>
            <button
              type="button"
              onClick={handleDemoFill}
              className="btn btn-outline btn-sm"
              style={{
                fontSize: '0.8rem',
                backgroundColor: '#f8fafc',
                borderStyle: 'dashed',
                gap: '6px',
                padding: '6px 14px',
              }}
            >
              <Sparkles size={14} color="var(--primary)" />
              Fill Sample Doctor Data (Fast Demo)
            </button>
          </div>
        </div>

        {/* Benefits Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#1e40af', fontWeight: 600 }}>
            <Calendar size={16} />
            <span>Custom Time Slots</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#1e40af', fontWeight: 600 }}>
            <FileText size={16} />
            <span>Digital Prescriptions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#1e40af', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            <span>Verified Practitioner</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#1e40af', fontWeight: 600 }}>
            <UserCheck size={16} />
            <span>Direct Patient Queues</span>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '24px' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, marginBottom: '2px' }}>Registration Error</div>
              <div style={{ fontSize: '0.875rem' }}>{error}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Account Credentials */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingBottom: '10px',
                borderBottom: '2px solid #eff6ff',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Account & Login Credentials
              </h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name (with Dr. prefix) *</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-control"
                  placeholder="e.g. Dr. Rajesh Verma"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
                <span className="form-hint">Include Dr. prefix as you wish it displayed to patients.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Professional Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Mail size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
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
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px', paddingRight: '40px' }}
                  />
                  <Lock size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
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
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm_password"
                    className="form-control"
                    placeholder="Repeat password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px', paddingRight: '40px' }}
                  />
                  <Lock size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: showConfirmPassword ? 'var(--primary)' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone / Clinic Mobile *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+91 98450 12345"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '38px' }}
                />
                <Phone size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>

          {/* Section 2: Professional Qualifications */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingBottom: '10px',
                borderBottom: '2px solid #eff6ff',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Medical Qualifications & Practice
              </h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Medical Specialization *</label>
                <select
                  name="specialization"
                  className="form-control"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  {SPECIALIZATIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Medical Degrees & Qualifications *</label>
                <input
                  type="text"
                  name="qualifications"
                  className="form-control"
                  placeholder="e.g. MBBS, MD (Cardiology), FACC"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Years of Clinical Experience *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min="0"
                    max="65"
                    name="experience_years"
                    className="form-control"
                    value={formData.experience_years}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Award size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Consultation Fee (₹) *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    name="consultation_fee"
                    className="form-control"
                    value={formData.consultation_fee}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <IndianRupee size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Primary Hospital / Clinic Affiliation *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="hospital_name"
                    className="form-control"
                    placeholder="e.g. Manipal Hospital, City Heart Center"
                    value={formData.hospital_name}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Building size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Practice City / Area *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="e.g. Bangalore, Indiranagar"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <MapPin size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Profile & Bio */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingBottom: '10px',
                borderBottom: '2px solid #eff6ff',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Professional Profile & Biography
              </h3>
            </div>

            {/* Avatar Selection */}
            <div className="form-group">
              <label className="form-label">Select Professional Doctor Avatar or Enter URL</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {PRESET_AVATARS.map((avatar, idx) => {
                  const isSelected = formData.profile_image === avatar.url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectAvatar(avatar.url)}
                      style={{
                        position: 'relative',
                        border: isSelected ? '3px solid var(--primary)' : '2px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2px',
                        background: '#ffffff',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                        transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                      }}
                      title={avatar.label}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.label}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-6px',
                            backgroundColor: 'var(--primary)',
                            color: '#ffffff',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <input
                type="url"
                name="profile_image"
                className="form-control"
                placeholder="Or paste custom image URL: https://example.com/dr-photo.jpg"
                value={formData.profile_image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Clinical Biography & Patient Care Philosophy</label>
              <textarea
                name="bio"
                rows="3"
                className="form-control"
                placeholder="Briefly describe your clinical background, specialized treatments, patient care philosophy, and memberships..."
                value={formData.bio}
                onChange={handleChange}
              />
              <span className="form-hint">This summary will be visible to prospective patients browsing your schedule.</span>
            </div>

            {/* Terms of Practice Agreement */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                marginTop: '18px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: 'var(--text-main)',
                }}
              >
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                />
                <span>
                  I confirm that I am a registered medical practitioner authorized to practice clinical medicine, and I agree to MediConnect's{' '}
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Healthcare Provider Terms</span>, patient confidentiality regulations, and Telemedicine Code of Conduct.
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginBottom: '20px', gap: '8px', fontSize: '1.05rem', padding: '14px' }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ width: '18px', height: '18px' }} />
                <span>Creating Doctor Account...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                <span>Register as Doctor & Open Dashboard</span>
              </>
            )}
          </button>

          <div
            style={{
              textAlign: 'center',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '20px',
            }}
          >
            Already registered on MediConnect?{' '}
            <Link to="/login" style={{ fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Sign In to Doctor Portal <ArrowRight size={14} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegisterPage;
