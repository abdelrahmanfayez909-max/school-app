# ✅ حل مشكلة المتغيرات في Vercel

## المشكلة:
```
Environment Variable "NEXT_PUBLIC_SUPABASE_URL" references Secret "next_public_supabase_url", which does not exist.
```

## 🎯 الحل:

### الخطوة 1️⃣: في Vercel Dashboard
1. اذهب إلى مشروعك
2. اضغط **Settings**
3. اختار **Environment Variables**

### الخطوة 2️⃣: أضف المتغيرات يدويًا

**أضف هذا:**

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fkhsvjsnimcxccxidwyk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### الخطوة 3️⃣: اضغط **Save**

### الخطوة 4️⃣: Re-deploy
1. اذهب إلى **Deployments**
2. اختار آخر deployment
3. اضغط **Redeploy**

---

## ✅ يجب أن يعمل الآن!

---

## 💡 نصيحة:
**Netlify أسهل بكثير!** لأنك تضيف المتغيرات من البداية أثناء الرفع.

تبغا تستخدم Netlify بدل Vercel؟ 🤔
