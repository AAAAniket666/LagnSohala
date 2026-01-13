import { useState, FormEvent } from 'react'
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Clock } from 'lucide-react'
import './ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Have questions about our services or need help finding your perfect match?
                Our team is here to assist you every step of the way.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+917887861234">+91 7887861234</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:contact@lagnasohalaa.com">contact@lagnasohalaa.com</a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Office Address</h4>
                    <p>123 MG Road, Shivaji Nagar<br />Pune, Maharashtra 411005</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4>Office Hours</h4>
                    <p>Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="https://facebook.com/lagnasohalaa" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com/lagnasohalaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://twitter.com/lagnasohalaa" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your name"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="you@example.com"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input"
                      rows={5}
                      placeholder="How can we help you?"
                      required
                      aria-required="true"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" style={{ width: 20, height: 20 }}></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-placeholder">
          <MapPin size={48} />
          <p>Google Maps Integration</p>
          <span>Map would be displayed here in production</span>
        </div>
      </section>
    </div>
  )
}
