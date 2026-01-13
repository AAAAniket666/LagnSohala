import { Link } from 'react-router-dom'
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/matrimony', label: t('nav.matrimony') },
    { to: '/success-stories', label: t('nav.successStories') },
    { to: '/pricing', label: 'Plans & Pricing' },
  ]

  const serviceLinks = [
    { to: '/services', label: 'Catering Services' },
    { to: '/services', label: 'Venue Booking' },
    { to: '/services', label: 'Wedding Decoration' },
    { to: '/services', label: 'Photography' },
    { to: '/services', label: 'Pandit Services' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Heart className="footer-logo-icon" aria-hidden="true" />
              <span className="footer-logo-text">
                <span className="footer-logo-main">Lagna</span>
                <span className="footer-logo-sub">Sohalaa</span>
              </span>
            </Link>
            <p className="footer-tagline">{t('footer.tagline')}</p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/lagnasohalaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="social-link"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/lagnasohalaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="social-link"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/lagnasohalaa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="social-link"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h4>{t('footer.services')}</h4>
            <ul>
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href="tel:+917887861234">+91 7887861234</a>
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href="mailto:contact@lagnasohalaa.com">contact@lagnasohalaa.com</a>
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {currentYear} Lagna Sohalaa. {t('footer.rights')}.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
