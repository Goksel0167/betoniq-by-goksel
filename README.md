# 🧱 Betoniq

**Betoniq**, TS EN 206 ve TSE 13515 standartlarına uygun şekilde  
beton reçetesi tasarımı, maliyet hesaplama ve satış/teklif yönetimi  
yapılmasını sağlayan React tabanlı profesyonel bir beton yazılımıdır.

---

## 🚀 Özellikler

### 🔹 Beton Reçetesi Tasarımı
- TS EN 206 beton sınıfı seçimi (örn. C25/30)
- Karakteristik ve ortalama dayanım hesapları (Fck, Fcm)
- Reçete seçimi ve zorunlu reçete bağlama sistemi

### 🔹 Agrega & Gradasyon Kontrolü
- **TSE 13515** agrega gradasyon limitleri
- Elek bazlı alt–üst sınır kontrolü
- Standart dışı karışımlara otomatik uyarı altyapısı

### 🔹 Maliyet & Satış Hesapları
- Birim maliyet (TL/m³)
- Kâr oranı tanımı
- İskonto uygulanmış net satış fiyatı
- Reçete → satış → teklif zinciri (kopmaz)

### 🔹 Teklif & Dokümantasyon
- PDF teklif oluşturma
- Excel ve PDF dışa aktarma (altyapı hazır)

---

## 🛠 Kullanılan Teknolojiler

- **React 18**
- JavaScript (ES6+)
- CSS
- npm
- Git & GitHub

---

## 📂 Proje Yapısı

```text
betoniq/
│
├─ src/
│  ├─ components/
│  │  ├─ Recete.js
│  │  ├─ SatisTeklif.js
│  │  └─ ...
│  ├─ App.js
│  └─ index.js
│
├─ public/
├─ README.md
└─ package.json
