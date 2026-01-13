import { useState, useCallback } from 'react'
import { ToastProps } from '../components/Toast'

interface ToastOptions {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const showToast = useCallback(({ message, type, duration = 5000 }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastProps = {
      id,
      message,
      type,
      duration,
      onClose: (toastId: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId))
      },
    }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const success = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'success', duration })
  }, [showToast])

  const error = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'error', duration })
  }, [showToast])

  const warning = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'warning', duration })
  }, [showToast])

  const info = useCallback((message: string, duration?: number) => {
    showToast({ message, type: 'info', duration })
  }, [showToast])

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return {
    toasts,
    showToast,
    success,
    error,
    warning,
    info,
    closeToast,
  }
}
