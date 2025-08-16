# 🎵 Skin Tattoo Audio App 🎨

Dövme üzerinde ses entegrasyonu ve AR (Artırılmış Gerçeklik) deneyimi sunan modern web uygulaması.

## 🌟 Özellikler

### 1. Ses Analizi ve Görselleştirme
- **Kalp Ritmi Görselleştirmesi**: Ses dosyasından kalp ritmi şeklinde ses dalgası oluşturur
- **Profesyonel Görsel**: 800x400 piksel yüksek kaliteli PNG formatında
- **Çoklu Ses Formatı**: MP3, WAV, OGG, AAC destekler

### 2. Dövme Entegrasyonu
- **Fotoğraf Yükleme**: Çizilen dövme fotoğrafını yükleyin
- **Otomatik Entegrasyon**: Ses ve dövme dosyalarını otomatik entegre eder
- **Güvenli Depolama**: Tüm dosyalar güvenli şekilde saklanır

### 3. AR (Artırılmış Gerçeklik) Deneyimi
- **Kamera Entegrasyonu**: Telefon kamerası ile dövme üzerine odaklanın
- **Işık Efekti**: Dövme çizgileri üzerinde hareket eden ışık efekti
- **Ses Senkronizasyonu**: Işık efekti sesle birlikte hareket eder
- **Gerçek Zamanlı**: Socket.IO ile anlık iletişim

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adım 1: Projeyi İndirin
```bash
git clone <repository-url>
cd skin-tattoo-audio-app
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Uygulamayı Başlatın
```bash
# Geliştirme modu
npm run dev

# Üretim modu
npm start
```

### Adım 4: Tarayıcıda Açın
```
http://localhost:3000
```

## 📱 Kullanım

### Adım 1: Ses Dosyası Yükleme
1. "Ses Dosyası Seç" butonuna tıklayın
2. MP3, WAV, OGG veya AAC formatında ses dosyası seçin
3. "Sesi Yükle ve Görselleştir" butonuna tıklayın
4. Kalp ritmi görselleştirmesi otomatik oluşturulacak

### Adım 2: Görseli İndirin
1. Oluşturulan kalp ritmi görselini indirin
2. Bu görseli müşteriye gönderin
3. Müşteri dövme olarak çizdikten sonra fotoğrafını çeksin

### Adım 3: Dövme Fotoğrafı Yükleme
1. Çizilen dövmenin fotoğrafını yükleyin
2. "Dövme Fotoğrafını Yükle" butonuna tıklayın

### Adım 4: Entegrasyon
1. "Ses ve Dövme Entegrasyonunu Başlat" butonuna tıklayın
2. Sistem otomatik olarak ses ve dövme dosyalarını entegre eder

### Adım 5: AR Deneyimi
1. "AR Deneyimini Başlat" butonuna tıklayın
2. Telefonunuzu dövme üzerine tutun
3. Kamera dövme üzerine odaklandığında:
   - ✨ Işık efekti başlar
   - 🎵 Ses çalmaya başlar
   - 💫 Işık, sesle birlikte dövme çizgileri üzerinden ilerler

## 🛠️ Teknik Detaylar

### Backend Teknolojileri
- **Express.js**: Web sunucusu
- **Socket.IO**: Gerçek zamanlı iletişim
- **Multer**: Dosya yükleme işlemleri
- **Canvas**: Görsel oluşturma
- **Jimp**: Resim işleme

### Frontend Teknolojileri
- **Vanilla JavaScript**: Modern ES6+ syntax
- **CSS3**: Gradient, animasyonlar, responsive tasarım
- **HTML5**: Semantic markup, drag & drop

### Dosya Yapısı
```
skin-tattoo-audio-app/
├── server.js              # Ana sunucu dosyası
├── package.json           # Proje bağımlılıkları
├── public/                # Frontend dosyaları
│   ├── index.html        # Ana HTML sayfası
│   ├── style.css         # CSS stilleri
│   └── script.js         # JavaScript işlevleri
├── uploads/               # Yüklenen dosyalar (otomatik oluşur)
└── README.md              # Bu dosya
```

## 🔧 API Endpoints

### POST /upload-audio
Ses dosyası yükleme ve kalp ritmi görselleştirme
```json
{
  "success": true,
  "audioFile": "audio-123456789.mp3",
  "visualization": "visualization-audio-123456789.png",
  "message": "Ses dosyası başarıyla yüklendi ve görselleştirildi!"
}
```

### POST /upload-tattoo
Dövme fotoğrafı yükleme
```json
{
  "success": true,
  "tattooFile": "tattoo-123456789.jpg",
  "message": "Dövme fotoğrafı başarıyla yüklendi!"
}
```

### POST /integrate
Ses ve dövme entegrasyonu
```json
{
  "success": true,
  "integrationData": {
    "audioPath": "uploads/audio-123456789.mp3",
    "tattooPath": "uploads/tattoo-123456789.jpg",
    "audioSize": 1024000,
    "timestamp": "2024-01-01T12:00:00.000Z",
    "integrationId": "1704110400000"
  },
  "message": "Ses ve dövme başarıyla entegre edildi!"
}
```

## 🎨 Görselleştirme Algoritması

### Kalp Ritmi Dalga Formu
```javascript
// Kalp ritmi simülasyonu
for (let x = 0; x < 800; x += 2) {
    const time = x / 800 * 4 * Math.PI; // 4 kalp atışı
    const heartbeat = Math.sin(time) * 0.5 + 
                     Math.sin(3 * time) * 0.3 + 
                     Math.sin(5 * time) * 0.1;
    
    const y = 200 + heartbeat * 150;
    // Çizim işlemleri...
}
```

### Özellikler
- **4 Kalp Atışı**: 800 piksel genişliğinde 4 tam kalp atışı
- **Harmonik Bileşenler**: Temel frekans + 3. ve 5. harmonikler
- **Görsel Kalite**: 3 piksel kalınlığında, #ff0066 renk kodu
- **Kalp Simgesi**: Görselin üst kısmında kalp emoji

## 🔒 Güvenlik

### Dosya Doğrulama
- **Ses Dosyaları**: Sadece audio/* MIME type kabul edilir
- **Resim Dosyaları**: Sadece image/* MIME type kabul edilir
- **Dosya Boyutu**: Sunucu tarafında kontrol edilir

### Güvenli Depolama
- **Benzersiz İsimlendirme**: Timestamp + random number
- **Upload Klasörü**: Sadece gerekli dosyalar erişilebilir
- **MIME Type Kontrolü**: Dosya içeriği doğrulanır

## 📱 Mobil Uyumluluk

### Responsive Tasarım
- **Mobile First**: Mobil cihazlar için optimize edilmiş
- **Touch Friendly**: Dokunmatik ekranlar için büyük butonlar
- **Responsive Grid**: Tüm ekran boyutlarında uyumlu

### AR Deneyimi
- **Kamera Erişimi**: Mobil cihazlarda kamera API'si
- **Touch Controls**: Dokunmatik AR kontrolleri
- **Performance**: Mobil cihazlarda optimize edilmiş performans

## 🚨 Hata Yönetimi

### Kullanıcı Dostu Hata Mesajları
- **Dosya Formatı**: Yanlış dosya formatı seçildiğinde
- **Yükleme Hataları**: Sunucu hatalarında
- **Entegrasyon Hataları**: Dosya bulunamadığında

### Logging ve Monitoring
- **Console Logs**: Geliştirici için detaylı loglar
- **Error Tracking**: Hata durumlarının takibi
- **Performance Monitoring**: Yükleme sürelerinin ölçümü

## 🔮 Gelecek Özellikler

### Planlanan Geliştirmeler
- **Gerçek Ses Analizi**: FFT tabanlı gerçek ses analizi
- **3D Görselleştirme**: Üç boyutlu ses dalgası
- **AI Destekli**: Yapay zeka ile ses analizi
- **Cloud Storage**: Bulut tabanlı dosya depolama
- **Mobile App**: Native mobil uygulama

### Teknik İyileştirmeler
- **WebRTC**: Gerçek zamanlı kamera erişimi
- **WebGL**: Gelişmiş grafik işleme
- **Service Workers**: Offline çalışma desteği
- **PWA**: Progressive Web App özellikleri

## 🤝 Katkıda Bulunma

### Geliştirme Süreci
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları
- **ESLint**: JavaScript kod kalitesi
- **Prettier**: Kod formatı
- **JSDoc**: Fonksiyon dokümantasyonu
- **Testing**: Unit testler

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

### Destek ve Sorular
- **GitHub Issues**: Teknik sorunlar için
- **Email**: [your-email@example.com]
- **Discord**: [Discord Server Link]

### Sosyal Medya
- **Twitter**: [@yourusername]
- **LinkedIn**: [Your Name]
- **Portfolio**: [your-website.com]

## 🙏 Teşekkürler

Bu projeyi mümkün kılan tüm açık kaynak topluluğuna teşekkürler:

- **Express.js** ekibi
- **Socket.IO** geliştiricileri
- **Canvas API** standartları
- **Web Audio API** ekibi

---

**Not**: Bu uygulama eğitim ve demo amaçlıdır. Üretim ortamında kullanmadan önce güvenlik testlerinden geçirin.
