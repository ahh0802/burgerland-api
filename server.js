const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// این دو خط حیاتی هستند:
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// آرایه ذخیره نظرات در حافظه سرور
let feedbacks = [
  { id: 1, name: "علی", rating: 5, message: "بهترین برگر شهر!" }
];

// مسیر تست سلامت
app.get('/', (req, res) => {
  res.send('🍔 سرور برگرلند روشن و آماده است!');
});

// دریافت همه نظرات
app.get('/api/feedbacks', (req, res) => {
  res.status(200).json(feedbacks);
});

// ثبت نظر جدید
app.post('/api/feedbacks', (req, res) => {
  const { name, rating, message } = req.body;

  if (!name || !rating || !message) {
    return res.status(400).json({ error: "لطفاً نام، امتیاز و متن نظر را کامل وارد کنید." });
  }

  const newFeedback = {
    id: Date.now(),
    name,
    rating: Number(rating),
    message
  };

  feedbacks.push(newFeedback);
  res.status(201).json({ message: "نظر شما با موفقیت ثبت شد!", data: newFeedback });
});

app.listen(PORT, () => {
  console.log(`Burgerland server is running on port ${PORT}`);
});
