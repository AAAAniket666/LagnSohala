import { Heart, Calendar, MapPin, Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { successStories } from '../data/mockData'
import './SuccessStoriesPage.css'

export default function SuccessStoriesPage() {
  return (
    <div className="success-page">
      {/* Hero Section */}
      <section className="success-hero">
        <div className="container">
          <h1>Success Stories</h1>
          <p>Real couples who found love through Lagna Sohalaa</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="success-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <Heart className="stat-icon" />
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Happy Couples</span>
            </div>
            <div className="stat-item">
              <Calendar className="stat-icon" />
              <span className="stat-number">8+</span>
              <span className="stat-label">Years of Service</span>
            </div>
            <div className="stat-item">
              <MapPin className="stat-icon" />
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="stories-section section">
        <div className="container">
          <div className="stories-grid">
            {successStories.map((story, index) => (
              <article 
                key={story.id} 
                className={`story-card-large ${index === 0 ? 'featured' : ''}`}
              >
                <div className="story-images">
                  <img 
                    src={story.image} 
                    alt={story.coupleName} 
                    loading="lazy"
                    className="main-image"
                  />
                </div>
                <div className="story-content">
                  <Quote className="quote-icon" />
                  <blockquote>"{story.quote}"</blockquote>
                  <p className="story-text">{story.story}</p>
                  <div className="story-couple">
                    <Heart size={18} className="heart-icon" />
                    <span className="couple-name">{story.coupleName}</span>
                  </div>
                  <div className="story-meta">
                    <span>
                      <Calendar size={14} />
                      {story.weddingDate}
                    </span>
                    <span>
                      <MapPin size={14} />
                      {story.location}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="success-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Write Your Own Success Story</h2>
            <p>Join thousands of couples who found their perfect match with us</p>
            <Link to="/register" className="btn btn-gold btn-lg">
              Create Your Profile
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
