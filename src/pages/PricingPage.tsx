import { Check, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricingPlans } from '../data/mockData'
import './PricingPage.css'

export default function PricingPage() {
  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <h1>Plans & Pricing</h1>
          <p>Choose the perfect plan for your matrimonial journey</p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pricing-section section">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.id}
                className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
              >
                {plan.highlighted && (
                  <div className="popular-badge">
                    <Star size={14} />
                    Most Popular
                  </div>
                )}
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <div className="plan-price">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price.toLocaleString()}</span>
                  <span className="period">/ {plan.period}</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <Check size={18} className="check-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.id === 'business' ? '/contact' : '/register'}
                  className={`btn btn-lg ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.buttonText}
                  <ArrowRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section bg-secondary">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
            <p>Got questions? We've got answers</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I upgrade my plan later?</h4>
              <p>Yes, you can upgrade your plan at any time. The remaining balance will be adjusted accordingly.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a refund policy?</h4>
              <p>We offer a 7-day refund policy for Premium and Business plans if you're not satisfied.</p>
            </div>
            <div className="faq-item">
              <h4>How do verified profiles work?</h4>
              <p>Our team verifies each profile by checking mobile numbers and ID documents.</p>
            </div>
            <div className="faq-item">
              <h4>Can I pause my subscription?</h4>
              <p>Yes, Premium and Business plans can be paused for up to 30 days.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit/debit cards, UPI, net banking, and wallets.</p>
            </div>
            <div className="faq-item">
              <h4>Is my data secure?</h4>
              <p>Yes, we use industry-standard encryption to protect your personal information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Not Sure Which Plan to Choose?</h2>
            <p>Talk to our team and get personalized recommendations</p>
            <Link to="/contact" className="btn btn-gold btn-lg">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
