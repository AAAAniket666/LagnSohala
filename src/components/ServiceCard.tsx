import { Star, ArrowRight } from 'lucide-react'
import { WeddingService } from '../types'
import { useLanguage } from '../context/LanguageContext'
import './ServiceCard.css'

interface ServiceCardProps {
  service: WeddingService
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useLanguage()

  return (
    <article className="service-card">
      <div className="service-image-container">
        <img 
          src={service.image} 
          alt={service.name}
          loading="lazy"
          className="service-image"
        />
        <span className="service-category">{service.category}</span>
      </div>
      <div className="service-content">
        <h3 className="service-name">{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <div className="service-meta">
          <div className="service-rating">
            <Star size={14} className="star-icon" />
            <span>{service.rating}</span>
            <span className="review-count">({service.reviews} reviews)</span>
          </div>
          <div className="service-price">{service.priceRange}</div>
        </div>
        <div className="service-actions">
          <button className="btn btn-primary btn-sm">
            {t('services.requestQuote')}
          </button>
          <button className="btn btn-secondary btn-sm">
            {t('services.viewMore')}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}
