
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminNotificationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/platform')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  const notifications = [
    { id: 1, type: 'info', title: 'طلب تسجيل جديد', message: 'تم تقديم طلب تسجيل من أستاذ جديد', time: 'منذ 5 دقائق', unread: true },
    { id: 2, type: 'success', title: 'دفعة جديدة', message: 'تم استلام دفعة بقيمة 15,000 دج', time: 'منذ 30 دقيقة', unread: true },
    { id: 3, type: 'warning', title: 'تنبيه', message: 'محتوى ينتظر المراجعة', time: 'منذ ساعة', unread: false },
    { id: 4, type: 'info', title: 'رسالة جديدة', message: 'لديك رسالة جديدة من أحد الأساتذة', time: 'منذ ساعتين', unread: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/admin" className="text-primary hover:text-primary-dark">
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
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
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
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminNotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'طلب موافقة جديد', message: 'طلب انضمام أستاذ جديد', time: 'منذ 5 دقائق', read: false },
    { id: 2, type: 'success', title: 'تم التسجيل', message: 'طالب جديد انضم للمنصة', time: 'منذ 10 دقائق', read: false },
    { id: 3, type: 'warning', title: 'تنبيه', message: 'شكوى جديدة تحتاج للمراجعة', time: 'منذ ساعة', read: true },
  ])

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/admin" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">الإشعارات</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              جميع الإشعارات ({notifications.filter(n => !n.read).length} غير مقروءة)
            </h2>
            <button 
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary-dark font-semibold"
            >
              تعليم الكل كمقروء
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map(notif => (
              <div 
                key={notif.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => markAsRead(notif.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{notif.title}</h3>
                    <p className="text-gray-700">{notif.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
