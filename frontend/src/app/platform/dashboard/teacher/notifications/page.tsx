
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TeacherNotificationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'teacher') {
      router.push('/platform')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  const notifications = [
    { id: 1, type: 'info', title: 'طالب جديد', message: 'انضم أحمد محمد إلى دورة الرياضيات', time: 'منذ 10 دقائق', unread: true },
    { id: 2, type: 'success', title: 'تقييم جديد', message: 'حصلت على تقييم 5 نجوم من طالب', time: 'منذ ساعة', unread: true },
    { id: 3, type: 'info', title: 'سؤال جديد', message: 'لديك سؤال من طالب في دورة الفيزياء', time: 'منذ ساعتين', unread: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/teacher" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الإشعارات</h1>
              <p className="text-sm text-gray-500">آخر التحديثات والأخبار</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                notification.unread ? 'border-r-4 border-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${
                      notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></span>
                    <h3 className="font-bold text-lg text-gray-900">{notification.title}</h3>
                    {notification.unread && (
                      <span className="px-2 py-1 bg-primary text-white text-xs rounded">جديد</span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
