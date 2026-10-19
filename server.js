const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: خواندن داده‌های JSON و رفع خطای امنیتی CORS
app.use(cors());
app.use(express.json());

// دیتابیس ساده در حافظه (Memory Storage) برای ذخیره نظرات
let feedbacks = [
  { id: 1, name: "علی", rating: 5, comment: "بهترین برگر تهران!" },
  { id: 2, name: "سارا", rating: 4, comment: "سیب‌زمینی‌ها عالی بودن ولی سس کم بود." }
];

// مسیر تست سرور (Root)
app.get('/', (req, res) => {
  res.send('🍔 سرور برگرلند روشن و آماده است!');
});

// مسیر ۱: دریافت لیست تمام نظرات (GET /api/feedbacks)
app.get('/api/feedbacks', (req, res) => {
  res.status(200).json(feedbacks);
});

// مسیر ۲: ثبت یک نظر جدید (POST /api/feedbacks)
app.post('/api/feedbacks', (req, res) => {
  const { name, rating, comment } = req.body;

  // اعتبارسنجی ورودی‌ها (Validation)
  if (!name || !rating || !comment) {
    return res.status(400).json({ error: 'لطفاً نام، امتیاز و متن نظر را کامل وارد کنید.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'امتیاز باید عددی بین ۱ تا ۵ باشد.' });
  }

  // ساخت نظر جدید و افزودن به لیست
  const newFeedback = {
    id: feedbacks.length + 1,
    name,
    rating: Number(rating),
    comment
  };

  feedbacks.push(newFeedback);

  // پاسخ موفقیت به همراه داده جدید
  res.status(201).json({
    message: 'نظر شما با موفقیت ثبت شد!',
    data: newFeedback
  });
});

// روشن کردن سرور
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
