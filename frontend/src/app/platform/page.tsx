'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useNotifications } from '@/contexts/NotificationContext'

export default function PlatformPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const { addNotification } = useNotifications()

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // إشعار ترحيبي
    addNotification({
      type: 'success',
      title: 'مرحباً بك في المنصة!',
      message: `أهلاً ${parsedUser.name || parsedUser.email}`
    })
  }, [router, addNotification])

  const handleLogout = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    addNotification({
      type: 'info',
      title: 'تم تسجيل الخروج',
      message: 'نراك قريباً!'
    })
    setTimeout(() => router.push('/'), 1000)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  منصة التعليم الجزائرية
                </h1>
                <p className="text-sm text-gray-500">المنصة التعليمية الشاملة</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/platform/profile">
                <div className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition cursor-pointer">
                  <div className="text-right">
                    <p className="font-semibold text-sm">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500">{getRoleTitle(user.role)}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            مرحباً بك، {user.name || user.email}!
          </h2>
          <p className="text-xl text-gray-600">اختر ما تريد الوصول إليه</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* لوحة التحكم */}
          <Link href={`/platform/dashboard/${user.role}`}>
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-5xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">لوحة التحكم</h3>
              <p className="text-gray-600 text-center">
                {user.role === 'admin' && 'إدارة المنصة والمستخدمين'}
                {user.role === 'teacher' && 'إدارة دروسك والطلاب'}
                {user.role === 'student' && 'متابعة دوراتك وواجباتك'}
                {user.role === 'supervisor' && 'مراجعة المحتوى والشكاوى'}
              </p>
            </div>
          </Link>

          {/* الملف الشخصي */}
          <Link href="/platform/profile">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-5xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">الملف الشخصي</h3>
              <p className="text-gray-600 text-center">عرض وتعديل معلوماتك الشخصية</p>
            </div>
          </Link>

          {/* الدورات (للطلاب والأساتذة) */}
          {(user.role === 'student' || user.role === 'teacher') && (
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-5xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                {user.role === 'teacher' ? 'دوراتي' : 'الدورات المتاحة'}
              </h3>
              <p className="text-gray-600 text-center">
                {user.role === 'teacher' ? 'إدارة وإنشاء الدورات' : 'تصفح والتسجيل في الدورات'}
              </p>
            </div>
          )}

          {/* الإشعارات */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-5xl">🔔</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">الإشعارات</h3>
            <p className="text-gray-600 text-center">عرض آخر التحديثات والأخبار</p>
          </div>

          {/* الرسائل */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-5xl">💬</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">الرسائل</h3>
            <p className="text-gray-600 text-center">تواصل مع الأساتذة والطلاب</p>
          </div>

          {/* الإعدادات */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-5xl">⚙️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">الإعدادات</h3>
            <p className="text-gray-600 text-center">إدارة إعدادات حسابك</p>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">نظرة عامة</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {user.role === 'student' && (
              <>
                <QuickStat icon="📚" label="الدورات المسجلة" value="5" color="bg-blue-500" />
                <QuickStat icon="✅" label="الدروس المكتملة" value="23" color="bg-green-500" />
                <QuickStat icon="📝" label="الواجبات المعلقة" value="4" color="bg-orange-500" />
                <QuickStat icon="🏆" label="الشهادات" value="2" color="bg-yellow-500" />
              </>
            )}
            {user.role === 'teacher' && (
              <>
                <QuickStat icon="📖" label="الدورات النشطة" value="8" color="bg-blue-500" />
                <QuickStat icon="👥" label="الطلاب" value="124" color="bg-green-500" />
                <QuickStat icon="⭐" label="التقييم" value="4.8/5" color="bg-yellow-500" />
                <QuickStat icon="💰" label="الأرباح الشهرية" value="24,800 دج" color="bg-purple-500" />
              </>
            )}
            {user.role === 'admin' && (
              <>
                <QuickStat icon="👥" label="المستخدمين" value="1,842" color="bg-blue-500" />
                <QuickStat icon="👨‍🏫" label="الأساتذة" value="178" color="bg-green-500" />
                <QuickStat icon="🎓" label="الطلاب" value="1,520" color="bg-purple-500" />
                <QuickStat icon="📋" label="طلبات الموافقة" value="12" color="bg-orange-500" />
              </>
            )}
            {user.role === 'supervisor' && (
              <>
                <QuickStat icon="📋" label="مراجعات معلقة" value="12" color="bg-orange-500" />
                <QuickStat icon="✅" label="تمت المراجعة" value="158" color="bg-green-500" />
                <QuickStat icon="⚠️" label="شكاوى نشطة" value="5" color="bg-red-500" />
                <QuickStat icon="⭐" label="تقييم الجودة" value="92%" color="bg-blue-500" />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function QuickStat({ icon, label, value, color }: any) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function getRoleTitle(role: string) {
  const titles: Record<string, string> = {
    admin: 'مدير عام',
    teacher: 'أستاذ',
    student: 'طالب',
    supervisor: 'مراقب'
  }
  return titles[role] || ''
}