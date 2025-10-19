'use client'

import { useState, useEffect } from 'react'
import { useNotifications } from '@/contexts/NotificationContext'
import Toast from './Toast'

export default function ToastContainer() {
  const { notifications } = useNotifications()
  const [toasts, setToasts] = useState<typeof notifications>([])

  useEffect(() => {
    const newNotifs = notifications.filter(n => !n.read).slice(0, 3)
    setToasts(newNotifs)
  }, [notifications])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
