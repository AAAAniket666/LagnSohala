import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar, Heart } from 'lucide-react'
import ToastContainer from '../components/ToastContainer'
import { useToast } from '../hooks/useToast'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'
import './AuthPages.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { toasts, success, error, closeToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateStep2()) return

    setIsSubmitting(true)
    
    try {
      // Call the registration API
      const response = await api.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
      })

      if (response.success) {
        success(response.message || '🎉 Registration successful! Welcome to Lagna Sohalaa.')
        
        // Store user data in localStorage (in production, use proper auth with tokens)
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        
        // Redirect to matrimony page
        setTimeout(() => {
          navigate('/matrimony')
        }, 2000)
      }
    } catch (err: any) {
      console.error('Registration error:', err)
      const errorMessage = err.message || 'Registration failed. Please try again.'
      error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="auth-page">
      <ToastContainer toasts={toasts} onClose={closeToast} />
      <div className="auth-container">
        <div className="auth-image-section">
          <div className="auth-image-overlay">
            <div className="auth-image-content">
              <Heart className="auth-logo-icon" />
              <h2>{t('register.joinCommunity')}</h2>
              <p>{t('register.joinDesc')}</p>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <Link to="/" className="auth-logo">
                <Heart className="logo-icon" />
                <span>Lagna Sohalaa</span>
              </Link>
              <h1>{t('register.title')}</h1>
              <p>{t('register.subtitle')}</p>
            </div>

            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>{t('register.step1')}</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>{t('register.step2')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {step === 1 && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">{t('register.firstName')}</label>
                      <div className="input-with-icon">
                        <User className="input-icon" size={18} />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`form-input ${errors.firstName ? 'error' : ''}`}
                          placeholder={t('register.firstName')}
                        />
                      </div>
                      {errors.firstName && (
                        <span className="error-message">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">{t('register.lastName')}</label>
                      <div className="input-with-icon">
                        <User className="input-icon" size={18} />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`form-input ${errors.lastName ? 'error' : ''}`}
                          placeholder={t('register.lastName')}
                        />
                      </div>
                      {errors.lastName && (
                        <span className="error-message">{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">{t('register.email')}</label>
                    <div className="input-with-icon">
                      <Mail className="input-icon" size={18} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder={t('register.email')}
                      />
                    </div>
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">{t('register.phone')}</label>
                    <div className="input-with-icon">
                      <Phone className="input-icon" size={18} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg auth-submit"
                    onClick={handleNext}
                  >
                    {t('register.continue')}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="gender" className="form-label">{t('register.gender')}</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`form-input form-select ${errors.gender ? 'error' : ''}`}
                      >
                        <option value="">{t('register.selectGender')}</option>
                        <option value="male">{t('register.male')}</option>
                        <option value="female">{t('register.female')}</option>
                      </select>
                      {errors.gender && (
                        <span className="error-message">{errors.gender}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth" className="form-label">{t('register.dateOfBirth')}</label>
                      <div className="input-with-icon">
                        <Calendar className="input-icon" size={18} />
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <span className="error-message">{errors.dateOfBirth}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">{t('register.password')}</label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        placeholder={t('register.password')}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">{t('register.confirmPassword')}</label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" size={18} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        placeholder={t('register.confirmPassword')}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-message">{errors.confirmPassword}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                      />
                      <span>
                        {t('register.agreeToTerms')}{' '}
                        <Link to="/terms">{t('register.termsOfService')}</Link> {t('register.and')}{' '}
                        <Link to="/privacy">{t('register.privacyPolicy')}</Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <span className="error-message">{errors.agreeToTerms}</span>
                    )}
                  </div>

                  <div className="form-buttons">
                    <button
                      type="button"
                      className="btn btn-secondary btn-lg"
                      onClick={() => setStep(1)}
                    >
                      {t('register.back')}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" style={{ width: 20, height: 20 }}></span>
                          {t('register.creating')}
                        </>
                      ) : (
                        t('register.createAccount')
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            <p className="auth-footer">
              {t('register.alreadyHaveAccount')}{' '}
              <Link to="/login">{t('register.signIn')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
