import { ReactNode } from 'react'
import Toast, { ToastProps } from './Toast'

interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
