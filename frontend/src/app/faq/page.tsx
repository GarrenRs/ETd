
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: 'عام',
      questions: [
        {
          q: 'ما هي منصة التعليم الجزائرية؟',
          a: 'منصة التعليم الجزائرية هي منصة تعليمية إلكترونية شاملة تربط المعلمين بالطلاب في الجزائر، وتوفر دورات تعليمية عالية الجودة في مختلف المجالات الأكاديمية.'
        },
        {
          q: 'كيف يمكنني إنشاء حساب؟',
          a: 'يمكنك إنشاء حساب من خلال زيارة صفحة التسجيل واختيار نوع الحساب (طالب، معلم، أو مراقب) ثم إدخال معلوماتك الشخصية. للمعلمين والمراقبين، يتطلب الأمر موافقة الإدارة.'
        },
        {
          q: 'هل المنصة مجانية؟',
          a: 'نعم، التسجيل في المنصة مجاني. بعض الدورات مجانية بالكامل، بينما تتطلب دورات أخرى رسوماً رمزية لدعم المعلمين وتطوير المنصة.'
        }
      ]
    },
    {
      category: 'للطلاب',
      questions: [
        {
          q: 'كيف أسجل في دورة؟',
          a: 'بعد تسجيل الدخول، تصفح الدورات المتاحة واختر الدورة التي تريد الالتحاق بها، ثم اضغط على زر "التسجيل في الدورة".'
        },
        {
          q: 'هل يمكنني الوصول للدورات على الهاتف؟',
          a: 'نعم، المنصة متوافقة تماماً مع الهواتف الذكية والأجهزة اللوحية، ويمكنك الوصول إلى جميع الدورات من أي جهاز.'
        },
        {
          q: 'كيف أحصل على شهادة؟',
          a: 'بعد إتمام جميع دروس الدورة والنجاح في الاختبارات النهائية، ستحصل تلقائياً على شهادة إتمام يمكنك تحميلها من حسابك.'
        }
      ]
    },
    {
      category: 'للمعلمين',
      questions: [
        {
          q: 'كيف أصبح معلماً على المنصة؟',
          a: 'سجل حساباً كمعلم وقدم الوثائق المطلوبة (الشهادات، بطاقة التعريف). سيتم مراجعة طلبك من قبل فريق الإدارة خلال 3-5 أيام عمل.'
        },
        {
          q: 'كيف أنشئ دورة جديدة؟',
          a: 'بعد الموافقة على حسابك، يمكنك إنشاء دورة جديدة من لوحة التحكم الخاصة بك، حيث ستقوم برفع الدروس والمحتوى التعليمي.'
        },
        {
          q: 'كيف أتقاضى أجري؟',
          a: 'يتم صرف الأرباح شهرياً عبر التحويل البنكي أو الطرق المتفق عليها. تعتمد الأرباح على عدد الطلاب المسجلين في دوراتك.'
        }
      ]
    },
    {
      category: 'المدفوعات',
      questions: [
        {
          q: 'ما هي طرق الدفع المتاحة؟',
          a: 'نقبل الدفع عبر البطاقات البنكية، CCP، Baridimob، والدفع النقدي في المراكز المعتمدة.'
        },
        {
          q: 'هل يمكنني استرجاع أموالي؟',
          a: 'نعم، يمكنك طلب استرجاع المبلغ خلال 7 أيام من التسجيل في الدورة إذا لم تشاهد أكثر من 20% من المحتوى.'
        },
        {
          q: 'هل الأسعار شاملة للضرائب؟',
          a: 'نعم، جميع الأسعار المعروضة شاملة للضرائب المطبقة في الجزائر.'
        }
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

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">الأسئلة الشائعة</h1>
          <p className="text-xl">إجابات على أكثر الأسئلة شيوعاً</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, qIndex) => {
                const index = catIndex * 100 + qIndex
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-900">{faq.q}</span>
                      <span className="text-2xl text-primary">
                        {openIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t">
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Still Have Questions */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">لا زلت تحتاج مساعدة؟</h2>
          <p className="text-xl text-gray-600 mb-8">تواصل معنا وسنكون سعداء بمساعدتك</p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
                اتصل بنا
              </button>
            </Link>
            <Link href="/help">
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold">
                مركز المساعدة
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
