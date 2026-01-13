import { BadgeCheck } from 'lucide-react'
import './VerificationBadge.css'

interface VerificationBadgeProps {
  type?: 'verified' | 'premium' | 'active'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export default function VerificationBadge({ 
  type = 'verified', 
  size = 'md',
  showLabel = false 
}: VerificationBadgeProps) {
  const getConfig = () => {
    switch (type) {
      case 'verified':
        return {
          icon: <BadgeCheck />,
          label: 'Verified',
          className: 'badge-verified'
        }
      case 'premium':
        return {
          icon: <BadgeCheck />,
          label: 'Premium',
          className: 'badge-premium'
        }
      case 'active':
        return {
          icon: <span className="active-dot"></span>,
          label: 'Active Today',
          className: 'badge-active'
        }
      default:
        return {
          icon: <BadgeCheck />,
          label: 'Verified',
          className: 'badge-verified'
        }
    }
  }

  const config = getConfig()

  return (
    <div className={`verification-badge ${config.className} badge-${size}`}>
      {config.icon}
      {showLabel && <span className="badge-label">{config.label}</span>}
    </div>
  )
}
