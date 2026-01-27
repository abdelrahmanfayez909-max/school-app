# إرشادات النشر - School Management System

## الخطوة 1: إنشء حساب GitHub

1. اذهب إلى [github.com](https://github.com)
2. اضغط **Sign up**
3. أدخل:
   - البريد الإلكتروني
   - كلمة المرور
   - اسم المستخدم
4. أكمل التحقق

---

## الخطوة 2: رفع المشروع على GitHub

افتح PowerShell في مجلد المشروع وشغل:

```bash
cd f:\school
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
git init
git add .
git commit -m "Initial commit: School Management System"
git branch -M main
```

ثم على GitHub:
1. اضغط **New Repository**
2. اسم المشروع: `school-app`
3. اختر **Public**
4. اضغط **Create Repository**
5. انسخ الأوامر واشغلها:

```bash
git remote add origin https://github.com/YOUR_USERNAME/school-app.git
git push -u origin main
```

---

## الخطوة 3: إنشاء حساب Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **Sign Up**
3. اختار **Continue with GitHub**
4. اضغط **Authorize Vercel by Vercel**

---

## الخطوة 4: نشر المشروع

1. في Vercel، اضغط **Add New...** → **Project**
2. اختار المشروع `school-app` من GitHub
3. اضغط **Import**

### إضافة المتغيرات:
1. اذهب إلى **Environment Variables**
2. أضف هذه المتغيرات (من `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=https://fkhsvjsnimcxccxidwyk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. اضغط **Deploy**

---

## الخطوة 5: أنت جاهز! 🎉

بعد دقيقتين:
- ستأخذ لينك مثل: `https://school-app-XXX.vercel.app`
- اللينك يعمل من أي جهاز
- الموقع يحديث نفسه تلقائياً كل ما تدفع على GitHub

---

## ملاحظات مهمة:

- **الـ .env.local** لن يُرفع على GitHub (محمي بـ `.gitignore`)
- **Vercel تعيين المتغيرات تلقائياً** من الإعدادات
- **كل تحديث على GitHub** ينشر تلقائياً على Vercel

---

## مشاكل شائعة:

### "NEXT_PUBLIC_SUPABASE_URL is required"
تأكد أنك أضفت المتغيرات في Vercel → Settings → Environment Variables

### "Build failed"
شغل `npm run build` محلياً أولاً:
```bash
npm run build
```

إذا اشتغل محلياً = المشكلة في Vercel ✓

---

**محتاج مساعدة؟** قول لي في أي خطوة عالقت 💪
