
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminMessagesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedChat, setSelectedChat] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/platform')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  const conversations = [
    { id: 1, name: 'أحمد محمد', role: 'أستاذ', lastMessage: 'شكراً على الموافقة', time: 'منذ 5 دقائق', unread: 2 },
    { id: 2, name: 'سارة علي', role: 'طالبة', lastMessage: 'لدي سؤال بخصوص الاشتراك', time: 'منذ 30 دقيقة', unread: 0 },
    { id: 3, name: 'محمد خالد', role: 'مراقب', lastMessage: 'تم مراجعة المحتوى', time: 'منذ ساعة', unread: 1 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/admin" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الرسائل</h1>
              <p className="text-sm text-gray-500">تواصل مع الأساتذة والطلاب</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg">المحادثات</h2>
            </div>
            <div className="divide-y">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                    selectedChat?.id === conv.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                      <p className="text-sm text-gray-600">{conv.role}</p>
                      <p className="text-sm text-gray-500 mt-1">{conv.lastMessage}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">{conv.time}</p>
                      {conv.unread > 0 && (
                        <span className="inline-block mt-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            {selectedChat ? (
              <div className="flex flex-col h-[600px]">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-lg">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-600">{selectedChat.role}</p>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">{selectedChat.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">{selectedChat.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="اكتب رسالتك..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                      إرسال
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px]">
                <p className="text-gray-500">اختر محادثة لبدء المراسلة</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState([
    { id: 1, from: 'أحمد محمد', role: 'أستاذ', message: 'لدي استفسار حول الموافقة على الدورة', time: 'منذ 5 دقائق', unread: true },
    { id: 2, from: 'سارة علي', role: 'طالبة', message: 'شكراً على المساعدة', time: 'منذ ساعة', unread: false },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/admin" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">الرسائل</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">صندوق الوارد</h2>
          
          <div className="space-y-3">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition hover:shadow-md ${
                  msg.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{msg.from}</h3>
                    <p className="text-sm text-gray-600">{msg.role}</p>
                  </div>
                  {msg.unread && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">جديد</span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{msg.message}</p>
                <p className="text-sm text-gray-500">{msg.time}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
