
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const courses = [
  { id: 1, title: 'الرياضيات المتقدمة', teacher: 'د. أحمد محمد', students: 145, rating: 4.8, price: 2500, image: '📐', category: 'رياضيات', level: 'متقدم' },
  { id: 2, title: 'الفيزياء النظرية', teacher: 'د. سارة علي', students: 98, rating: 4.9, price: 2800, image: '⚛️', category: 'علوم', level: 'متوسط' },
  { id: 3, title: 'البرمجة بلغة Python', teacher: 'م. محمد خالد', students: 234, rating: 4.7, price: 3000, image: '🐍', category: 'برمجة', level: 'مبتدئ' },
  { id: 4, title: 'اللغة الإنجليزية المتقدمة', teacher: 'أ. فاطمة حسن', students: 187, rating: 4.6, price: 2200, image: '🇬🇧', category: 'لغات', level: 'متقدم' },
  { id: 5, title: 'الكيمياء العضوية', teacher: 'د. عمر سعيد', students: 76, rating: 4.8, price: 2600, image: '🧪', category: 'علوم', level: 'متوسط' },
  { id: 6, title: 'التاريخ الإسلامي', teacher: 'د. ياسر إبراهيم', students: 112, rating: 4.7, price: 2000, image: '📜', category: 'تاريخ', level: 'مبتدئ' },
  { id: 7, title: 'تصميم الويب الحديث', teacher: 'م. ليلى أحمد', students: 203, rating: 4.9, price: 3200, image: '🎨', category: 'برمجة', level: 'متوسط' },
  { id: 8, title: 'علوم الحاسوب', teacher: 'د. كريم عبدالله', students: 156, rating: 4.8, price: 2900, image: '💻', category: 'برمجة', level: 'مبتدئ' },
]

export default function CoursesPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [selectedLevel, setSelectedLevel] = useState('الكل')

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    setIsLoggedIn(!!userData)
  }, [])

  const handleCourseClick = (courseId: number) => {
    if (!isLoggedIn) {
      router.push('/login')
    } else {
      // هنا يمكن الانتقال لصفحة تفاصيل الدورة
      alert('جاري تحميل الدورة...')
    }
  }

  const categories = ['الكل', 'رياضيات', 'علوم', 'برمجة', 'لغات', 'تاريخ']
  const levels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم']

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'الكل' || course.category === selectedCategory
    const levelMatch = selectedLevel === 'الكل' || course.level === selectedLevel
    return categoryMatch && levelMatch
  })

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
              <Link href="/teachers" className="text-gray-600 hover:text-primary transition">المعلمون</Link>
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
          <h1 className="text-5xl font-bold mb-4">اكتشف دوراتنا التعليمية</h1>
          <p className="text-xl opacity-90 mb-8">أكثر من {courses.length} دورة تعليمية عالية الجودة</p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="ابحث عن دورة..."
              className="w-full px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">التصنيف:</span>
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">المستوى:</span>
              <div className="flex gap-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedLevel === level
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center text-8xl">
                {course.image}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.teacher}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-sm">{course.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {course.students} طالب
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-primary">{course.price} دج</span>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm font-semibold">
                    {isLoggedIn ? 'عرض التفاصيل' : 'سجل الدخول'}
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
