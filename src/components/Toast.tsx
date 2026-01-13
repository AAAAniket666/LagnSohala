import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import './Toast.css'

export interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export default function Toast({ id, message, type, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const Icon = icons[type]

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        <Icon size={20} />
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => onClose(id)}>
        <X size={16} />
      </button>
    </div>
  )
}
