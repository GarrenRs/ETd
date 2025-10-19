
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type UserRole = 'student' | 'teacher' | 'supervisor'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole>('student')
  const [formData, setFormData] = useState({
    // معلومات أساسية
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    wilaya: '',
    
    // للطلاب
    studentLevel: '',
    dateOfBirth: '',
    
    // للأساتذة
    specialization: '',
    teachingExperience: '',
    qualifications: '',
    certificateFile: null as File | null,
    nationalIdFile: null as File | null,
    
    // للمراقبين
    supervisorExperience: '',
    recommendationLetter: null as File | null,
    previousWork: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const wilayas = [
    'الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'تلمسان', 'سطيف', 'باتنة', 'بجاية',
    'ورقلة', 'تيارت', 'البليدة', 'بسكرة', 'المسيلة', 'سعيدة', 'الشلف'
  ]

  const studentLevels = [
    'السنة الأولى ابتدائي', 'السنة الثانية ابتدائي', 'السنة الثالثة ابتدائي',
    'السنة الرابعة ابتدائي', 'السنة الخامسة ابتدائي',
    'السنة الأولى متوسط', 'السنة الثانية متوسط', 'السنة الثالثة متوسط', 'السنة الرابعة متوسط',
    'السنة الأولى ثانوي', 'السنة الثانية ثانوي', 'السنة الثالثة ثانوي'
  ]

  const specializations = [
    'الرياضيات', 'الفيزياء', 'الكيمياء', 'علوم الطبيعة والحياة',
    'اللغة العربية', 'اللغة الفرنسية', 'اللغة الإنجليزية',
    'التاريخ والجغرافيا', 'الفلسفة', 'علوم الحاسوب',
    'التربية الإسلامية', 'التربية المدنية', 'التربية الموسيقية'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // التحقق من كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      return
    }

    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }

    // التحقق من المتطلبات الخاصة
    if (role === 'teacher') {
      if (!formData.certificateFile || !formData.nationalIdFile) {
        setError('يرجى رفع جميع الوثائق المطلوبة')
        return
      }
    }

    if (role === 'supervisor') {
      if (!formData.recommendationLetter) {
        setError('يرجى رفع خطاب التوصية')
        return
      }
    }

    try {
      // استيراد نظام قاعدة البيانات
      const { db } = await import('@/lib/db')
      
      // التحقق من وجود البريد الإلكتروني
      const existingUser = db.getUserByEmail(formData.email)
      if (existingUser) {
        setError('البريد الإلكتروني مستخدم بالفعل')
        return
      }

      // إنشاء المستخدم الجديد
      const newUser = db.createUser({
        email: formData.email,
        password: formData.password,
        role: role,
        name: formData.fullName,
        phone: formData.phone,
        wilaya: formData.wilaya,
        studentLevel: formData.studentLevel,
        dateOfBirth: formData.dateOfBirth,
        specialization: formData.specialization,
        teachingExperience: formData.teachingExperience,
        qualifications: formData.qualifications,
        supervisorExperience: formData.supervisorExperience,
        previousWork: formData.previousWork,
        status: role === 'student' ? 'active' : 'pending'
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى')
    }
  }

  const nextStep = () => {
    if (step === 1 && !role) {
      setError('يرجى اختيار نوع الحساب')
      return
    }
    setError('')
    setStep(step + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">📚</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">منصة التعليم الجزائرية</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-600">انضم إلى مجتمعنا التعليمي</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary font-semibold' : 'text-gray-500'}>نوع الحساب</span>
            <span className={step >= 2 ? 'text-primary font-semibold' : 'text-gray-500'}>المعلومات الأساسية</span>
            <span className={step >= 3 ? 'text-primary font-semibold' : 'text-gray-500'}>تفاصيل إضافية</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* Step 1: اختيار نوع الحساب */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">اختر نوع الحساب</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <RoleCard
                    icon="👨‍🎓"
                    title="طالب"
                    description="للتعلم والمتابعة"
                    selected={role === 'student'}
                    onClick={() => setRole('student')}
                  />
                  <RoleCard
                    icon="👨‍🏫"
                    title="أستاذ"
                    description="لتقديم الدروس"
                    badge="يتطلب موافقة"
                    selected={role === 'teacher'}
                    onClick={() => setRole('teacher')}
                  />
                  <RoleCard
                    icon="👔"
                    title="مراقب"
                    description="لمراجعة المحتوى"
                    badge="يتطلب موافقة"
                    selected={role === 'supervisor'}
                    onClick={() => setRole('supervisor')}
                  />
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
                >
                  التالي
                </button>
              </div>
            )}

            {/* Step 2: المعلومات الأساسية */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">المعلومات الأساسية</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="8 أحرف على الأقل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="أعد إدخال كلمة المرور"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="0555123456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الولاية</label>
                    <select
                      required
                      value={formData.wilaya}
                      onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option value="">اختر الولاية</option>
                      {wilayas.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    السابق
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: تفاصيل إضافية */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">تفاصيل إضافية</h2>

                {role === 'student' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المستوى الدراسي</label>
                      <select
                        required
                        value={formData.studentLevel}
                        onChange={(e) => setFormData({ ...formData, studentLevel: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="">اختر المستوى</option>
                        {studentLevels.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                )}

                {role === 'teacher' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                        <select
                          required
                          value={formData.specialization}
                          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                          <option value="">اختر التخصص</option>
                          {specializations.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                        <input
                          type="number"
                          required
                          min="0"
                          value={formData.teachingExperience}
                          onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="عدد السنوات"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المؤهلات الأكاديمية</label>
                      <textarea
                        required
                        value={formData.qualifications}
                        onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        rows={3}
                        placeholder="اذكر شهاداتك العلمية ومؤهلاتك"
                      />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 font-semibold mb-3">📎 الوثائق المطلوبة:</p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">شهادة التخرج أو الخبرة</label>
                          <input
                            type="file"
                            required
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setFormData({ ...formData, certificateFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">بطاقة التعريف الوطنية</label>
                          <input
                            type="file"
                            required
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setFormData({ ...formData, nationalIdFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {role === 'supervisor' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الخبرة في المراقبة والإشراف</label>
                      <textarea
                        required
                        value={formData.supervisorExperience}
                        onChange={(e) => setFormData({ ...formData, supervisorExperience: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        rows={3}
                        placeholder="اذكر خبراتك السابقة في المراقبة أو الإشراف التربوي"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">أعمال سابقة</label>
                      <textarea
                        required
                        value={formData.previousWork}
                        onChange={(e) => setFormData({ ...formData, previousWork: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        rows={3}
                        placeholder="اذكر المؤسسات التي عملت بها سابقاً"
                      />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 font-semibold mb-3">📎 الوثائق المطلوبة:</p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">خطاب توصية من جهة سابقة</label>
                        <input
                          type="file"
                          required
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setFormData({ ...formData, recommendationLetter: e.target.files?.[0] || null })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    ✅ تم التسجيل بنجاح! سيتم تحويلك لصفحة تسجيل الدخول...
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    السابق
                  </button>
                  <button
                    type="submit"
                    disabled={success}
                    className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50"
                  >
                    {role === 'student' ? 'إنشاء الحساب' : 'إرسال طلب التسجيل'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6">
          لديك حساب بالفعل؟{' '}
          <Link href="/login" className="text-primary hover:text-primary-dark font-semibold">
            سجل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}

function RoleCard({ icon, title, description, badge, selected, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
        selected
          ? 'border-primary bg-primary/5 shadow-lg'
          : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
      }`}
    >
      {badge && (
        <span className="absolute top-2 left-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="text-5xl mb-3 text-center">{icon}</div>
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
      )}
    </div>
  )
}
