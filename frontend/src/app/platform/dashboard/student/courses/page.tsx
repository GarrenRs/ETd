
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function StudentCoursesPage() {
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

  const availableCourses = [
    { id: 1, title: 'الرياضيات المتقدمة', teacher: 'د. أحمد محمد', price: '5000 دج', rating: 4.9, students: 45, enrolled: false },
    { id: 2, title: 'الفيزياء النظرية', teacher: 'د. سارة علي', price: '4500 دج', rating: 4.7, students: 38, enrolled: false },
    { id: 3, title: 'علوم الحاسوب', teacher: 'م. محمد خالد', price: '6000 دج', rating: 4.8, students: 41, enrolled: true },
    { id: 4, title: 'الكيمياء العضوية', teacher: 'د. فاطمة زهراء', price: '5500 دج', rating: 4.6, students: 32, enrolled: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/student" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الدورات المتاحة</h1>
              <p className="text-sm text-gray-500">تصفح والتسجيل في الدورات</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="ابحث عن دورة..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
            <option>جميع المواد</option>
            <option>رياضيات</option>
            <option>فيزياء</option>
            <option>كيمياء</option>
            <option>حاسوب</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white text-6xl">📚</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">بواسطة {course.teacher}</p>
                <div className="space-y-2 mb-4">
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">الطلاب</span>
                    <span className="font-semibold">{course.students} طالب</span>
                  </div>
                </div>
                {course.enrolled ? (
                  <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    متابعة الدورة
                  </button>
                ) : (
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                    التسجيل الآن
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
