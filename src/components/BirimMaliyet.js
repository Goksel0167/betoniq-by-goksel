import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function BirimMaliyet({ recete, onMaliyetHesapla }) {
  // Başlangıç kalemleri - Tüm birim fiyatlar manuel; birim ağırlıklar kg/m³ olarak girilir
  const [kalemler, setKalemler] = useState({
    cimento: { ad: "Çimento", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 3100 },
    mineralKatki: { ad: "Mineral Katkı (Kül/Curuf)", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 2900 },
    agrega05: { ad: "Agrega 0-5 mm", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 2650 },
    agrega512: { ad: "Agrega 5-12 mm", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 2650 },
    agrega1222: { ad: "Agrega 12-22 mm", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 2650 },
    agrega2232: { ad: "Agrega 22-32 mm", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 2650 },
    su: { ad: "Su", miktar: 0, birimFiyat: "", birim: "lt", birimAgirlik: 1000 },
    kimyasalKatki1: { ad: "Kimyasal Katkı 1", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 1050 },
    kimyasalKatki2: { ad: "Kimyasal Katkı 2", miktar: 0, birimFiyat: "", birim: "kg", birimAgirlik: 1050 },
    enerji: { ad: "Enerji 1 m3 için", miktar: 1, birimFiyat: "", birim: "adet", birimAgirlik: 0 },
    iscilik: { ad: "İşçilik 1 m3 için", miktar: 1, birimFiyat: "", birim: "adet", birimAgirlik: 0 },
    nakliye: { ad: "Nakliye km", miktar: 0, birimFiyat: "", birim: "km", birimAgirlik: 0 },
  });

  const [toplamMaliyet, setToplamMaliyet] = useState(0);
  const [suCimentoOrani, setSuCimentoOrani] = useState(0);
  const [toplamBirimAgirlik, setToplamBirimAgirlik] = useState(0);
  const [uyarilar, setUyarilar] = useState([]);

  // Mineral türüne göre eşdeğer bağlayıcı katsayısı
  const mineralKatsayi = () => {
    const tur = (recete?.mineralTuru || "").toLowerCase();
    if (tur === "curuf") return 0.8;
    if (tur === "kül" || tur === "kul") return 0.4;
    return 0;
  };

  // 1. REÇETE DEĞİŞTİĞİNDE: Düzeltilmiş reçeteden miktarları al (OTOMATİK HESAPLAMA YOK!)
  useEffect(() => {
    if (!recete) return;

    // Reçeteden gelen değerleri direkt kullan - otomatik hesaplama yok
    setKalemler(prev => ({
      ...prev,
      cimento: { ...prev.cimento, miktar: recete.cimento || 0 },
      mineralKatki: { ...prev.mineralKatki, miktar: recete.mineralKatki || 0 },
      agrega05: { ...prev.agrega05, miktar: recete.agrega05 || 0 },
      agrega512: { ...prev.agrega512, miktar: recete.agrega512 || 0 },
      agrega1222: { ...prev.agrega1222, miktar: recete.agrega1222 || 0 },
      agrega2232: { ...prev.agrega2232, miktar: recete.agrega2232 || 0 },
      su: { ...prev.su, miktar: recete.su || 0 },
      kimyasalKatki1: { ...prev.kimyasalKatki1, miktar: recete.kimyasalKatki1 || 0 },
      kimyasalKatki2: { ...prev.kimyasalKatki2, miktar: recete.kimyasalKatki2 || 0 },
    }));

  }, [recete]);

  // 2. HERHANGİ BİR DEĞİŞİKLİKTE: Toplamı hesapla ve Ana Sayfaya bildir
  useEffect(() => {
    let toplam = 0;
    Object.values(kalemler).forEach(kalem => {
      toplam += kalem.miktar * kalem.birimFiyat;
    });

    setToplamMaliyet(toplam);
    onMaliyetHesapla(toplam);
    
    // Su/Bağlayıcı oranı (eşdeğer bağlayıcı: çimento + mineral*k)
    const kDegeri = mineralKatsayi();
    const baglayiciEsdeger = kalemler.cimento.miktar + (kalemler.mineralKatki.miktar * kDegeri);
    if (baglayiciEsdeger > 0) {
      const scOrani = kalemler.su.miktar / baglayiciEsdeger;
      setSuCimentoOrani(scOrani);
      
      const yeniUyarilar = [];
      if (recete) {
        if (recete.fck >= 50 && scOrani > 0.45) yeniUyarilar.push("⚠️ UYARI: C50 ve üzeri betonlarda Su/Çimento oranı 0.45'i geçmemelidir!");
        else if (recete.fck >= 30 && scOrani > 0.55) yeniUyarilar.push("⚠️ UYARI: C30-C45 betonlarda Su/Çimento oranı 0.55'i geçmemelidir!");
        else if (scOrani > 0.65) yeniUyarilar.push("⚠️ UYARI: Su/Çimento oranı 0.65'i geçmemelidir!");
        if (baglayiciEsdeger < 280) yeniUyarilar.push("⚠️ UYARI: Minimum eşdeğer bağlayıcı (çimento+mineral*k) 280 kg/m³ olmalıdır!");
        if (baglayiciEsdeger > 500) yeniUyarilar.push("⚠️ UYARI: Maksimum eşdeğer bağlayıcı (çimento+mineral*k) 500 kg/m³'ü geçmemelidir!");
      }
      setUyarilar(yeniUyarilar);
    }

    // Toplam beton birim ağırlığı (kg/m³): sadece beton bileşenlerinin miktar toplamı
    const birimAgirlikAnahtarlar = [
      "cimento",
      "mineralKatki",
      "agrega05",
      "agrega512",
      "agrega1222",
      "agrega2232",
      "su",
      "kimyasalKatki1",
      "kimyasalKatki2",
    ];
    const toplamBirimAgirlikKg = birimAgirlikAnahtarlar.reduce((acc, key) => {
      return acc + (kalemler[key]?.miktar || 0);
    }, 0);
    setToplamBirimAgirlik(toplamBirimAgirlikKg);
  }, [kalemler, onMaliyetHesapla, recete]);

  // 3. TABLO GÜNCELLEME FONKSİYONU
  const degistir = (anahtar, alan, deger) => {
    const numDeger = parseFloat(deger);
    if (numDeger < 0) {
      alert("⚠️ Negatif değer girilemez!");
      return;
    }
    if (alan === "miktar" && numDeger > 10000) {
      alert("⚠️ Miktar çok büyük! Lütfen kontrol ediniz.");
      return;
    }
    if (alan === "birimFiyat" && numDeger > 1000) {
      alert("⚠️ Birim fiyat çok yüksek! Lütfen kontrol ediniz.");
      return;
    }
    if (alan === "birimAgirlik" && numDeger > 6000) {
      alert("⚠️ Birim ağırlık çok yüksek! Lütfen kg/m³ değerini kontrol edin.");
      return;
    }

    setKalemler(prev => ({
      ...prev,
      [anahtar]: {
        ...prev[anahtar],
        [alan]: numDeger || 0
      }
    }));
  };

  if (!recete) return <p style={{ color: "#999" }}>Maliyet hesabı için reçete bekleniyor...</p>;

  const maliyetExcelOlustur = () => {
    const maliyetData = [
      ["BETONIQ MALIYET ANALIZI"],
      [],
      ["Beton Sınıfı", recete.betonSinifi],
      ["Karakteristik Dayanım (Fck)", `${recete.fck} MPa`],
      ["Ortalama Dayanım (Fcm)", `${recete.fcm} MPa`],
      [],
      ["Malzeme", "Miktar (kg/lt)", "Birim Fiyat (TL)", "Tutar (TL)"],
    ];

    Object.values(kalemler).forEach(kalem => {
      maliyetData.push([
        kalem.ad,
        kalem.miktar,
        kalem.birimFiyat,
        (kalem.miktar * kalem.birimFiyat).toFixed(2)
      ]);
    });

    maliyetData.push([]);
    maliyetData.push(["TOPLAM MALIYET (1 m³)", "", "", `${toplamMaliyet.toFixed(2)} TL`]);

    const ws = XLSX.utils.aoa_to_sheet(maliyetData);
    ws['!cols'] = [
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Maliyet Analizi");

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `Betoniq_Maliyet_${recete.betonSinifi}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div>
      <h3>2. Reçete İçeriği ve Maliyet Analizi</h3>
      <div style={{ background: "#fff3e0", padding: 15, borderRadius: 8 }}>
        {/* Üst Bilgi Tablosu kaldırıldı: sadece başlık kartı */}
        <div style={{ 
          background: "white", 
          padding: "15px", 
          borderRadius: "8px", 
          marginBottom: "15px",
          border: "2px solid #ff9800"
        }}>
          <h4 style={{ 
            margin: "0", 
            padding: "10px", 
            background: "#ff9800", 
            color: "white",
            borderRadius: "5px",
            textAlign: "center"
          }}>
            BETONIQ MALIYET ANALIZI
          </h4>
        </div>

        {/* Su/Çimento Oranı ve Kalite Kontrol */}
        {suCimentoOrani > 0 && (
          <div style={{ 
            marginTop: 15, 
            padding: 15, 
            background: suCimentoOrani <= 0.55 ? "#e8f5e9" : "#ffebee",
            borderRadius: 8,
            border: `2px solid ${suCimentoOrani <= 0.55 ? "#4caf50" : "#f44336"}`
          }}>
            <h4 style={{ margin: "0 0 10px 0" }}>🔬 Kalite Kontrol Parametreleri (TS EN 206)</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                    Su/Çimento Oranı (S/Ç):
                  </td>
                  <td style={{ 
                    padding: 8, 
                    borderBottom: "1px solid #ddd",
                    fontWeight: "bold",
                    color: suCimentoOrani <= 0.55 ? "#4caf50" : "#f44336"
                  }}>
                    {suCimentoOrani.toFixed(3)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                    Toplam Bağlayıcı (Çimento + Katkı):
                  </td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
                    {(kalemler.cimento.miktar + kalemler.mineralKatki.miktar).toFixed(1)} kg/m³
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold" }}>
                    Kıvam Sınıfı (Tahmini):
                  </td>
                  <td style={{ padding: 8 }}>
                    {suCimentoOrani >= 0.60 ? "S4-S5 (Çok akıcı)" : 
                     suCimentoOrani >= 0.50 ? "S3 (Akıcı)" : 
                     suCimentoOrani >= 0.40 ? "S2 (Plastik)" : "S1 (Katı)"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Uyarılar */}
        {uyarilar.length > 0 && (
          <div style={{ 
            marginTop: 15, 
            padding: 15, 
            background: "#fff3e0",
            borderRadius: 8,
            border: "2px solid #ff9800"
          }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#e65100" }}>⚠️ Standart Uyarıları</h4>
            {uyarilar.map((uyari, index) => (
              <div key={index} style={{ 
                padding: 8, 
                marginBottom: 5,
                background: "white",
                borderRadius: 5,
                color: "#d84315"
              }}>
                {uyari}
              </div>
            ))}
          </div>
        )}

        <div style={{
          padding: 12,
          background: "#e3f2fd",
          borderRadius: 8,
          marginBottom: 10,
          marginTop: 15,
          border: "2px solid #2196F3"
        }}>
          <strong>💡 ÖNEMLİ:</strong>
          <ul style={{ margin: "8px 0 0 20px", fontSize: "0.95rem" }}>
            <li>Malzeme miktarları <strong>"Reçete Tasarımı"</strong> ekranından düzeltilmiş reçete olarak girilmelidir.</li>
            <li>Tüm <strong>birim fiyatlar</strong> bu ekrandan manuel olarak girilebilir.</li>
            <li>Enerji, işçilik, nakliye gibi sabit kalemler burada düzenlenebilir.</li>
            <li>Su/çimento oranı hesaplanırken eşdeğer bağlayıcı: çimento + mineral×k (k: curuf=0.8, kül=0.4) kullanılır.</li>
            <li>Toplam beton birim ağırlık, sadece beton bileşenlerinin (çimento, mineral, agregalar, su, kimyasal katkılar) toplamıdır.</li>
          </ul>
        </div>
        
        <table border="1" className="maliyet-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", background: "white" }}>
          <thead>
            <tr style={{ background: "#ff9800", color: "white" }}>
              <th style={{ padding: 10 }}>Malzeme</th>
              <th>Miktar (kg/lt)</th>
              <th>Birim Fiyat (TL/kg)</th>
              <th>Tutar (TL)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(kalemler).map((key) => {
              const kalem = kalemler[key];
              // Malzeme miktarı mı yoksa sabit kalem mi?
              const isMalzemeMiktar = ["cimento", "mineralKatki", "agrega05", "agrega512", "agrega1222", "agrega2232", "su", "kimyasalKatki1", "kimyasalKatki2"].includes(key);
              
              return (
                <tr key={key}>
                  <td style={{ textAlign: "left", paddingLeft: 10, fontWeight: "bold" }}>
                    {kalem.ad}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={kalem.miktar}
                      onChange={(e) => degistir(key, "miktar", e.target.value)}
                      readOnly={isMalzemeMiktar}
                      style={{ 
                        width: "70px", 
                        padding: 5, 
                        textAlign: "center", 
                        border: "1px solid #ddd",
                        background: isMalzemeMiktar ? "#f5f5f5" : "white",
                        cursor: isMalzemeMiktar ? "not-allowed" : "text"
                      }}
                      title={isMalzemeMiktar ? "Bu miktar 'Reçete Tasarımı' ekranından girilmelidir" : "Düzenlenebilir"}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={kalem.birimFiyat}
                      onChange={(e) => degistir(key, "birimFiyat", e.target.value)}
                      style={{ width: "70px", padding: 5, textAlign: "center", border: "1px solid #ddd" }}
                    />
                  </td>
                  <td style={{ background: "#f5f5f5", fontWeight: "bold" }}>
                    ₺ {(kalem.miktar * kalem.birimFiyat).toFixed(2)}
                  </td>
                </tr>
              );
            })}
            
            <tr style={{ background: "#fff3e0", fontWeight: "bold", fontSize: "1.1em" }}>
              <td colSpan="3" style={{ textAlign: "right", paddingRight: 15, padding: 10 }}>
                TOPLAM MALIYET (1 m³):
              </td>
              <td style={{ color: "#d84315", fontSize: "1.2em" }}>
                ₺ {toplamMaliyet.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Birim ağırlık özeti */}
        <div style={{
          marginTop: 12,
          padding: 12,
          background: "#f1f8e9",
          borderRadius: 6,
          border: "1px solid #c5e1a5"
        }}>
          <strong>Toplam Beton Birim Ağırlık (kg/m³): </strong>{toplamBirimAgirlik.toFixed(1)}
          <div style={{ fontSize: "0.85rem", color: "#4a4a4a", marginTop: 4 }}>
            (Çimento + Mineral Katkı + Agregalar + Su + Kimyasal Katkılar toplamı)
          </div>
        </div>

        <button 
          onClick={maliyetExcelOlustur}
          style={{ 
            marginTop: "15px",
            background: "#ff9800", 
            color: "white", 
            border: "none", 
            padding: "10px 20px", 
            cursor: "pointer", 
            borderRadius: 5, 
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "background 0.3s"
          }}
          onMouseOver={(e) => e.target.style.background = "#f57c00"}
          onMouseOut={(e) => e.target.style.background = "#ff9800"}
        >
          📊 Maliyet Analizi Excel'e Aktar
        </button>
      </div>
    </div>
  );
}