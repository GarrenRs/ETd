
'use client'

import Link from 'next/link'

export default function AboutPage() {
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
              <Link href="/teachers" className="text-gray-600 hover:text-primary transition">المعلمون</Link>
              <Link href="/login">
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                  تسجيل الدخول
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">من نحن</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            منصة تعليمية جزائرية رائدة تهدف إلى تطوير التعليم الإلكتروني وتوفير أفضل تجربة تعليمية
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">رؤيتنا</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              نسعى لأن نكون المنصة التعليمية الأولى في الجزائر، حيث نوفر محتوى تعليمي عالي الجودة يساعد الطلاب على تحقيق أهدافهم الأكاديمية والمهنية.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              نؤمن بأن التعليم حق للجميع، ونعمل على جعله متاحاً وسهل الوصول لكل من يسعى للمعرفة والتطور.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-3xl h-96 flex items-center justify-center text-9xl">
            🎯
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">قيمنا</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon="🎓"
              title="الجودة"
              description="نلتزم بتقديم محتوى تعليمي عالي الجودة من أفضل المعلمين والخبراء"
            />
            <ValueCard
              icon="🤝"
              title="الشفافية"
              description="نؤمن بالشفافية الكاملة في التعامل مع طلابنا ومعلمينا"
            />
            <ValueCard
              icon="💡"
              title="الابتكار"
              description="نستخدم أحدث التقنيات لتوفير تجربة تعليمية مميزة ومبتكرة"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">إنجازاتنا</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <StatCard number="1,520+" label="طالب نشط" icon="👨‍🎓" />
          <StatCard number="178+" label="معلم محترف" icon="👨‍🏫" />
          <StatCard number="245+" label="دورة تعليمية" icon="📚" />
          <StatCard number="4.8/5" label="تقييم المستخدمين" icon="⭐" />
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">فريق العمل</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <TeamMember name="د. أحمد السعيد" role="المدير العام" image="👨‍💼" />
            <TeamMember name="م. فاطمة محمد" role="مديرة التقنية" image="👩‍💻" />
            <TeamMember name="أ. محمد علي" role="مدير المحتوى" image="👨‍🏫" />
            <TeamMember name="د. سارة خالد" role="مديرة الجودة" image="👩‍🔬" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">انضم إلينا اليوم!</h2>
          <p className="text-xl opacity-90 mb-8">
            ابدأ رحلتك التعليمية مع أفضل منصة تعليمية في الجزائر
          </p>
          <Link href="/register">
            <button className="px-10 py-4 bg-white text-primary rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg">
              سجل الآن مجاناً
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ icon, title, description }: any) {
  return (
    <div className="text-center p-6">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label, icon }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

function TeamMember({ name, role, image }: any) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-full flex items-center justify-center mx-auto mb-4 text-6xl">
        {image}
      </div>
      <h3 className="font-bold text-lg text-gray-900">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  )
}
