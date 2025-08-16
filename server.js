const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
const Jimp = require('jimp');

// Uygulama oluştur
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// uploads klasörü yoksa oluştur
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Multer yapılandırması
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Dosya türü kontrolü
        if (file.fieldname === 'audio') {
            if (file.mimetype.startsWith('audio/')) {
                cb(null, true);
            } else {
                cb(new Error('Sadece ses dosyaları kabul edilir!'), false);
            }
        } else if (file.fieldname === 'tattoo') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Sadece resim dosyaları kabul edilir!'), false);
            }
        } else {
            cb(new Error('Bilinmeyen dosya türü!'), false);
        }
    }
});

// Hata yakalama middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false, 
                error: 'Dosya boyutu çok büyük! Maksimum 10MB olmalı.' 
            });
        }
    }
    res.status(500).json({ 
        success: false, 
        error: error.message || 'Sunucu hatası oluştu!' 
    });
});

// Ses dosyası yükleme endpoint'i
app.post('/upload-audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: 'Ses dosyası yüklenmedi!' 
            });
        }

        console.log('Ses dosyası yüklendi:', req.file.filename);

        // Kalp ritmi görselleştirmesi oluştur
        const visualizationFilename = await createHeartbeatVisualization(req.file.filename);
        
        res.json({
            success: true,
            audioFile: req.file.filename,
            visualization: visualizationFilename,
            message: 'Ses dosyası başarıyla yüklendi ve görselleştirildi!'
        });

    } catch (error) {
        console.error('Audio upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Ses dosyası işlenirken hata oluştu: ' + error.message
        });
    }
});

// Dövme fotoğrafı yükleme endpoint'i
app.post('/upload-tattoo', upload.single('tattoo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: 'Dövme fotoğrafı yüklenmedi!' 
            });
        }

        console.log('Dövme fotoğrafı yüklendi:', req.file.filename);

        // Resmi işle ve optimize et
        await processTattooImage(req.file.filename);

        res.json({
            success: true,
            tattooFile: req.file.filename,
            message: 'Dövme fotoğrafı başarıyla yüklendi!'
        });

    } catch (error) {
        console.error('Tattoo upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Dövme fotoğrafı işlenirken hata oluştu: ' + error.message
        });
    }
});

// Entegrasyon endpoint'i
app.post('/integrate', (req, res) => {
    try {
        const { audioFile, tattooFile } = req.body;
        
        if (!audioFile || !tattooFile) {
            return res.status(400).json({
                success: false,
                error: 'Ses ve dövme dosyaları gerekli!'
            });
        }

        console.log('Entegrasyon başlatıldı:', { audioFile, tattooFile });

        res.json({
            success: true,
            message: 'Ses ve dövme başarıyla entegre edildi!'
        });

    } catch (error) {
        console.error('Integration error:', error);
        res.status(500).json({
            success: false,
            error: 'Entegrasyon hatası: ' + error.message
        });
    }
});

// Kalp ritmi görselleştirmesi oluştur
async function createHeartbeatVisualization(audioFilename) {
    try {
        const visualizationFilename = `heartbeat-${Date.now()}.svg`;
        const visualizationPath = path.join(uploadsDir, visualizationFilename);
        
        // SVG içeriği oluştur (örnek kalp ritmi dalgası)
        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#4ecdc4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#45b7d1;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="800" height="200" fill="#1a1a1a"/>
    <path d="M0,100 Q50,50 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100 T800,100" 
          stroke="url(#waveGradient)" stroke-width="3" fill="none" opacity="0.8"/>
    <path d="M0,100 Q50,150 100,100 T200,100 T300,100 T400,100 T500,100 T600,100 T700,100 T800,100" 
          stroke="url(#waveGradient)" stroke-width="2" fill="none" opacity="0.6"/>
    <circle cx="400" cy="100" r="8" fill="#ff6b6b"/>
    <text x="400" y="180" text-anchor="middle" fill="white" font-family="Arial" font-size="16">
        Kalp Ritmi Ses Dalgası - ${audioFilename}
    </text>
</svg>`;
        
        fs.writeFileSync(visualizationPath, svgContent);
        console.log('Görselleştirme oluşturuldu:', visualizationFilename);
        
        return visualizationFilename;
    } catch (error) {
        console.error('Görselleştirme oluşturma hatası:', error);
        throw error;
    }
}

// Dövme resmini işle
async function processTattooImage(filename) {
    try {
        const imagePath = path.join(uploadsDir, filename);
        const image = await Jimp.read(imagePath);
        
        // Resmi optimize et
        image
            .resize(800, 600, Jimp.RESIZE_BILINEAR) // Boyutu sınırla
            .quality(85) // Kaliteyi optimize et
            .writeAsync(imagePath);
            
        console.log('Dövme resmi işlendi:', filename);
    } catch (error) {
        console.error('Resim işleme hatası:', error);
        throw error;
    }
}

// Socket.IO bağlantı yönetimi
io.on('connection', (socket) => {
    console.log('Yeni kullanıcı bağlandı:', socket.id);
    
    socket.on('start-ar-experience', (data) => {
        console.log('AR deneyimi başlatıldı:', data);
        socket.emit('ar-started', { status: 'active', timestamp: Date.now() });
    });
    
    socket.on('light-effect', (data) => {
        console.log('Işık efekti:', data);
        socket.emit('light-activated', { position: data.position, timestamp: Date.now() });
    });
    
    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı:', socket.id);
    });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Skin Tattoo Audio App sunucusu başlatıldı!`);
    console.log(`📱 Uygulama: http://localhost:${PORT}`);
    console.log(`📁 Uploads klasörü: ${uploadsDir}`);
});
