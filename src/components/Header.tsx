import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sun, Moon, Globe, Heart } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en')
  }

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/matrimony', label: t('nav.matrimony') },
    { to: '/services', label: t('nav.services') },
    { to: '/success-stories', label: t('nav.successStories') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/contact', label: t('nav.contact') },
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav" aria-label="Main navigation">
          <Link to="/" className="logo" onClick={closeMenu}>
            <Heart className="logo-icon" aria-hidden="true" />
            <span className="logo-text">
              <span className="logo-main">Lagna</span>
              <span className="logo-sub">Sohalaa</span>
            </span>
          </Link>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === 'en' ? 'Marathi' : 'English'}`}
              title={language === 'en' ? 'मराठी' : 'English'}
            >
              <Globe size={20} aria-hidden="true" />
              <span className="lang-label">{language === 'en' ? 'EN' : 'MR'}</span>
            </button>

            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={20} aria-hidden="true" />
              ) : (
                <Sun size={20} aria-hidden="true" />
              )}
            </button>

            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost btn-sm" onClick={closeMenu}>
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm btn-glow" onClick={closeMenu}>
                <span>{t('nav.register')}</span>
                <span className="btn-badge">Free</span>
              </Link>
            </div>

            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="nav-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu" id="nav-menu">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mobile-auth">
              <Link to="/login" className="btn btn-secondary" onClick={closeMenu}>
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                {t('nav.register')} - It's Free!
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
