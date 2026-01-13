import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MatrimonyPage from './pages/MatrimonyPageNew'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="matrimony" element={<MatrimonyPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="success-stories" element={<SuccessStoriesPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
