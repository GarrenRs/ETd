
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (userData) {
      router.push('/platform')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
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
                <p className="text-sm text-gray-500">التعليم الإلكتروني المتطور</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/courses">
                <button className="px-4 py-2 text-gray-700 hover:text-primary transition font-semibold">
                  الدورات
                </button>
              </Link>
              <Link href="/teachers">
                <button className="px-4 py-2 text-gray-700 hover:text-primary transition font-semibold">
                  المعلمون
                </button>
              </Link>
              <Link href="/about">
                <button className="px-4 py-2 text-gray-700 hover:text-primary transition font-semibold">
                  من نحن
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              مستقبل التعليم
              <span className="block text-primary">في الجزائر</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              منصة تعليمية شاملة توفر أفضل تجربة تعليمية للطلاب والمعلمين في الجزائر. 
              انضم إلينا اليوم وابدأ رحلتك التعليمية!
            </p>
            <div className="flex gap-4">
              <Link href="/register">
                <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg">
                  ابدأ الآن
                </button>
              </Link>
              <Link href="/courses">
                <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-bold text-lg">
                  اكتشف الدورات
                </button>
              </Link>
            </div>
            <div className="flex gap-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1,520+</div>
                <div className="text-gray-600">طالب</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">178+</div>
                <div className="text-gray-600">معلم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">245+</div>
                <div className="text-gray-600">دورة</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-9xl">🎓</span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-5xl shadow-xl">
              ⭐
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-400 rounded-full flex items-center justify-center text-4xl shadow-xl">
              ✅
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختارنا؟</h2>
            <p className="text-xl text-gray-600">نوفر لك أفضل تجربة تعليمية متكاملة</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎯"
              title="محتوى تعليمي متميز"
              description="دروس ومواد تعليمية عالية الجودة من أفضل المعلمين"
              color="from-blue-500 to-blue-600"
            />
            <FeatureCard 
              icon="💻"
              title="تعلم تفاعلي"
              description="واجهة سهلة الاستخدام مع أدوات تفاعلية متقدمة"
              color="from-purple-500 to-purple-600"
            />
            <FeatureCard 
              icon="📊"
              title="تتبع التقدم"
              description="راقب تقدمك وحقق أهدافك التعليمية بسهولة"
              color="from-green-500 to-green-600"
            />
            <FeatureCard 
              icon="👥"
              title="مجتمع تفاعلي"
              description="تواصل مع المعلمين والطلاب وشارك خبراتك"
              color="from-orange-500 to-orange-600"
            />
            <FeatureCard 
              icon="🏆"
              title="شهادات معتمدة"
              description="احصل على شهادات معترف بها عند إتمام الدورات"
              color="from-yellow-500 to-yellow-600"
            />
            <FeatureCard 
              icon="🔒"
              title="أمان وخصوصية"
              description="بياناتك آمنة ومحمية بأحدث تقنيات الأمان"
              color="from-red-500 to-red-600"
            />
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">للجميع</h2>
            <p className="text-xl text-gray-600">حلول متكاملة لكل الأدوار</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard 
              icon="👨‍🎓"
              title="الطلاب"
              description="تعلم بطريقة ممتعة وتفاعلية"
              features={["دورات شاملة", "واجبات تفاعلية", "تقييم فوري"]}
            />
            <RoleCard 
              icon="👨‍🏫"
              title="المعلمون"
              description="شارك معرفتك واكسب دخل إضافي"
              features={["إنشاء دورات", "إدارة الطلاب", "تحليلات مفصلة"]}
            />
            <RoleCard 
              icon="👔"
              title="المشرفون"
              description="راقب جودة المحتوى التعليمي"
              features={["مراجعة المحتوى", "معالجة الشكاوى", "ضمان الجودة"]}
            />
            <RoleCard 
              icon="⚙️"
              title="المدراء"
              description="أدر المنصة بكفاءة عالية"
              features={["إدارة المستخدمين", "التقارير", "الإعدادات"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك التعليمية اليوم!</h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف الطلاب والمعلمين الذين اختاروا منصتنا لتحقيق أهدافهم التعليمية
          </p>
          <Link href="/register">
            <button className="px-10 py-4 bg-white text-primary rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg">
              سجل الآن مجاناً
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📚</span>
                </div>
                <span className="font-bold text-lg">منصة التعليم</span>
              </div>
              <p className="text-gray-400 text-sm">
                منصة تعليمية جزائرية تهدف لتطوير التعليم الإلكتروني
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white transition">الرئيسية</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">الدورات</Link></li>
                <li><Link href="/teachers" className="hover:text-white transition">المعلمون</Link></li>
                <li><Link href="/about" className="hover:text-white transition">من نحن</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">الدعم</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/help" className="hover:text-white transition">مركز المساعدة</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">الأسئلة الشائعة</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">اتصل بنا</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">الشروط والأحكام</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">تابعنا</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition">
                  <span>📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition">
                  <span>📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition">
                  <span>🐦</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 منصة التعليم الجزائرية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function RoleCard({ icon, title, description, features }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-green-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
