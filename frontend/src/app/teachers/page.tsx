
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const teachers = [
  { id: 1, name: 'د. أحمد محمد', specialty: 'الرياضيات', students: 456, courses: 8, rating: 4.9, experience: '12 سنة', image: '👨‍🏫' },
  { id: 2, name: 'د. سارة علي', specialty: 'الفيزياء', students: 389, courses: 6, rating: 4.8, experience: '10 سنوات', image: '👩‍🏫' },
  { id: 3, name: 'م. محمد خالد', specialty: 'علوم الحاسوب', students: 612, courses: 12, rating: 4.9, experience: '8 سنوات', image: '👨‍💻' },
  { id: 4, name: 'أ. فاطمة حسن', specialty: 'اللغة الإنجليزية', students: 543, courses: 9, rating: 4.7, experience: '15 سنة', image: '👩‍🏫' },
  { id: 5, name: 'د. عمر سعيد', specialty: 'الكيمياء', students: 234, courses: 5, rating: 4.8, experience: '9 سنوات', image: '👨‍🔬' },
  { id: 6, name: 'د. ياسر إبراهيم', specialty: 'التاريخ', students: 312, courses: 7, rating: 4.6, experience: '11 سنة', image: '👨‍🏫' },
  { id: 7, name: 'م. ليلى أحمد', specialty: 'تصميم الويب', students: 487, courses: 10, rating: 4.9, experience: '7 سنوات', image: '👩‍💻' },
  { id: 8, name: 'د. كريم عبدالله', specialty: 'الفلسفة', students: 198, courses: 4, rating: 4.7, experience: '13 سنة', image: '👨‍🏫' },
]

export default function TeachersPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('الكل')

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    setIsLoggedIn(!!userData)
  }, [])

  const handleTeacherClick = (teacherId: number) => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      alert('جاري تحميل ملف المعلم...')
    }
  }

  const specialties = ['الكل', 'الرياضيات', 'الفيزياء', 'علوم الحاسوب', 'اللغة الإنجليزية', 'الكيمياء', 'التاريخ']

  const filteredTeachers = selectedSpecialty === 'الكل'
    ? teachers
    : teachers.filter(t => t.specialty === selectedSpecialty)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <span className="text-xl font-bold text-gray-900">منصة التعليم الجزائرية</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-primary transition">الرئيسية</Link>
              <Link href="/courses" className="text-gray-600 hover:text-primary transition">الدورات</Link>
              <Link href="/about" className="text-gray-600 hover:text-primary transition">من نحن</Link>
              {!isLoggedIn ? (
                <Link href="/login">
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                    تسجيل الدخول
                  </button>
                </Link>
              ) : (
                <Link href="/platform">
                  <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                    المنصة
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">معلمونا المتميزون</h1>
          <p className="text-xl opacity-90 mb-8">أفضل المعلمين والخبراء في مختلف المجالات</p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">{teachers.length}+</div>
              <div className="text-sm opacity-90">معلم محترف</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">4.8/5</div>
              <div className="text-sm opacity-90">متوسط التقييم</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">3,500+</div>
              <div className="text-sm opacity-90">طالب راضٍ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-gray-700 ml-4">التخصص:</span>
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedSpecialty === spec
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeachers.map(teacher => (
            <div
              key={teacher.id}
              onClick={() => handleTeacherClick(teacher.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center text-6xl">
                {teacher.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-primary font-semibold mb-4">{teacher.specialty}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">الخبرة:</span>
                    <span className="font-semibold">{teacher.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">الدورات:</span>
                    <span className="font-semibold">{teacher.courses} دورة</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">الطلاب:</span>
                    <span className="font-semibold">{teacher.students} طالب</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold text-lg">{teacher.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm font-semibold">
                    {isLoggedIn ? 'عرض الملف' : 'سجل الدخول'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
