// آدرس پایه سرور بک‌اند ما
const API_URL = '/api/feedbacks';

// ۱. تابع برای گرفتن نظرات از سرور و نمایش در صفحه
async function fetchFeedbacks() {
    const container = document.getElementById('feedbacksContainer');
    try {
        const response = await fetch(API_URL);
        const feedbacks = await response.json();

        // پاک کردن محتوای قبلی
        container.innerHTML = '';

        if (feedbacks.length === 0) {
            container.innerHTML = '<p>هنوز نظری ثبت نشده است.</p>';
            return;
        }

        // ساخت کارت برای هر نظر و اضافه کردن به صفحه
        feedbacks.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            card.innerHTML = `
                <strong>${item.name}</strong> (امتیاز: ${item.rating} ⭐)
                <p>${item.message}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('خطا در دریافت نظرات:', error);
        container.innerHTML = '<p style="color: red;">خطا در ارتباط با سرور!</p>';
    }
}

// ۲. مدیریت ارسال فرم توسط کاربر
const form = document.getElementById('feedbackForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه

    const name = document.getElementById('name').value;
    const rating = Number(document.getElementById('rating').value);
    const message = document.getElementById('message').value;
    const responseMsg = document.getElementById('responseMsg');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, rating, message })
        });

        const result = await response.json();

        if (response.ok) {
            responseMsg.style.color = 'green';
            responseMsg.textContent = result.message;
            form.reset(); // پاک کردن فرم
            fetchFeedbacks(); // به‌روزرسانی لیست نظرات بلافاصله
        } else {
            responseMsg.style.color = 'red';
            responseMsg.textContent = result.error || 'خطایی رخ داد.';
        }
    } catch (error) {
        console.error('خطا در ارسال:', error);
        responseMsg.style.color = 'red';
        responseMsg.textContent = 'امکان اتصال به سرور وجود ندارد.';
    }
});

// اجرای تابع دریافت نظرات به محض باز شدن صفحه
fetchFeedbacks();
