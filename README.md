# 🧱 Betoniq

**Betoniq**, TS EN 206 ve TSE 13515 standartlarına uygun şekilde  
beton reçetesi tasarımı, maliyet hesaplama ve satış/teklif yönetimi  
yapılmasını sağlayan React tabanlı profesyonel bir beton yazılımıdır.

**✅ Güncel Versiyon:** 1.0.0  
**📅 Son Güncelleme:** 1 Ocak 2026

---

## 🚀 Özellikler

### 🔐 Kullanıcı Yönetimi
- Rol bazlı giriş sistemi (Laboratuvar, Satış, Yönetici)
- Kullanıcı oturum yönetimi
- LocalStorage ile kalıcı oturum

### 🔹 Beton Reçetesi Tasarımı
- TS EN 206 beton sınıfı seçimi (C16/20 - C50/60)
- Karakteristik ve ortalama dayanım hesapları (Fck, Fcm)
- Otomatik çimento ve katkı miktarı hesaplama
- Reçete → satış → teklif zinciri (kopmaz)

### 🧪 Agrega & Gradasyon Kontrolü
- **TSE 13515** agrega gradasyon limitleri
- Elek bazlı alt–üst sınır kontrolü (0.063mm - 31.5mm)
- Standart dışı karışımlara otomatik uyarı sistemi
- Gradasyon grafiği görselleştirmesi (Recharts)
- Elek analizi verilerini kaydetme

### 💰 Maliyet & Satış Hesapları
- Detaylı birim maliyet analizi (TL/m³)
- 6 farklı maliyet kalemi (Çimento, Agrega, Su, Katkı, Enerji, İşçilik)
- Manuel miktar ve birim fiyat düzenleme
- Kâr oranı tanımı (%0-200)
- İskonto uygulaması (%0-100)
- Otomatik net satış fiyatı hesaplama
- Form validasyonları

### 📄 Teklif & Dokümantasyon
- **PDF teklif oluşturma** (Türkçe karakter desteği)
- **Excel teklif ve maliyet raporu** export
- Otomatik tarih ve beton sınıfı ile dosya adlandırma
- Detaylı hesaplama bilgileri
- Standart uygunluk notu

### 💾 Veri Kalıcılığı
- LocalStorage ile otomatik kaydetme
- Reçete bilgileri
- Maliyet hesaplamaları
- Elek analizi verileri
- Kullanıcı oturum bilgileri

### 📱 Responsive Tasarım
- Mobil uyumlu (480px ve altı)
- Tablet optimize (768px ve altı)
- Masaüstü optimize (1024px ve üstü)
- Modern gradient header
- Kullanıcı dostu arayüz

---

## 🛠 Kullanılan Teknolojiler

- **React 19.2.3** - Modern UI Framework
- **jsPDF 3.0.4** - PDF oluşturma
- **xlsx 0.18.5** - Excel export
- **recharts 3.6.0** - Veri görselleştirme
- **file-saver 2.0.5** - Dosya indirme
- JavaScript (ES6+)
- CSS3 (Responsive)
- npm
- Git & GitHub

---

## 📂 Proje Yapısı

```text
betoniq/
│
├─ src/
│  ├─ components/
│  │  ├─ Recete.js              # Beton sınıfı seçimi
│  │  ├─ BirimMaliyet.js        # Maliyet analizi ve Excel export
│  │  ├─ SatisTeklif.js         # Teklif oluşturma ve PDF/Excel export
│  │  ├─ ElekAnalizi.js         # TSE 13515 elek analizi
│  │  ├─ GradasyonGrafik.js     # Gradasyon grafiği
│  │  ├─ Login.js               # Kullanıcı giriş ekranı
│  │  └─ tse13515.js            # TSE 13515 standart verileri
│  │
│  ├─ context/
│  │  └─ AuthContext.js         # Kullanıcı yönetimi context
│  │
│  ├─ styles/
│  │  └─ theme.css
│  │
│  ├─ App.js                    # Ana component
│  ├─ App.css                   # Responsive stil kuralları
│  ├─ index.js                  # Giriş noktası
│  └─ index.css
│
├─ public/
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
│
├─ README.md
├─ CHANGELOG.md                 # Değişiklik günlüğü
└─ package.json
```

---

## 📦 Kurulum

### Gereksinimler:
- Node.js (v14 veya üstü)
- npm (v6 veya üstü)

### Kurulum Adımları:

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Projeyi başlatın:
```bash
npm start
```

3. Tarayıcınızda açın:
```
http://localhost:3000
```

---

## 🎯 Kullanım Kılavuzu

### 1️⃣ Giriş Yapma
1. Kullanıcı adınızı girin
2. Rolünüzü seçin (Laboratuvar/Satış/Yönetici)
3. Giriş yapın

### 2️⃣ Reçete Oluşturma
1. Beton sınıfını seçin
2. Sistem otomatik hesaplar

### 3️⃣ Elek Analizi
1. Elek değerlerini girin
2. Standart kontrolü yapın
3. Grafiği görüntüleyin

### 4️⃣ Maliyet Hesaplama
1. Miktarları düzenleyin
2. Toplam maliyet görüntülenir
3. Excel'e aktarın

### 5️⃣ Teklif Oluşturma
1. Kâr ve iskonto belirleyin
2. PDF veya Excel indirin

---

## 📝 Detaylar

Detaylı değişiklik günlüğü için [CHANGELOG.md](CHANGELOG.md) dosyasına bakınız.

**Proje Durumu:** ✅ Aktif ve Çalışıyor  
**Son Güncelleme:** 1 Ocak 2026
