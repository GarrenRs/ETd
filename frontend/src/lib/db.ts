
// نظام قاعدة بيانات محلي بسيط باستخدام localStorage
export interface User {
  id: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'supervisor' | 'admin'
  name: string
  phone?: string
  wilaya?: string
  bio?: string
  specialization?: string
  studentLevel?: string
  dateOfBirth?: string
  teachingExperience?: string
  qualifications?: string
  supervisorExperience?: string
  previousWork?: string
  status: 'active' | 'pending' | 'rejected'
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'responded'
  createdAt: string
  response?: string
}

class Database {
  private getUsers(): User[] {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : this.getDefaultUsers()
  }

  private getDefaultUsers(): User[] {
    const defaultUsers: User[] = [
      {
        id: '1',
        email: 'admin@edu.dz',
        password: 'admin123',
        role: 'admin',
        name: 'المدير العام',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'teacher@edu.dz',
        password: 'teacher123',
        role: 'teacher',
        name: 'د. أحمد محمد',
        specialization: 'الرياضيات',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'student@edu.dz',
        password: 'student123',
        role: 'student',
        name: 'سارة علي',
        studentLevel: 'السنة الأولى ثانوي',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        email: 'supervisor@edu.dz',
        password: 'supervisor123',
        role: 'supervisor',
        name: 'محمد خالد',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ]
    this.saveUsers(defaultUsers)
    return defaultUsers
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users))
  }

  private getMessages(): ContactMessage[] {
    const messages = localStorage.getItem('contact_messages')
    return messages ? JSON.parse(messages) : []
  }

  private saveMessages(messages: ContactMessage[]): void {
    localStorage.setItem('contact_messages', JSON.stringify(messages))
  }

  // User operations
  createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers()
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    this.saveUsers(users)
    return newUser
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers()
    return users.find(u => u.email === email) || null
  }

  getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find(u => u.id === id) || null
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return null
    
    users[index] = { ...users[index], ...updates }
    this.saveUsers(users)
    return users[index]
  }

  getAllUsers(): User[] {
    return this.getUsers()
  }

  // Contact messages operations
  createContactMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const messages = this.getMessages()
    const newMessage: ContactMessage = {
      ...messageData,
      id: Date.now().toString(),
      status: 'new',
      createdAt: new Date().toISOString()
    }
    messages.push(newMessage)
    this.saveMessages(messages)
    
    // إرسال حدث مخصص للإشعارات الفورية
    window.dispatchEvent(new CustomEvent('newContactMessage', { detail: newMessage }))
    
    return newMessage
  }

  getContactMessages(): ContactMessage[] {
    return this.getMessages()
  }

  updateContactMessage(id: string, updates: Partial<ContactMessage>): ContactMessage | null {
    const messages = this.getMessages()
    const index = messages.findIndex(m => m.id === id)
    if (index === -1) return null
    
    messages[index] = { ...messages[index], ...updates }
    this.saveMessages(messages)
    return messages[index]
  }

  getUnreadMessagesCount(): number {
    const messages = this.getMessages()
    return messages.filter(m => m.status === 'new').length
  }
}

export const db = new Database()
