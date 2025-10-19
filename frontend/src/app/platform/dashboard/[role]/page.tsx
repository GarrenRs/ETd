'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useNotifications } from '@/contexts/NotificationContext'

export default function DashboardPage() {
  const router = useRouter()
  const params = useParams()
  const role = params.role as string
  const [user, setUser] = useState<any>(null)
  const { addNotification } = useNotifications()

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== role) {
      router.push(`/platform/dashboard/${parsedUser.role}`)
      return
    }

    setUser(parsedUser)

    // إضافة إشعار ترحيبي
    addNotification({
      type: 'success',
      title: 'مرحباً بك في لوحة التحكم!',
      message: `أهلاً ${parsedUser.name || parsedUser.email}`
    })
  }, [role, router, addNotification])

  const handleLogout = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    addNotification({
      type: 'info',
      title: 'تم تسجيل الخروج',
      message: 'نراك قريباً!'
    })
    setTimeout(() => router.push('/'), 1000)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/platform" className="text-primary hover:text-primary-dark">
                <span className="text-2xl">←</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📚</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">منصة التعليم الجزائرية</h1>
                  <p className="text-sm text-gray-500">{getRoleTitle(role)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/platform/profile">
                <div className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition cursor-pointer">
                  <div className="text-right">
                    <p className="font-semibold text-sm">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500">{getRoleTitle(role)}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {role === 'admin' && <AdminDashboard />}
        {role === 'teacher' && <TeacherDashboard />}
        {role === 'student' && <StudentDashboard />}
        {role === 'supervisor' && <SupervisorDashboard />}
      </main>
    </div>
  )
}

function AdminDashboard() {
  const { addNotification } = useNotifications()
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  useEffect(() => {
    // تحميل الرسائل
    const loadMessages = async () => {
      const { db } = await import('@/lib/db')
      const allMessages = db.getContactMessages()
      setMessages(allMessages.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ))
    }
    loadMessages()

    // الاستماع للرسائل الجديدة
    const handleNewMessage = (e: any) => {
      const newMessage = e.detail
      setMessages(prev => [newMessage, ...prev])
      addNotification({
        type: 'info',
        title: 'رسالة جديدة',
        message: `من ${newMessage.name}: ${newMessage.subject}`
      })
    }

    window.addEventListener('newContactMessage', handleNewMessage)
    return () => window.removeEventListener('newContactMessage', handleNewMessage)
  }, [addNotification])

  const handleMarkAsRead = async (id: string) => {
    const { db } = await import('@/lib/db')
    db.updateContactMessage(id, { status: 'read' })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m))
  }

  const handleResponse = async (id: string, response: string) => {
    const { db } = await import('@/lib/db')
    db.updateContactMessage(id, { status: 'responded', response })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'responded', response } : m))
    addNotification({
      type: 'success',
      title: 'تم الرد',
      message: 'تم إرسال الرد بنجاح'
    })
    setSelectedMessage(null)
  }

  const handleApprove = (name: string) => {
    addNotification({
      type: 'success',
      title: 'تمت الموافقة',
      message: `تمت الموافقة على طلب ${name} بنجاح`,
      action: {
        label: 'عرض التفاصيل',
        onClick: () => console.log('View details')
      }
    })
  }

  const handleReject = (name: string) => {
    addNotification({
      type: 'warning',
      title: 'تم الرفض',
      message: `تم رفض طلب ${name}`
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">لوحة تحكم المدير العام</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المستخدمين" value="1,842" change="+12.5%" icon="👥" color="bg-blue-500" />
        <StatCard title="الأساتذة النشطين" value="178" change="+8%" icon="👨‍🏫" color="bg-green-500" />
        <StatCard title="الطلاب المسجلين" value="1,520" change="+15%" icon="🎓" color="bg-purple-500" />
        <StatCard title="الإيرادات الشهرية" value="45,200 دج" change="+20%" icon="💰" color="bg-yellow-500" />
      </div>

      {/* بطاقات التنقل السريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLinkCard 
          title="الإشعارات" 
          icon="🔔" 
          href="/platform/dashboard/admin/notifications"
          description="عرض آخر التحديثات"
        />
        <QuickLinkCard 
          title="الرسائل" 
          icon="💬" 
          href="/platform/dashboard/admin/messages"
          description="التواصل مع المستخدمين"
        />
        <QuickLinkCard 
          title="الإعدادات" 
          icon="⚙️" 
          href="/platform/dashboard/admin/settings"
          description="إدارة إعدادات الحساب"
        />
        <QuickLinkCard 
          title="الملف الشخصي" 
          icon="👤" 
          href="/platform/profile"
          description="عرض وتحرير الملف"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">طلبات الموافقة المعلقة</h3>
          <div className="space-y-3">
            <PendingItem name="أحمد محمد" type="أستاذ - رياضيات" status="pending" onApprove={handleApprove} onReject={handleReject} />
            <PendingItem name="سارة علي" type="أستاذ - فيزياء" status="pending" onApprove={handleApprove} onReject={handleReject} />
            <PendingItem name="محمد خالد" type="طالب" status="pending" onApprove={handleApprove} onReject={handleReject} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">آخر النشاطات</h3>
          <div className="space-y-3">
            <ActivityItem text="تم تسجيل طالب جديد" time="منذ 5 دقائق" />
            <ActivityItem text="قام الأستاذ سمير بإضافة درس جديد" time="منذ 15 دقيقة" />
            <ActivityItem text="تمت الموافقة على دفعة جديدة" time="منذ ساعة" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
            <span>رسائل الاتصال ({messages.filter(m => m.status === 'new').length} جديدة)</span>
            <span className="text-sm font-normal text-gray-500">إجمالي: {messages.length}</span>
          </h3>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">لا توجد رسائل</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 10).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    msg.status === 'new' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{msg.name}</h4>
                      <p className="text-sm text-gray-600">{msg.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      msg.status === 'new' ? 'bg-blue-500 text-white' :
                      msg.status === 'responded' ? 'bg-green-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {msg.status === 'new' ? 'جديدة' : msg.status === 'responded' ? 'تم الرد' : 'مقروءة'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{msg.subject}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(msg.createdAt).toLocaleString('ar-DZ')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMessage(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h3>
                  <p className="text-gray-600">من: {selectedMessage.name} ({selectedMessage.email})</p>
                  <p className="text-sm text-gray-400">{new Date(selectedMessage.createdAt).toLocaleString('ar-DZ')}</p>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              {selectedMessage.response && (
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">الرد المرسل:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.response}</p>
                </div>
              )}

              {selectedMessage.status !== 'responded' && (
                <div className="space-y-3">
                  <textarea
                    id={`response-${selectedMessage.id}`}
                    placeholder="اكتب ردك هنا..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const textarea = document.getElementById(`response-${selectedMessage.id}`) as HTMLTextAreaElement
                        if (textarea.value.trim()) {
                          handleResponse(selectedMessage.id, textarea.value)
                        }
                      }}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                    >
                      إرسال الرد
                    </button>
                    {selectedMessage.status === 'new' && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        تعليم كمقروءة
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TeacherDashboard() {
  const { addNotification } = useNotifications()
  const router = useRouter()

  const handleAddCourse = () => {
    addNotification({
      type: 'success',
      title: 'درس جديد',
      message: 'تم إنشاء الدرس الجديد بنجاح',
      action: {
        label: 'عرض الدرس',
        onClick: () => console.log('View course')
      }
    })
  }

  const handleMessageReply = (name: string) => {
    addNotification({
      type: 'info',
      title: 'رد على الرسالة',
      message: `تم إرسال الرد إلى ${name}`
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">لوحة تحكم الأستاذ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="الدروس النشطة" value="8" change="+2 جديد" icon="📖" color="bg-blue-500" />
        <StatCard title="الطلاب المسجلون" value="124" change="+15 طالب" icon="👨‍🎓" color="bg-green-500" />
        <StatCard title="أرباح هذا الشهر" value="24,800 دج" change="+18%" icon="💵" color="bg-purple-500" />
        <StatCard title="متوسط التقييم" value="4.8/5" change="ممتاز" icon="⭐" color="bg-yellow-500" />
      </div>

      {/* بطاقات التنقل السريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLinkCard 
          title="دوراتي" 
          icon="📚" 
          href="/platform/dashboard/teacher/courses"
          description="إدارة وإنشاء الدورات"
        />
        <QuickLinkCard 
          title="الإشعارات" 
          icon="🔔" 
          href="/platform/dashboard/teacher/notifications"
          description="عرض آخر التحديثات"
        />
        <QuickLinkCard 
          title="الرسائل" 
          icon="💬" 
          href="/platform/dashboard/teacher/messages"
          description="التواصل مع الطلاب"
        />
        <QuickLinkCard 
          title="الإعدادات" 
          icon="⚙️" 
          href="/platform/dashboard/teacher/settings"
          description="إدارة إعدادات الحساب"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">دروسي</h3>
          <div className="space-y-3">
            <CourseItem title="الرياضيات المتقدمة" students={45} rating={4.9} />
            <CourseItem title="الفيزياء النظرية" students={38} rating={4.7} />
            <CourseItem title="علوم الحاسوب" students={41} rating={4.8} />
          </div>
          <button 
            onClick={handleAddCourse}
            className="w-full mt-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
          >
            + إضافة درس جديد
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">استفسارات الطلاب</h3>
          <div className="space-y-3">
            <MessageItem from="أحمد محمد" message="لدي سؤال حول الدرس الأخير" time="منذ 10 دقائق" onReply={handleMessageReply} />
            <MessageItem from="سارة علي" message="متى موعد الامتحان القادم؟" time="منذ ساعة" onReply={handleMessageReply} />
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentDashboard() {
  const { addNotification } = useNotifications()
  const router = useRouter()

  useEffect(() => {
    // إشعار بالواجبات المستحقة
    addNotification({
      type: 'warning',
      title: 'تذكير: واجب مستحق',
      message: 'لديك واجب رياضيات مستحق اليوم',
      action: {
        label: 'عرض الواجب',
        onClick: () => console.log('View assignment')
      }
    })
  }, [addNotification])

  const handleCourseClick = (title: string) => {
    addNotification({
      type: 'info',
      title: 'تم فتح الدورة',
      message: `جاري تحميل ${title}...`
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">لوحة تحكم الطالب</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="الدورات المسجلة" value="5" change="نشط" icon="📚" color="bg-blue-500" />
        <StatCard title="الدروس المكتملة" value="23" change="+3 هذا الأسبوع" icon="✅" color="bg-green-500" />
        <StatCard title="الواجبات المعلقة" value="4" change="2 مستحقة اليوم" icon="📝" color="bg-orange-500" />
        <StatCard title="معدل التقدم" value="75%" change="+5% هذا الشهر" icon="📊" color="bg-purple-500" />
      </div>

      {/* بطاقات التنقل السريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLinkCard 
          title="الدورات المتاحة" 
          icon="📖" 
          href="/platform/dashboard/student/courses"
          description="تصفح والتسجيل في الدورات"
        />
        <QuickLinkCard 
          title="الإشعارات" 
          icon="🔔" 
          href="/platform/dashboard/student/notifications"
          description="عرض آخر التحديثات"
        />
        <QuickLinkCard 
          title="الرسائل" 
          icon="💬" 
          href="/platform/dashboard/student/messages"
          description="التواصل مع الأساتذة"
        />
        <QuickLinkCard 
          title="الإعدادات" 
          icon="⚙️" 
          href="/platform/dashboard/student/settings"
          description="إدارة إعدادات الحساب"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">دوراتي الحالية</h3>
          <div className="space-y-3">
            <StudentCourse title="الرياضيات" teacher="د. أحمد" progress={80} onClick={handleCourseClick} />
            <StudentCourse title="الفيزياء" teacher="د. سارة" progress={65} onClick={handleCourseClick} />
            <StudentCourse title="علوم الحاسوب" teacher="م. محمد" progress={90} onClick={handleCourseClick} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">الواجبات القادمة</h3>
          <div className="space-y-3">
            <AssignmentItem title="واجب الرياضيات" due="اليوم" status="urgent" />
            <AssignmentItem title="مشروع الفيزياء" due="غداً" status="soon" />
            <AssignmentItem title="اختبار البرمجة" due="بعد 3 أيام" status="normal" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SupervisorDashboard() {
  const { addNotification } = useNotifications()
  const router = useRouter()

  const handleReview = (title: string, approved: boolean) => {
    addNotification({
      type: approved ? 'success' : 'warning',
      title: approved ? 'تمت الموافقة' : 'تم الرفض',
      message: `${approved ? 'تمت الموافقة على' : 'تم رفض'} ${title}`,
      action: {
        label: 'عرض التفاصيل',
        onClick: () => console.log('View details')
      }
    })
  }

  const handleComplaint = (title: string) => {
    addNotification({
      type: 'info',
      title: 'معالجة الشكوى',
      message: `جاري معالجة شكوى: ${title}`
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">لوحة تحكم المراقب</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="مراجعات معلقة" value="12" change="+5 جديد" icon="📋" color="bg-orange-500" />
        <StatCard title="محتوى تمت مراجعته" value="158" change="هذا الشهر" icon="✅" color="bg-green-500" />
        <StatCard title="شكاوى نشطة" value="5" change="2 عاجلة" icon="⚠️" color="bg-red-500" />
        <StatCard title="تقييم الجودة" value="92%" change="ممتاز" icon="⭐" color="bg-blue-500" />
      </div>

      {/* بطاقات التنقل السريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLinkCard 
          title="الإشعارات" 
          icon="🔔" 
          href="/platform/dashboard/supervisor/notifications"
          description="عرض آخر التحديثات"
        />
        <QuickLinkCard 
          title="الرسائل" 
          icon="💬" 
          href="/platform/dashboard/supervisor/messages"
          description="التواصل مع المستخدمين"
        />
        <QuickLinkCard 
          title="الإعدادات" 
          icon="⚙️" 
          href="/platform/dashboard/supervisor/settings"
          description="إدارة إعدادات الحساب"
        />
        <QuickLinkCard 
          title="الملف الشخصي" 
          icon="👤" 
          href="/platform/profile"
          description="عرض وتحرير الملف"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">محتوى ينتظر المراجعة</h3>
          <div className="space-y-3">
            <ReviewItem title="درس الذكاء الاصطناعي" author="د. سمير" type="فيديو" priority="عالية" onReview={handleReview} />
            <ReviewItem title="ملف الرياضيات" author="د. أحمد" type="PDF" priority="متوسطة" onReview={handleReview} />
            <ReviewItem title="اختبار الفيزياء" author="د. سارة" type="اختبار" priority="عالية" onReview={handleReview} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">الشكاوى الأخيرة</h3>
          <div className="space-y-3">
            <ComplaintItem title="محتوى غير واضح" from="طالب" status="جديد" onClick={handleComplaint} />
            <ComplaintItem title="مشكلة في الفيديو" from="طالب" status="قيد المعالجة" onClick={handleComplaint} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function QuickLinkCard({ title, icon, href, description }: any) {
  const router = useRouter()
  
  return (
    <div 
      onClick={() => router.push(href)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-primary"
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <span className="text-primary">←</span>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-green-600 text-sm mt-1">{change}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function PendingItem({ name, type, status, onApprove, onReject }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{type}</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onApprove(name)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
        >
          موافقة
        </button>
        <button 
          onClick={() => onReject(name)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
        >
          رفض
        </button>
      </div>
    </div>
  )
}

function ActivityItem({ text, time }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
      <div>
        <p className="text-sm">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

function CourseItem({ title, students, rating }: any) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{students} طالب</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  )
}

function MessageItem({ from, message, time, onReply }: any) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-sm">{from}</p>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <button
          onClick={() => onReply?.(from)}
          className="text-xs text-primary hover:text-primary-dark font-semibold"
        >
          رد
        </button>
      </div>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  )
}

function StudentCourse({ title, teacher, progress, onClick }: any) {
  return (
    <div 
      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      onClick={() => onClick?.(title)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{teacher}</p>
        </div>
        <span className="text-sm font-semibold text-primary">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

function AssignmentItem({ title, due, status }: any) {
  const colors = {
    urgent: 'bg-red-100 text-red-700',
    soon: 'bg-yellow-100 text-yellow-700',
    normal: 'bg-green-100 text-green-700'
  }
  return (
    <div className={`p-3 rounded-lg ${colors[status as keyof typeof colors]}`}>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm">الموعد: {due}</p>
    </div>
  )
}

function ReviewItem({ title, author, type, priority, onReview }: any) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{author} • {type}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${priority === 'عالية' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {priority}
        </span>
      </div>
      <div className="flex gap-2 mt-2">
        <button 
          onClick={() => onReview(title, true)}
          className="flex-1 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
        >
          موافقة
        </button>
        <button 
          onClick={() => onReview(title, false)}
          className="flex-1 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
        >
          رفض
        </button>
      </div>
    </div>
  )
}

function ComplaintItem({ title, from, status, onClick }: any) {
  return (
    <div 
      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      onClick={() => onClick?.(title)}
    >
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-gray-600">من: {from}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-primary">{status}</p>
        <button className="text-xs text-primary hover:text-primary-dark font-semibold">
          معالجة
        </button>
      </div>
    </div>
  )
}

function getRoleTitle(role: string) {
  const titles: Record<string, string> = {
    admin: 'لوحة تحكم المدير العام',
    teacher: 'لوحة تحكم الأستاذ',
    student: 'لوحة تحكم الطالب',
    supervisor: 'لوحة تحكم المراقب'
  }
  return titles[role] || ''
}