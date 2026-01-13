import { Heart, MapPin, GraduationCap, Briefcase, MessageCircle, Eye, Sparkles } from 'lucide-react'
import { Profile } from '../types'
import VerificationBadge from './VerificationBadge'
import './ProfileCard.css'

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  // Simulate online status and last active
  const isOnline = Math.random() > 0.5
  const matchPercentage = Math.floor(Math.random() * 20) + 75

  return (
    <article className="profile-card">
      <div className="profile-image-container">
        <img 
          src={profile.image} 
          alt={`${profile.name}'s profile`}
          loading="lazy"
          className="profile-image"
        />
        
        {/* Top badges - Using new VerificationBadge component */}
        <div className="profile-badges-top">
          {profile.verified && (
            <VerificationBadge type="verified" size="sm" showLabel />
          )}
          {profile.premium && (
            <VerificationBadge type="premium" size="sm" showLabel />
          )}
        </div>

        {/* Online/Active indicator */}
        {isOnline && (
          <VerificationBadge type="active" size="sm" showLabel />
        )}

        {/* Match percentage */}
        <div className="match-badge">
          <Sparkles size={12} />
          {matchPercentage}% Match
        </div>

        {/* Quick actions overlay */}
        <div className="profile-overlay">
          <div className="overlay-actions">
            <button className="action-btn" title="View Profile">
              <Eye size={18} />
            </button>
            <button className="action-btn primary" title="Send Interest">
              <Heart size={18} />
            </button>
            <button className="action-btn" title="Message">
              <MessageCircle size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-header">
          <div className="name-row">
            <h3 className="profile-name">{profile.name}</h3>
            <span className="profile-age">{profile.age} yrs</span>
          </div>
          <p className="profile-tagline">{profile.religion} • {profile.community}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <MapPin size={14} />
            <span>{profile.location}</span>
          </div>
          <div className="detail-item">
            <GraduationCap size={14} />
            <span>{profile.education}</span>
          </div>
          <div className="detail-item">
            <Briefcase size={14} />
            <span>{profile.occupation}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-interest">
            <Heart size={16} />
            Send Interest
          </button>
          <button className="btn-view">
            View Profile
          </button>
        </div>
      </div>
    </article>
  )
}
