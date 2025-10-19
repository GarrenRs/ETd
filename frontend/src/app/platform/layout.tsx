'use client'

import { ReactNode } from 'react'
import { NotificationProvider } from '@/contexts/NotificationContext'
import ToastContainer from '@/components/ToastContainer'

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider>
      <ToastContainer />
      {children}
    </NotificationProvider>
  )
}