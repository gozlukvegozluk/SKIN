// WaveSurfer instance'ını oluştur
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#4F8A8B',
    progressColor: '#FBD46D',
    cursorColor: '#ffffff',
    barWidth: 2,
    barGap: 1,
    barRadius: 3,
    height: 200,
    responsive: true,
    normalize: true,
    backend: 'WebAudio'
});

// DOM elementlerini seç
const audioUpload = document.getElementById('audio-upload');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const downloadBtn = document.getElementById('download-btn');

// Ses dosyası yükleme olayı
audioUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Dosya türünü kontrol et
        if (!file.type.startsWith('audio/')) {
            alert('Lütfen geçerli bir ses dosyası seçin!');
            return;
        }
        
        // Yükleme başladığında butonları devre dışı bırak
        setButtonsState(false);
        
        const url = URL.createObjectURL(file);
        
        // WaveSurfer'a ses dosyasını yükle
        wavesurfer.load(url);
        
        console.log('Ses dosyası yüklendi:', file.name);
    }
});

// WaveSurfer olayları
wavesurfer.on('ready', function() {
    console.log('WaveSurfer hazır!');
    setButtonsState(true);
    playBtn.disabled = false;
});

wavesurfer.on('error', function(err) {
    console.error('WaveSurfer hatası:', err);
    alert('Ses dosyası yüklenirken bir hata oluştu. Lütfen farklı bir dosya deneyin.');
    setButtonsState(false);
});

wavesurfer.on('play', function() {
    playBtn.disabled = true;
    pauseBtn.disabled = false;
});

wavesurfer.on('pause', function() {
    playBtn.disabled = false;
    pauseBtn.disabled = true;
});

wavesurfer.on('finish', function() {
    playBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Kontrol butonları
playBtn.addEventListener('click', function() {
    wavesurfer.play();
});

pauseBtn.addEventListener('click', function() {
    wavesurfer.pause();
});

// Dalga formu görselini indirme
downloadBtn.addEventListener('click', function() {
    try {
        // Canvas elementini al
        const canvas = wavesurfer.getDecodedData();
        if (!canvas) {
            alert('Önce bir ses dosyası yükleyin!');
            return;
        }
        
        // Waveform container'ını canvas'a dönüştür
        const waveformContainer = document.getElementById('waveform');
        const canvasElement = waveformContainer.querySelector('canvas');
        
        if (canvasElement) {
            // Canvas'ı PNG olarak indir
            const link = document.createElement('a');
            link.download = 'waveform.png';
            link.href = canvasElement.toDataURL('image/png');
            link.click();
        } else {
            // Alternatif yöntem: html2canvas kullanarak screenshot al
            downloadWaveformAsImage();
        }
    } catch (error) {
        console.error('İndirme hatası:', error);
        alert('Görsel indirilirken bir hata oluştu.');
    }
});

// Buton durumlarını ayarla
function setButtonsState(enabled) {
    playBtn.disabled = !enabled;
    pauseBtn.disabled = !enabled;
    downloadBtn.disabled = !enabled;
}

// Alternatif indirme yöntemi - html2canvas ile
function downloadWaveformAsImage() {
    // html2canvas kütüphanesini dinamik olarak yükle
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = function() {
            captureAndDownload();
        };
        document.head.appendChild(script);
    } else {
        captureAndDownload();
    }
}

function captureAndDownload() {
    const waveformContainer = document.getElementById('waveform');
    
    html2canvas(waveformContainer, {
        backgroundColor: null,
        scale: 2, // Daha yüksek kalite için
        useCORS: true
    }).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'waveform.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(function(error) {
        console.error('Screenshot hatası:', error);
        alert('Görsel oluşturulurken bir hata oluştu.');
    });
}

// Sayfa yüklendiğinde başlangıç durumu
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ses Dalga Formu Oluşturucu hazır!');
    setButtonsState(false);
});

// Klavye kısayolları
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !playBtn.disabled) {
        e.preventDefault();
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
        } else {
            wavesurfer.play();
        }
    }
});

// Sürükle-bırak desteği
const uploadSection = document.querySelector('.upload-section');

uploadSection.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadSection.style.background = 'rgba(255, 255, 255, 0.3)';
});

uploadSection.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadSection.style.background = 'rgba(255, 255, 255, 0.1)';
});

uploadSection.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadSection.style.background = 'rgba(255, 255, 255, 0.1)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('audio/')) {
            audioUpload.files = files;
            audioUpload.dispatchEvent(new Event('change'));
        } else {
            alert('Lütfen geçerli bir ses dosyası bırakın!');
        }
    }
}); 