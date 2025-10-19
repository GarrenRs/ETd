
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminSettingsPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/admin" className="text-primary hover:text-primary-dark">
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
                <label className="block text-sm font-semibold mb-2">رقم الهاتف</label>
                <input type="tel" placeholder="+213" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">تغيير كلمة المرور</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">كلمة المرور الحالية</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">كلمة المرور الجديدة</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">تأكيد كلمة المرور</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">إعدادات الإشعارات</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>إشعارات البريد الإلكتروني</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>إشعارات المنصة</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span>إشعارات الرسائل النصية</span>
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
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoApprove: false,
    language: 'ar'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/admin" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">إعدادات الإشعارات</h2>
            <div className="space-y-4">
              <SettingToggle 
                label="إشعارات البريد الإلكتروني" 
                checked={settings.emailNotifications}
                onChange={(v) => setSettings({...settings, emailNotifications: v})}
              />
              <SettingToggle 
                label="إشعارات الرسائل النصية" 
                checked={settings.smsNotifications}
                onChange={(v) => setSettings({...settings, smsNotifications: v})}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">إعدادات النظام</h2>
            <div className="space-y-4">
              <SettingToggle 
                label="الموافقة التلقائية على الطلبات" 
                checked={settings.autoApprove}
                onChange={(v) => setSettings({...settings, autoApprove: v})}
              />
            </div>
          </div>

          <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
            حفظ التغييرات
          </button>
        </div>
      </main>
    </div>
  )
}

function SettingToggle({ label, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="font-semibold text-gray-900">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-14 h-7 rounded-full transition ${
          checked ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-8' : 'translate-x-1'
        }`} />
      </button>
    </div>
  )
}
