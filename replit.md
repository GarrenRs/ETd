# منصة التعليم الجزائرية 🎓

## نظرة عامة
منصة تعليمية جزائرية متكاملة تربط الأساتذة بالطلاب مع دعم كامل للغة العربية ونظام اشتراكات محلي.

## الحالة الحالية ✅
**تاريخ آخر تحديث:** 18 أكتوبر 2025

### ما تم إنجازه
- ✅ بناء Frontend مع Next.js 14 + TypeScript + Tailwind CSS
- ✅ صفحة تسجيل دخول متجاوبة باللغة العربية مع RTL support
- ✅ لوحات تحكم للأدوار الأربعة (Admin, Teacher, Student, Supervisor)
- ✅ نظام مصادقة بسيط (localStorage/sessionStorage)
- ✅ تصميم احترافي مع gradient backgrounds وألوان جزائرية
- ✅ Workflow configuration للتشغيل على port 5000

### قيد العمل 🚧
- 🔄 إعداد قاعدة بيانات PostgreSQL مع Prisma ORM
- 🔄 بناء Backend API مع NestJS
- 🔄 نظام المصادقة الكامل (JWT)
- 🔄 نظام الدفع المحلي (RIP/CCP)

## البنية التقنية 🏗️

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (planned)
- **HTTP Client:** Axios (planned)
- **Port:** 5000

### Backend (Planned)
- **Framework:** NestJS
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** JWT
- **Port:** 3000

## الأدوار والصلاحيات 👥

### 1. المدير العام (Admin)
- إدارة المستخدمين والموافقة على التسجيلات
- مراقبة الإيرادات والإحصائيات
- إدارة الاشتراكات والمدفوعات
- الوصول الكامل للنظام

### 2. الأستاذ (Teacher)
- إنشاء وإدارة الدروس والمحتوى
- متابعة الطلاب المسجلين
- استلام المدفوعات
- التواصل مع الطلاب

### 3. الطالب (Student)
- التسجيل في الدروس
- متابعة التقدم الدراسي
- حل الواجبات والاختبارات
- الدفع والاشتراك

### 4. المراقب (Supervisor)
- مراجعة المحتوى التعليمي
- معالجة الشكاوى
- ضمان جودة المحتوى
- متابعة النشاطات

## الحسابات التجريبية 🔐

```
المدير العام:
البريد: admin@edu.dz
كلمة المرور: admin123

الأستاذ:
البريد: teacher@edu.dz
كلمة المرور: teacher123

الطالب:
البريد: student@edu.dz
كلمة المرور: student123

المراقب:
البريد: supervisor@edu.dz
كلمة المرور: supervisor123
```

## البنية الملفات 📁

```
/
├── frontend/                 # تطبيق Next.js
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── page.tsx     # صفحة تسجيل الدخول
│   │   │   ├── layout.tsx   # Root layout
│   │   │   ├── globals.css  # Global styles
│   │   │   └── dashboard/
│   │   │       └── [role]/
│   │   │           └── page.tsx  # لوحات التحكم
│   │   └── components/      # المكونات (planned)
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
├── backend/                 # NestJS API (planned)
└── replit.md               # هذا الملف
```

## التشغيل 🚀

المشروع يعمل تلقائياً على port 5000 عند بدء التشغيل.

### أوامر مفيدة:
```bash
cd frontend && npm run dev     # تشغيل Frontend في وضع التطوير
cd frontend && npm run build   # بناء Frontend للإنتاج
cd frontend && npm start       # تشغيل Frontend المبني
```

## المميزات المستقبلية 🔮

### المرحلة التالية
- [ ] إعداد PostgreSQL database مع Prisma
- [ ] بناء Backend API مع NestJS
- [ ] نظام المصادقة الكامل (JWT + Refresh Tokens)
- [ ] نظام الأدوار والصلاحيات (RBAC)

### الميزات المخططة
- [ ] نظام الدفع المحلي (Baridi Mob, CCP, RIP)
- [ ] نظام الاشتراكات والباقات
- [ ] رفع وإدارة الملفات (Videos, PDFs, Images)
- [ ] نظام الإشعارات Real-time
- [ ] نظام التقييمات والمراجعات
- [ ] نظام الرسائل والدردشة
- [ ] تقارير وإحصائيات متقدمة
- [ ] تطبيق الجوال (React Native)

## تفضيلات المطور 💡

### الأسلوب البرمجي
- استخدام TypeScript بشكل صارم
- اتباع معايير Airbnb Style Guide
- كتابة كود نظيف وقابل للصيانة
- استخدام Functional Components فقط

### سير العمل
- تطوير تدريجي (Incremental Development)
- اختبار كل ميزة قبل الانتقال للتالية
- توثيق التغييرات الرئيسية

### الأولويات
1. وظائف أساسية تعمل بشكل كامل أولاً
2. تجربة مستخدم سلسة
3. دعم كامل للغة العربية وRTL
4. أداء عالي وسرعة تحميل

## ملاحظات مهمة ⚠️

- المشروع يستخدم بيانات تجريبية حالياً (hardcoded users)
- نظام المصادقة الحالي بسيط ويجب استبداله بنظام JWT
- قاعدة البيانات لم يتم إعدادها بعد
- نظام الدفع يتطلب تكامل مع Baridi Mob/CCP

## الدعم والمساعدة 🆘

في حال واجهت أي مشكلة:
1. تحقق من console logs
2. تأكد من تشغيل workflow بشكل صحيح
3. راجع هذا الملف للحسابات التجريبية

## التواصل 📧

للاستفسارات والدعم الفني، يرجى التواصل مع فريق التطوير.

---

**آخر تحديث:** 18 أكتوبر 2025
**الإصدار:** 0.1.0 (MVP)
**الحالة:** قيد التطوير النشط
