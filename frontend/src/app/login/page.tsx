'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { db } = await import('@/lib/db')
      
      const user = db.getUserByEmail(formData.email)

      if (!user) {
        setError('البريد الإلكتروني غير مسجل')
        return
      }

      if (user.password !== formData.password) {
        setError('كلمة المرور غير صحيحة')
        return
      }

      if (user.status === 'pending') {
        setError('حسابك قيد المراجعة. سيتم إعلامك عند الموافقة عليه')
        return
      }

      if (user.status === 'rejected') {
        setError('تم رفض طلب تسجيلك. يرجى التواصل مع الإدارة')
        return
      }

      const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        phone: user.phone,
        wilaya: user.wilaya,
        bio: user.bio,
        specialization: user.specialization
      }

      if (formData.remember) {
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData))
      }

      router.push('/platform')
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition backdrop-blur-sm"
        >
          ← العودة للرئيسية
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl">📚</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">منصة التعليم الجزائرية</h1>
          <p className="text-gray-600">سجل دخولك للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="example@edu.dz"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="remember" className="mr-2 text-sm text-gray-700">
              تذكرني
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-600">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-primary hover:text-primary-dark font-semibold">
              سجل الآن
            </Link>
          </p>

          <div className="text-center text-sm text-gray-600 mt-4">
            <p className="mb-2">حسابات تجريبية:</p>
            <div className="space-y-1 text-xs bg-gray-50 p-3 rounded-lg">
              <p>المدير: admin@edu.dz / admin123</p>
              <p>الأستاذ: teacher@edu.dz / teacher123</p>
              <p>الطالب: student@edu.dz / student123</p>
              <p>المراقب: supervisor@edu.dz / supervisor123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}