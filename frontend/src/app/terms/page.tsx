
'use client'

import Link from 'next/link'

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-4">الشروط والأحكام</h1>
          <p className="text-xl">شروط استخدام منصة التعليم الجزائرية</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. المقدمة والقبول</h2>
            <p className="text-gray-700 leading-relaxed">
              بسم الله الرحمن الرحيم. مرحباً بكم في منصة التعليم الجزائرية. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الشروط والأحكام. تم تصميم هذه المنصة لتكون متوافقة مع قيم ومبادئ الشريعة الإسلامية السمحة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. السلوك الأخلاقي والآداب العامة</h2>
            <div className="space-y-3 text-gray-700">
              <p className="leading-relaxed">نلتزم في منصتنا بالقيم الإسلامية والأخلاق الحميدة، ونتوقع من جميع المستخدمين الالتزام بما يلي:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li><strong>اللباس المحتشم:</strong> يجب على المعلمين والمعلمات الظهور بلباس محتشم ومحترم أثناء تسجيل الفيديوهات التعليمية، بما يتوافق مع تعاليم الدين الإسلامي الحنيف.</li>
                <li><strong>اللغة المهذبة:</strong> استخدام لغة محترمة وخالية من الألفاظ النابية أو المسيئة.</li>
                <li><strong>المحتوى الحلال:</strong> جميع المحتويات يجب أن تكون حلالاً وخالية من أي مخالفات شرعية.</li>
                <li><strong>احترام الآخرين:</strong> التعامل مع جميع المستخدمين باحترام وأدب.</li>
                <li><strong>الأمانة العلمية:</strong> عدم نسخ المحتوى أو انتحال الأعمال الأكاديمية.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. شروط التسجيل</h2>
            <div className="space-y-3 text-gray-700">
              <ul className="list-disc pr-6 space-y-2">
                <li>يجب أن يكون عمر المستخدم 13 عاماً على الأقل للتسجيل في المنصة.</li>
                <li>يجب تقديم معلومات صحيحة ودقيقة عند التسجيل.</li>
                <li>بالنسبة للمعلمين والمراقبين، يتطلب التسجيل تقديم الوثائق اللازمة والموافقة من الإدارة.</li>
                <li>يتحمل المستخدم مسؤولية الحفاظ على سرية كلمة المرور الخاصة به.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. حقوق الملكية الفكرية</h2>
            <p className="text-gray-700 leading-relaxed">
              جميع المحتويات المتاحة على المنصة محمية بحقوق الملكية الفكرية. لا يجوز نسخ أو توزيع أو نشر أي محتوى دون إذن صريح من صاحبه. يحتفظ المعلمون بحقوق ملكية المحتوى الذي ينشرونه.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. المعاملات المالية</h2>
            <div className="space-y-3 text-gray-700">
              <ul className="list-disc pr-6 space-y-2">
                <li>جميع المعاملات المالية تتم وفقاً للأحكام الشرعية وخالية من الربا.</li>
                <li>الأسعار معلنة بوضوح وشاملة للضرائب.</li>
                <li>يمكن استرداد المبالغ المدفوعة وفقاً لسياسة الاسترجاع المعلنة.</li>
                <li>الأرباح الخاصة بالمعلمين تُصرف وفقاً للاتفاقيات المبرمة.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. الخصوصية وحماية البيانات</h2>
            <p className="text-gray-700 leading-relaxed">
              نحن ملتزمون بحماية خصوصيتك. يتم جمع البيانات الشخصية فقط للأغراض التعليمية والإدارية. لن يتم مشاركة بياناتك مع أطراف ثالثة دون موافقتك، إلا في حالات قانونية ضرورية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. المحتوى المحظور</h2>
            <div className="space-y-3 text-gray-700">
              <p>يُحظر نشر أو مشاركة المحتوى التالي:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>المحتوى المخالف للشريعة الإسلامية</li>
                <li>المحتوى الإباحي أو غير الأخلاقي</li>
                <li>المحتوى الذي يحرض على العنف أو الكراهية</li>
                <li>المحتوى السياسي المثير للفتنة</li>
                <li>المعلومات الكاذبة أو المضللة</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. المسؤوليات والالتزامات</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>المعلمون:</strong></p>
              <ul className="list-disc pr-6 space-y-2">
                <li>تقديم محتوى تعليمي عالي الجودة</li>
                <li>الالتزام بمواعيد الدروس المباشرة</li>
                <li>التفاعل مع استفسارات الطلاب بشكل مهني</li>
                <li>الحفاظ على المعايير الأخلاقية والشرعية</li>
              </ul>
              <p className="mt-4"><strong>الطلاب:</strong></p>
              <ul className="list-disc pr-6 space-y-2">
                <li>الالتزام بآداب التعلم والاحترام المتبادل</li>
                <li>عدم مشاركة حسابات الدخول مع الآخرين</li>
                <li>الالتزام بمواعيد الاختبارات والواجبات</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. الإجراءات التأديبية</h2>
            <p className="text-gray-700 leading-relaxed">
              في حالة مخالفة هذه الشروط، تحتفظ الإدارة بالحق في اتخاذ إجراءات تأديبية تشمل التحذير، تعليق الحساب مؤقتاً، أو إلغاء الحساب نهائياً حسب جسامة المخالفة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. التعديلات على الشروط</h2>
            <p className="text-gray-700 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعارات المنصة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. القانون الواجب التطبيق</h2>
            <p className="text-gray-700 leading-relaxed">
              تخضع هذه الشروط والأحكام لقوانين الجمهورية الجزائرية الديمقراطية الشعبية، وتُحل أي نزاعات وفقاً للقوانين الجزائرية ومبادئ الشريعة الإسلامية.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. الاتصال</h2>
            <p className="text-gray-700 leading-relaxed">
              للاستفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا عبر صفحة <Link href="/contact" className="text-primary hover:text-primary-dark font-semibold">اتصل بنا</Link>.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500 text-center">
              آخر تحديث: {new Date().toLocaleDateString('ar-DZ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
