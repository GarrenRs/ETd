
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function StudentSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'student') {
      router.push('/platform')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/student" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
              <p className="text-sm text-gray-500">إدارة إعدادات حسابك</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">المعلومات الشخصية</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">الاسم الكامل</label>
                <input type="text" defaultValue={user.name || user.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
                <input type="email" defaultValue={user.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">المستوى الدراسي</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                  <option>الأولى ثانوي</option>
                  <option>الثانية ثانوي</option>
                  <option>الثالثة ثانوي</option>
                  <option>جامعي</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">تفضيلات التعلم</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>تلقي تذكيرات بالواجبات</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>تلقي توصيات دورات جديدة</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span>السماح للأساتذة بمراسلتي</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">إعدادات الإشعارات</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>إشعارات الدروس الجديدة</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>إشعارات الرسائل</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>إشعارات الواجبات</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
              حفظ التغييرات
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
