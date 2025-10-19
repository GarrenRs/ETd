
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TeacherCoursesPage() {
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

  const courses = [
    { id: 1, title: 'الرياضيات المتقدمة', students: 45, status: 'نشط', price: '5000 دج', rating: 4.9 },
    { id: 2, title: 'الفيزياء النظرية', students: 38, status: 'نشط', price: '4500 دج', rating: 4.7 },
    { id: 3, title: 'علوم الحاسوب', students: 41, status: 'نشط', price: '6000 دج', rating: 4.8 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/platform/dashboard/teacher" className="text-primary hover:text-primary-dark">
                <span className="text-2xl">←</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">دوراتي</h1>
                <p className="text-sm text-gray-500">إدارة وإنشاء الدورات</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
              + إضافة دورة جديدة
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white text-6xl">📚</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">{course.status}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">الطلاب المسجلون</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">السعر</span>
                    <span className="font-semibold text-primary">{course.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">التقييم</span>
                    <span className="font-semibold flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm">
                    إدارة
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm">
                    إحصائيات
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
