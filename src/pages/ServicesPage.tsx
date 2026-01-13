import { useState } from 'react'
import { Star, Phone, ArrowRight } from 'lucide-react'
import { weddingServices } from '../data/mockData'
import SEO from '../components/SEO'
import './ServicesPage.css'

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(weddingServices.map(s => s.category))]

  const filteredServices = activeCategory === 'All'
    ? weddingServices
    : weddingServices.filter(s => s.category === activeCategory)

  return (
    <div className="services-page">
      <SEO 
        title="Wedding Services - Venue, Catering, Decoration & More"
        description="Complete wedding services including venue booking, catering, decoration, photography, pandit services, and more. Trusted vendors for your perfect wedding."
        keywords="wedding services, venue booking, catering services, wedding decoration, wedding photography, pandit services, bridal makeup"
      />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Wedding Services</h1>
          <p>Everything you need for your perfect wedding, all under one roof</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section section">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map(service => (
              <article key={service.id} className="service-card-large">
                <div className="service-image">
                  <img src={service.image} alt={service.name} loading="lazy" />
                  <span className="service-category-badge">{service.category}</span>
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-meta">
                    <div className="service-rating">
                      <Star size={16} className="star-filled" />
                      <span>{service.rating}</span>
                      <span className="review-count">({service.reviews} reviews)</span>
                    </div>
                    <span className="service-price">{service.priceRange}</span>
                  </div>
                  <div className="service-actions">
                    <button className="btn btn-primary">
                      <Phone size={16} />
                      Request Quote
                    </button>
                    <button className="btn btn-secondary">
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need Custom Wedding Planning?</h2>
            <p>Our wedding experts are here to help you plan every detail</p>
            <button className="btn btn-gold btn-lg">
              Talk to an Expert
              <Phone size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
