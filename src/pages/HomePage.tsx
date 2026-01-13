import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Calendar,
  MapPin,
  Star,
  Shield,
  Phone,
  Play,
  ChevronDown,
  TrendingUp,
  Award,
  Clock,
  MessageCircle,
  Zap,
  Crown,
  Gift,
  BadgeCheck,
  Flame,
  Target,
  Percent
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { profiles, weddingServices, successStories } from '../data/mockData'
import ProfileCard from '../components/ProfileCard'
import ServiceCard from '../components/ServiceCard'
import SEO from '../components/SEO'
import './HomePage.css'

export default function HomePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'bride' | 'groom'>('bride')
  const [searchAge, setSearchAge] = useState({ min: '21', max: '30' })
  const [searchReligion, setSearchReligion] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [liveCount, setLiveCount] = useState(847)
  const [matchCount, setMatchCount] = useState(12453)

  // Structured data for homepage
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lagna Sohalaa",
    "url": "https://www.lagnasohalaa.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.lagnasohalaa.com/matrimony?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "AggregateOffer",
      "description": "Matrimony and Wedding Services"
    }
  }

  // Simulate live activity
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1)
      setMatchCount(prev => prev + Math.floor(Math.random() * 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const featuredProfiles = profiles.slice(0, 6)
  const featuredServices = weddingServices.slice(0, 4)

  const recentMatches = [
    { name: 'Priya & Rahul', time: '2 hours ago', location: 'Mumbai' },
    { name: 'Sneha & Amit', time: '5 hours ago', location: 'Pune' },
    { name: 'Anjali & Vikram', time: '1 day ago', location: 'Nashik' },
  ]

  return (
    <div className="home-page">
      <SEO 
        title="Find Your Life Partner With Trust"
        description="Lagna Sohalaa offers trusted matrimony services with verified profiles, AI-powered matching, and comprehensive wedding services. Join 10,000+ members. First month FREE!"
        keywords="matrimony, marriage, wedding, matchmaking, verified profiles, Indian wedding, shaadi, Lagna Sohalaa"
        schema={schema}
      />

      {/* Live Activity Banner */}
      <div className="live-banner">
        <div className="container">
          <div className="live-banner-content">
            <div className="live-indicator">
              <span className="live-dot"></span>
              <span>{liveCount} users online now</span>
            </div>
            <div className="live-stats">
              <span><Flame size={14} /> {matchCount.toLocaleString()} matches made</span>
              <span><Gift size={14} /> Limited: First month FREE on Premium!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Completely Redesigned */}
      <section className="hero-new">
        <div className="hero-bg-new">
          <div className="hero-image-bg"></div>
          <div className="hero-overlay-new"></div>
        </div>
        
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content-new">
              <div className="hero-trust-badge">
                <BadgeCheck size={18} />
                <span>Maharashtra's Most Trusted Matrimony</span>
              </div>
              
              <h1 className="hero-title-new">
                Find Your <span className="highlight">Perfect Match</span><br/>
                Start Your Forever
              </h1>
              
              <p className="hero-subtitle-new">
                Join 10,000+ verified profiles. AI-powered matching. 
                Complete wedding planning - all in one place.
              </p>

              {/* Quick Match Stats */}
              <div className="quick-stats">
                <div className="quick-stat">
                  <TrendingUp size={20} className="stat-icon" />
                  <div>
                    <span className="stat-value">93%</span>
                    <span className="stat-desc">Match Success</span>
                  </div>
                </div>
                <div className="quick-stat">
                  <Clock size={20} className="stat-icon" />
                  <div>
                    <span className="stat-value">21 Days</span>
                    <span className="stat-desc">Avg. Time to Match</span>
                  </div>
                </div>
                <div className="quick-stat">
                  <Award size={20} className="stat-icon" />
                  <div>
                    <span className="stat-value">4.9★</span>
                    <span className="stat-desc">User Rating</span>
                  </div>
                </div>
              </div>

              {/* Video CTA */}
              <button className="video-cta">
                <div className="play-btn">
                  <Play size={20} />
                </div>
                <span>Watch Success Stories</span>
              </button>
            </div>

            {/* Right - Quick Search Widget */}
            <div className="hero-search-widget">
              <div className="widget-header">
                <h3>Find Your Match</h3>
                <p>Search from 10,000+ verified profiles</p>
              </div>

              {/* Gender Tabs */}
              <div className="gender-tabs">
                <button 
                  className={`gender-tab ${activeTab === 'bride' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bride')}
                >
                  <span className="tab-icon">👰</span>
                  Looking for Bride
                </button>
                <button 
                  className={`gender-tab ${activeTab === 'groom' ? 'active' : ''}`}
                  onClick={() => setActiveTab('groom')}
                >
                  <span className="tab-icon">🤵</span>
                  Looking for Groom
                </button>
              </div>

              {/* Search Form */}
              <div className="search-form">
                <div className="form-row">
                  <label>Age Range</label>
                  <div className="age-inputs">
                    <select value={searchAge.min} onChange={(e) => setSearchAge({...searchAge, min: e.target.value})}>
                      {Array.from({length: 30}, (_, i) => i + 18).map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                    <span>to</span>
                    <select value={searchAge.max} onChange={(e) => setSearchAge({...searchAge, max: e.target.value})}>
                      {Array.from({length: 30}, (_, i) => i + 18).map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label>Religion</label>
                  <select value={searchReligion} onChange={(e) => setSearchReligion(e.target.value)}>
                    <option value="">All Religions</option>
                    <option value="hindu">Hindu</option>
                    <option value="muslim">Muslim</option>
                    <option value="christian">Christian</option>
                    <option value="sikh">Sikh</option>
                    <option value="jain">Jain</option>
                    <option value="buddhist">Buddhist</option>
                  </select>
                </div>

                <div className="form-row">
                  <label>Location</label>
                  <select value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)}>
                    <option value="">All Maharashtra</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="nashik">Nashik</option>
                    <option value="nagpur">Nagpur</option>
                    <option value="aurangabad">Aurangabad</option>
                    <option value="kolhapur">Kolhapur</option>
                  </select>
                </div>

                <Link to="/matrimony" className="search-submit">
                  <Search size={18} />
                  Search Profiles
                </Link>
              </div>

              <p className="widget-footer">
                <Shield size={14} /> 100% Verified & Safe Profiles
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Social Proof - Recent Matches */}
      <section className="social-proof">
        <div className="container">
          <div className="proof-grid">
            <div className="proof-item featured">
              <div className="proof-icon">
                <Heart size={24} />
              </div>
              <div className="proof-content">
                <span className="proof-number">{matchCount.toLocaleString()}+</span>
                <span className="proof-label">Successful Matches</span>
              </div>
            </div>
            <div className="recent-matches">
              <span className="matches-label"><Sparkles size={14} /> Recent Connections</span>
              <div className="matches-list">
                {recentMatches.map((match, idx) => (
                  <div key={idx} className="match-item">
                    <Heart size={12} className="match-heart" />
                    <span className="match-names">{match.name}</span>
                    <span className="match-meta">{match.location} • {match.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="value-props section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">Why We're Different</span>
            <h2>More Than Just Matchmaking</h2>
            <p>Complete matrimony & wedding ecosystem trusted by families across Maharashtra</p>
          </div>

          <div className="value-grid">
            <div className="value-card primary">
              <div className="value-icon">
                <Target size={32} />
              </div>
              <h3>AI-Powered Matching</h3>
              <p>Our smart algorithm analyzes 50+ compatibility factors to find your ideal match</p>
              <div className="value-stat">
                <span className="stat-big">93%</span>
                <span>Match Success Rate</span>
              </div>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Shield size={32} />
              </div>
              <h3>100% Verified</h3>
              <p>Every profile verified with Aadhaar, phone & photo authentication</p>
              <ul className="value-features">
                <li><CheckCircle size={14} /> Phone Verified</li>
                <li><CheckCircle size={14} /> Photo Verified</li>
                <li><CheckCircle size={14} /> ID Verified</li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <MessageCircle size={32} />
              </div>
              <h3>Dedicated Support</h3>
              <p>Personal relationship managers for premium members</p>
              <div className="support-badge">
                <Phone size={14} />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="value-card highlight">
              <div className="card-ribbon">Complete Solution</div>
              <div className="value-icon">
                <Sparkles size={32} />
              </div>
              <h3>Wedding Services</h3>
              <p>From match to mandap - venue, catering, decoration & more</p>
              <Link to="/services" className="value-link">
                Explore Services <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Timeline */}
      <section className="how-it-works-new section bg-secondary">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">Simple Process</span>
            <h2>Your Journey to Forever</h2>
            <p>Find your life partner in 4 simple steps</p>
          </div>

          <div className="journey-timeline">
            <div className="timeline-track"></div>
            
            <div className="journey-step">
              <div className="step-marker">
                <span>1</span>
              </div>
              <div className="step-content">
                <div className="step-icon-new">
                  <Users size={24} />
                </div>
                <h3>Create Profile</h3>
                <p>Sign up free in 2 minutes with your basic details</p>
                <span className="step-time">⏱️ 2 mins</span>
              </div>
            </div>

            <div className="journey-step">
              <div className="step-marker">
                <span>2</span>
              </div>
              <div className="step-content">
                <div className="step-icon-new">
                  <Zap size={24} />
                </div>
                <h3>Get AI Matches</h3>
                <p>Our algorithm finds compatible profiles based on your preferences</p>
                <span className="step-time">🎯 Smart Matching</span>
              </div>
            </div>

            <div className="journey-step">
              <div className="step-marker">
                <span>3</span>
              </div>
              <div className="step-content">
                <div className="step-icon-new">
                  <MessageCircle size={24} />
                </div>
                <h3>Connect & Chat</h3>
                <p>Send interests, chat securely, and meet your matches</p>
                <span className="step-time">💬 Secure Chat</span>
              </div>
            </div>

            <div className="journey-step final">
              <div className="step-marker">
                <span>4</span>
              </div>
              <div className="step-content">
                <div className="step-icon-new celebration">
                  <Heart size={24} />
                </div>
                <h3>Get Married! 🎊</h3>
                <p>Plan your dream wedding with our complete services</p>
                <span className="step-time">💍 Forever Begins</span>
              </div>
            </div>
          </div>

          <div className="journey-cta">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Your Journey Free
              <ArrowRight size={18} />
            </Link>
            <span className="cta-note">No credit card required • Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Featured Profiles - Card Carousel Style */}
      <section className="featured-profiles-new section">
        <div className="container">
          <div className="section-header-new">
            <div>
              <span className="section-badge">Hand-Picked</span>
              <h2>Featured Profiles</h2>
              <p>Verified members looking for their life partner</p>
            </div>
            <div className="header-actions">
              <div className="profile-toggle">
                <button className={activeTab === 'bride' ? 'active' : ''} onClick={() => setActiveTab('bride')}>
                  Brides
                </button>
                <button className={activeTab === 'groom' ? 'active' : ''} onClick={() => setActiveTab('groom')}>
                  Grooms
                </button>
              </div>
              <Link to="/matrimony" className="btn btn-secondary">
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="profiles-showcase">
            {featuredProfiles
              .filter(p => activeTab === 'bride' ? p.gender === 'female' : p.gender === 'male')
              .slice(0, 4)
              .map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
          </div>

          <div className="profiles-cta">
            <p><Users size={16} /> Join <strong>10,000+</strong> verified profiles today</p>
            <Link to="/register" className="btn btn-gold">
              Create Free Profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories - Testimonial Slider */}
      <section className="success-new section bg-gradient">
        <div className="container">
          <div className="section-title light">
            <span className="section-badge light">Real Love Stories</span>
            <h2>They Found Love. You Can Too.</h2>
            <p>Read inspiring stories from couples who met on Lagna Sohalaa</p>
          </div>

          <div className="stories-grid-new">
            {successStories.map((story, idx) => (
              <div key={story.id} className={`story-card-new ${idx === 1 ? 'featured' : ''}`}>
                <div className="story-image-new">
                  <img src={story.image} alt={story.coupleName} loading="lazy" />
                  <div className="story-overlay">
                    <Play size={32} />
                  </div>
                </div>
                <div className="story-content-new">
                  <div className="story-hearts">
                    <Heart size={16} className="filled" />
                    <Heart size={16} className="filled" />
                    <Heart size={16} className="filled" />
                  </div>
                  <h4>{story.coupleName}</h4>
                  <blockquote>"{story.quote}"</blockquote>
                  <div className="story-details">
                    <span><Calendar size={12} /> {story.weddingDate}</span>
                    <span><MapPin size={12} /> {story.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
            <Link to="/success-stories" className="btn btn-gold btn-lg">
              Read All Stories <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Wedding Services Preview */}
      <section className="services-preview section">
        <div className="container">
          <div className="services-intro">
            <div className="intro-content">
              <span className="section-badge">Complete Wedding Solution</span>
              <h2>From Match to Mandap</h2>
              <p>
                Don't just find a partner - plan your entire wedding with our trusted vendors. 
                Venue, catering, decoration, photography & more - all under one roof.
              </p>
              <div className="intro-stats">
                <div className="intro-stat">
                  <span className="stat-num">50+</span>
                  <span className="stat-text">Vendors</span>
                </div>
                <div className="intro-stat">
                  <span className="stat-num">1000+</span>
                  <span className="stat-text">Weddings</span>
                </div>
                <div className="intro-stat">
                  <span className="stat-num">4.8★</span>
                  <span className="stat-text">Rating</span>
                </div>
              </div>
              <Link to="/services" className="btn btn-primary btn-lg">
                Explore All Services <ArrowRight size={18} />
              </Link>
            </div>
            <div className="intro-image">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=500&fit=crop" 
                alt="Wedding celebration" 
              />
              <div className="floating-card">
                <Crown size={20} />
                <span>Premium Vendors</span>
              </div>
            </div>
          </div>

          <div className="services-grid-new">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="pricing-teaser section bg-secondary">
        <div className="container">
          <div className="pricing-teaser-content">
            <div className="teaser-left">
              <span className="section-badge">Affordable Plans</span>
              <h2>Start Free. Upgrade When Ready.</h2>
              <p>
                Basic features free forever. Unlock premium matches, 
                priority support & unlimited messaging with our affordable plans.
              </p>
              <div className="pricing-highlights">
                <div className="highlight-item">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Free profile creation</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} className="text-primary" />
                  <span>View up to 10 profiles daily</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Send 5 interests per day</span>
                </div>
              </div>
              <Link to="/pricing" className="btn btn-primary btn-lg">
                View All Plans <ArrowRight size={18} />
              </Link>
            </div>
            <div className="teaser-right">
              <div className="price-card-preview">
                <div className="price-badge">Most Popular</div>
                <h4>Premium</h4>
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="amount">999</span>
                  <span className="period">/month</span>
                </div>
                <ul className="price-features">
                  <li><CheckCircle size={14} /> Unlimited profile views</li>
                  <li><CheckCircle size={14} /> Unlimited messaging</li>
                  <li><CheckCircle size={14} /> See who viewed you</li>
                  <li><CheckCircle size={14} /> Priority in search</li>
                </ul>
                <div className="price-offer">
                  <Percent size={14} />
                  <span>50% OFF - First Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content-new">
            <div className="cta-badge">
              <Sparkles size={16} />
              <span>Your Story Starts Here</span>
            </div>
            <h2>Ready to Meet Your Life Partner?</h2>
            <p>
              Join thousands of happy couples who found love on Lagna Sohalaa. 
              Create your free profile in just 2 minutes.
            </p>
            <div className="cta-buttons-new">
              <Link to="/register" className="btn btn-gold btn-xl">
                <Heart size={20} />
                Create Free Profile
              </Link>
              <Link to="/contact" className="btn btn-secondary-light btn-xl">
                <Phone size={20} />
                Talk to Advisor
              </Link>
            </div>
            <div className="cta-trust">
              <div className="trust-item">
                <Shield size={16} />
                <span>100% Verified</span>
              </div>
              <div className="trust-item">
                <Users size={16} />
                <span>10,000+ Members</span>
              </div>
              <div className="trust-item">
                <Star size={16} />
                <span>4.9★ Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
