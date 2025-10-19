
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useNotifications } from '@/contexts/NotificationContext'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const { addNotification } = useNotifications()
  
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    wilaya: '',
    bio: '',
    specialization: '',
  })

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setEditData({
      name: parsedUser.name || '',
      phone: parsedUser.phone || '',
      wilaya: parsedUser.wilaya || '',
      bio: parsedUser.bio || '',
      specialization: parsedUser.specialization || '',
    })
  }, [router])

  const handleSave = () => {
    const updatedUser = { ...user, ...editData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
    addNotification({
      type: 'success',
      title: 'تم الحفظ',
      message: 'تم تحديث معلومات الملف الشخصي بنجاح'
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/platform" className="flex items-center gap-2 text-primary hover:text-primary-dark">
              <span className="text-xl">←</span>
              <span className="font-semibold">العودة للمنصة</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">الملف الشخصي</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-5xl font-bold">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name || user.email}</h2>
                <p className="text-gray-500 mt-1">{getRoleTitle(user.role)}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {user.role === 'student' && '🎓 طالب نشط'}
                  {user.role === 'teacher' && '👨‍🏫 أستاذ معتمد'}
                  {user.role === 'supervisor' && '👔 مراقب'}
                  {user.role === 'admin' && '⚙️ مدير عام'}
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition ${
                    activeTab === 'info' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  ℹ️ المعلومات الشخصية
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition ${
                    activeTab === 'stats' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  📊 الإحصائيات
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-right px-4 py-3 rounded-lg transition ${
                    activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  ⚙️ الإعدادات
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* المعلومات الشخصية */}
            {activeTab === 'info' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">المعلومات الشخصية</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                    >
                      ✏️ تعديل
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        ✓ حفظ
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        × إلغاء
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <InfoField
                    label="الاسم الكامل"
                    value={editData.name}
                    isEditing={isEditing}
                    onChange={(v) => setEditData({ ...editData, name: v })}
                  />
                  <InfoField
                    label="البريد الإلكتروني"
                    value={user.email}
                    isEditing={false}
                  />
                  <InfoField
                    label="رقم الهاتف"
                    value={editData.phone}
                    isEditing={isEditing}
                    onChange={(v) => setEditData({ ...editData, phone: v })}
                  />
                  <InfoField
                    label="الولاية"
                    value={editData.wilaya}
                    isEditing={isEditing}
                    onChange={(v) => setEditData({ ...editData, wilaya: v })}
                  />
                  {user.role === 'teacher' && (
                    <InfoField
                      label="التخصص"
                      value={editData.specialization}
                      isEditing={isEditing}
                      onChange={(v) => setEditData({ ...editData, specialization: v })}
                    />
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نبذة تعريفية</label>
                    {isEditing ? (
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        rows={4}
                        placeholder="اكتب نبذة عنك..."
                      />
                    ) : (
                      <p className="text-gray-700">{editData.bio || 'لم يتم إضافة نبذة بعد'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* الإحصائيات */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6">إحصائياتي</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {user.role === 'student' && (
                      <>
                        <StatCard title="الدورات المسجلة" value="5" icon="📚" />
                        <StatCard title="الدروس المكتملة" value="23" icon="✅" />
                        <StatCard title="ساعات التعلم" value="45" icon="⏱️" />
                        <StatCard title="الشهادات" value="2" icon="🏆" />
                      </>
                    )}
                    {user.role === 'teacher' && (
                      <>
                        <StatCard title="الدورات" value="8" icon="📖" />
                        <StatCard title="الطلاب" value="124" icon="👥" />
                        <StatCard title="التقييم" value="4.8/5" icon="⭐" />
                        <StatCard title="الأرباح" value="24,800 دج" icon="💰" />
                      </>
                    )}
                  </div>
                </div>

                {user.role === 'student' && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">الشهادات المكتسبة</h3>
                    <div className="space-y-3">
                      <CertificateCard title="شهادة إتمام دورة الرياضيات" date="15 يناير 2024" />
                      <CertificateCard title="شهادة تميز في الفيزياء" date="10 ديسمبر 2023" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* الإعدادات */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6">إعدادات الحساب</h3>
                  <div className="space-y-4">
                    <SettingToggle label="تلقي إشعارات البريد الإلكتروني" defaultChecked />
                    <SettingToggle label="إظهار الملف الشخصي للآخرين" defaultChecked />
                    <SettingToggle label="السماح بالرسائل المباشرة" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600">المنطقة الخطرة</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      🔒 تغيير كلمة المرور
                    </button>
                    <button className="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition">
                      ⚠️ حذف الحساب
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value, isEditing, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {isEditing && onChange ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      ) : (
        <p className="text-gray-700">{value || 'غير محدد'}</p>
      )}
    </div>
  )
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}

function CertificateCard({ title, date }: any) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg">
      <span className="text-4xl">🏆</span>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm">
        تحميل
      </button>
    </div>
  )
}

function SettingToggle({ label, defaultChecked = false }: any) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative w-14 h-7 rounded-full transition ${
          checked ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-all ${
            checked ? 'right-1' : 'right-8'
          }`}
        />
      </button>
    </div>
  )
}

function getRoleTitle(role: string) {
  const titles: Record<string, string> = {
    admin: 'مدير عام',
    teacher: 'أستاذ',
    student: 'طالب',
    supervisor: 'مراقب'
  }
  return titles[role] || ''
}
