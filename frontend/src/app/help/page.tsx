
'use client'

import Link from 'next/link'

export default function HelpPage() {
  const helpTopics = [
    {
      icon: '🎓',
      title: 'البدء في التعلم',
      description: 'كيف تبدأ رحلتك التعليمية على المنصة',
      articles: [
        'كيفية إنشاء حساب جديد',
        'التسجيل في الدورات',
        'متابعة تقدمك الدراسي',
        'الحصول على الشهادات'
      ]
    },
    {
      icon: '👨‍🏫',
      title: 'للمعلمين',
      description: 'دليل المعلمين لإنشاء وإدارة الدورات',
      articles: [
        'إنشاء دورة جديدة',
        'رفع الدروس والمحتوى',
        'إدارة الطلاب',
        'تقييم الواجبات'
      ]
    },
    {
      icon: '💳',
      title: 'الدفع والاشتراكات',
      description: 'معلومات حول الدفع والاشتراكات',
      articles: [
        'طرق الدفع المتاحة',
        'سياسة الاسترجاع',
        'الترقية للعضوية المميزة',
        'إلغاء الاشتراك'
      ]
    },
    {
      icon: '🔧',
      title: 'المشاكل التقنية',
      description: 'حلول للمشاكل التقنية الشائعة',
      articles: [
        'مشاكل تسجيل الدخول',
        'مشاكل الفيديو',
        'تحسين الأداء',
        'المتطلبات التقنية'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <span className="text-xl font-bold text-gray-800">منصة التعليم</span>
            </Link>
            <Link href="/">
              <button className="px-4 py-2 text-gray-700 hover:text-primary transition">
                العودة للرئيسية
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">مركز المساعدة</h1>
          <p className="text-xl mb-8">كيف يمكننا مساعدتك اليوم؟</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن حل..."
                className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg outline-none"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{topic.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <ul className="space-y-2">
                    {topic.articles.map((article, i) => (
                      <li key={i}>
                        <Link href="#" className="text-primary hover:text-primary-dark flex items-center gap-2">
                          <span>→</span>
                          <span>{article}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-xl text-gray-600 mb-8">فريق الدعم جاهز لمساعدتك</p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
              اتصل بنا
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
