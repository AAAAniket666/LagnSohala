import { useEffect, useState } from 'react'
import { Users, Heart, Award, TrendingUp } from 'lucide-react'
import './SuccessMetrics.css'

interface Metric {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}

export default function SuccessMetrics() {
  const [isVisible, setIsVisible] = useState(false)

  const metrics: Metric[] = [
    {
      icon: <Heart />,
      value: 1500,
      label: 'Successful Marriages',
      suffix: '+'
    },
    {
      icon: <Users />,
      value: 50000,
      label: 'Active Members',
      suffix: '+'
    },
    {
      icon: <Award />,
      value: 98,
      label: 'Satisfaction Rate',
      suffix: '%'
    },
    {
      icon: <TrendingUp />,
      value: 500,
      label: 'Matches Per Month',
      suffix: '+'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const CountUp = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      const duration = 2000
      const steps = 60
      const increment = end / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [isVisible, end])

    return (
      <span className="metric-value">
        {count.toLocaleString()}
        <span className="metric-suffix">{suffix}</span>
      </span>
    )
  }

  return (
    <section className="success-metrics">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`metric-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-content">
                <CountUp end={metric.value} suffix={metric.suffix} />
                <p className="metric-label">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
