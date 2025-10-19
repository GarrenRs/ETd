
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SupervisorMessagesPage() {
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
    if (parsedUser.role !== 'supervisor') {
      router.push('/platform')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  if (!user) return null

  const conversations = [
    { id: 1, name: 'د. أحمد محمد', role: 'أستاذ', lastMessage: 'شكراً على الملاحظات', time: 'منذ 10 دقائق', unread: 1 },
    { id: 2, name: 'المدير العام', role: 'إدارة', lastMessage: 'تقرير الأسبوع جاهز', time: 'منذ ساعة', unread: 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/platform/dashboard/supervisor" className="text-primary hover:text-primary-dark">
              <span className="text-2xl">←</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">الرسائل</h1>
              <p className="text-sm text-gray-500">تواصل مع الأساتذة والإدارة</p>
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
