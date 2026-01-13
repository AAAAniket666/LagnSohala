import { 
  Heart, 
  Users, 
  Shield, 
  Award, 
  Target, 
  CheckCircle,
  Globe,
  Phone
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './AboutPage.css'

export default function AboutPage() {
  const milestones = [
    { number: '10,000+', label: 'Verified Profiles' },
    { number: '5,000+', label: 'Happy Couples' },
    { number: '8+', label: 'Years of Service' },
    { number: '50+', label: 'Wedding Services' },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every profile is verified with authentic mobile numbers and documents.',
    },
    {
      icon: Users,
      title: 'Diverse Communities',
      description: 'We support all religions and communities across Maharashtra and beyond.',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Our team provides dedicated assistance throughout your journey.',
    },
    {
      icon: Globe,
      title: 'Wide Reach',
      description: 'Connect with potential matches from across India and abroad.',
    },
  ]

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    },
    {
      name: 'Priya Patil',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    },
    {
      name: 'Amit Kulkarni',
      role: 'Technology Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    },
  ]

  return (
    <div className="about-page">
      <SEO 
        title="About Us - Our Mission & Values"
        description="Learn about Lagna Sohalaa's mission to connect hearts and create lasting relationships. 8+ years of trusted matrimony services with 5000+ successful matches."
        keywords="about lagna sohalaa, matrimony company, matchmaking service, our mission, our values"
      />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About Lagna Sohalaa</h1>
            <p>
              Connecting hearts, building families, and creating beautiful memories
              since 2017. We're more than a matrimonial service – we're your
              trusted partner in finding love.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=700&fit=crop"
                alt="Happy couple"
                loading="lazy"
              />
            </div>
            <div className="mission-content">
              <span className="section-label">Our Story</span>
              <h2>A Journey of Trust and Love</h2>
              <p>
                Lagna Sohalaa was founded with a simple yet powerful vision – to
                help individuals find their perfect life partners through a
                trustworthy and transparent platform.
              </p>
              <p>
                What started as a small initiative in Pune has now grown into one
                of Maharashtra's most trusted matrimonial and wedding services
                platforms. We understand the importance of finding the right match
                and the joy of celebrating that union.
              </p>
              <p>
                Our platform combines traditional values with modern technology,
                ensuring that every profile is verified and every match is
                meaningful. We take pride in being a part of thousands of love
                stories.
              </p>
              <div className="mission-features">
                <div className="mission-feature">
                  <Target className="feature-icon" />
                  <div>
                    <h4>Our Mission</h4>
                    <p>To connect compatible souls and support their journey to marriage</p>
                  </div>
                </div>
                <div className="mission-feature">
                  <Award className="feature-icon" />
                  <div>
                    <h4>Our Vision</h4>
                    <p>To be the most trusted matrimonial platform in India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="milestones-section">
        <div className="container">
          <div className="milestones-grid">
            {milestones.map((milestone, index) => (
              <div key={index} className="milestone-card">
                <span className="milestone-number">{milestone.number}</span>
                <span className="milestone-label">{milestone.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section section bg-secondary">
        <div className="container">
          <div className="section-title">
            <h2>Why Families Trust Us</h2>
            <p>We go above and beyond to ensure your matrimonial journey is smooth</p>
          </div>
          <div className="trust-features">
            <div className="trust-feature">
              <CheckCircle className="check-icon" />
              <span>100% Verified Mobile Numbers</span>
            </div>
            <div className="trust-feature">
              <CheckCircle className="check-icon" />
              <span>Authentic Profile Details</span>
            </div>
            <div className="trust-feature">
              <CheckCircle className="check-icon" />
              <span>Dedicated Relationship Managers</span>
            </div>
            <div className="trust-feature">
              <CheckCircle className="check-icon" />
              <span>Privacy & Data Security</span>
            </div>
            <div className="trust-feature">
              <CheckCircle className="check-icon" />
              <span>End-to-End Wedding Services</span>
            </div>
            <div className="trust-feature">
              <CheckCircle className="check-icon" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p>Dedicated professionals committed to your happiness</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              Join thousands of happy couples who found their perfect match with
              Lagna Sohalaa
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-gold btn-lg">
                Create Free Profile
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                <Phone size={20} />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
