import React, { useState, useEffect } from "react";

// TS EN 206 Beton Sınıfları ve Özellikleri
// fcm = fck + 2.1 MPa (Ortalama dayanım)
const BETON_SINIFLARI = {
  "C16/20": { fck: 16, fcm: 18.1, fckKup: 20, fcmKup: 22.1, klorurSinifi: "Cl 0.4", maruziyetSinifi: "X0" },
  "C20/25": { fck: 20, fcm: 22.1, fckKup: 25, fcmKup: 27.1, klorurSinifi: "Cl 0.4", maruziyetSinifi: "XC1" },
  "C25/30": { fck: 25, fcm: 27.1, fckKup: 30, fcmKup: 32.1, klorurSinifi: "Cl 0.4", maruziyetSinifi: "XC2" },
  "C30/37": { fck: 30, fcm: 32.1, fckKup: 37, fcmKup: 39.1, klorurSinifi: "Cl 0.2", maruziyetSinifi: "XC3/XC4" },
  "C35/45": { fck: 35, fcm: 37.1, fckKup: 45, fcmKup: 47.1, klorurSinifi: "Cl 0.2", maruziyetSinifi: "XD1" },
  "C40/50": { fck: 40, fcm: 42.1, fckKup: 50, fcmKup: 52.1, klorurSinifi: "Cl 0.1", maruziyetSinifi: "XD2" },
  "C45/55": { fck: 45, fcm: 47.1, fckKup: 55, fcmKup: 57.1, klorurSinifi: "Cl 0.1", maruziyetSinifi: "XD3" },
  "C50/60": { fck: 50, fcm: 52.1, fckKup: 60, fcmKup: 62.1, klorurSinifi: "Cl 0.1", maruziyetSinifi: "XS1" }
};

// Maruziyet Sınıfları Açıklamaları
const MARUZIYET_SINIFLARI = {
  "X0": "Korozyon veya aşınma riski yok",
  "XC1": "Kuru veya sürekli ıslak",
  "XC2": "Islak, nadiren kuru",
  "XC3/XC4": "Orta nem / Kuru-ıslak çevrimler",
  "XD1": "Orta nem",
  "XD2": "Islak, nadiren kuru",
  "XD3": "Kuru-ıslak çevrimler",
  "XS1": "Tuzlu hava ancak doğrudan temas yok"
};

const CEVRESEL_ETKI_SINIFLARI = [
  { kod: "X0", aciklama: "Korozyon veya aşınma riski yok" },
  { kod: "XC1", aciklama: "Kuru veya sürekli ıslak" },
  { kod: "XC2", aciklama: "Islak, nadiren kuru" },
  { kod: "XC3", aciklama: "Orta nem" },
  { kod: "XC4", aciklama: "Kuru-ıslak çevrimler" },
  { kod: "XD1", aciklama: "Orta nem, klorür" },
  { kod: "XD2", aciklama: "Islak, nadiren kuru, klorür" },
  { kod: "XD3", aciklama: "Kuru-ıslak çevrimler, klorür" },
  { kod: "XS1", aciklama: "Tuzlu hava (doğrudan temas yok)" },
  { kod: "XS2", aciklama: "Deniz suyu sıçraması veya ara sıra temas" },
  { kod: "XS3", aciklama: "Sürekli deniz suyu ile temas" },
  { kod: "XF1", aciklama: "Don-çöz, düşük doygunluk" },
  { kod: "XF2", aciklama: "Don-çöz + çözünmüş tuz, düşük doygunluk" },
  { kod: "XF3", aciklama: "Don-çöz, yüksek doygunluk" },
  { kod: "XF4", aciklama: "Don-çöz + çözünmüş tuz, yüksek doygunluk" },
  { kod: "XA1", aciklama: "Hafif kimyasal etki" },
  { kod: "XA2", aciklama: "Orta kimyasal etki" },
  { kod: "XA3", aciklama: "Şiddetli kimyasal etki" },
  { kod: "XM1", aciklama: "Hafif mekanik aşınma" },
  { kod: "XM2", aciklama: "Orta mekanik aşınma" },
  { kod: "XM3", aciklama: "Ağır mekanik aşınma" }
];

export default function Recete({ onReceteHazir }) {
  const [betonSinifi, setBetonSinifi] = useState("");
  const [cevreselEtki, setCevreselEtki] = useState("");
  
  // Manuel reçete girişi için state'ler
  const [recete, setRecete] = useState({
    cimento: "",
    mineralKatki: "",
    mineralTuru: "",
    agrega05: "",
    agrega512: "",
    agrega1222: "",
    agrega2232: "",
    su: "",
    kimyasalKatki1: "",
    kimyasalKatki2: ""
  });

  useEffect(() => {
    if (betonSinifi && BETON_SINIFLARI[betonSinifi]) {
      const secim = BETON_SINIFLARI[betonSinifi];
      
      // Manuel girilen değerleri sayıya çevir
      const receteSayisal = {
        cimento: Number(recete.cimento) || 0,
        mineralKatki: Number(recete.mineralKatki) || 0,
        mineralTuru: recete.mineralTuru || "",
        agrega05: Number(recete.agrega05) || 0,
        agrega512: Number(recete.agrega512) || 0,
        agrega1222: Number(recete.agrega1222) || 0,
        agrega2232: Number(recete.agrega2232) || 0,
        su: Number(recete.su) || 0,
        kimyasalKatki1: Number(recete.kimyasalKatki1) || 0,
        kimyasalKatki2: Number(recete.kimyasalKatki2) || 0,
      };

      // Üst bileşene (App.js) veriyi gönderiyoruz - manuel reçete dahil
      onReceteHazir({
        betonSinifi,
        fck: secim.fck,
        fcm: secim.fcm,
        fckKup: secim.fckKup,
        fcmKup: secim.fcmKup,
        klorurSinifi: secim.klorurSinifi,
        maruziyetSinifi: secim.maruziyetSinifi,
        cevreselEtki,
        // Manuel girilen reçete değerleri (sayısal)
        ...receteSayisal
      });
    } else {
      // Seçim yoksa null gönder
      onReceteHazir(null);
    }
  }, [betonSinifi, recete, onReceteHazir]);

  // Reçete güncelleme fonksiyonu
  const receteDegistir = (alan, deger) => {
    if (Number(deger) < 0) return; // Negatif kontrol
    setRecete(prev => ({
      ...prev,
      [alan]: deger
    }));
  };

  // Mineral türüne göre k katsayısı (eşdeğer bağlayıcı için)
  const mineralKatsayi = () => {
    const tur = (recete.mineralTuru || "").toLowerCase();
    if (tur === "curuf") return 0.8;
    if (tur === "kül" || tur === "kul") return 0.4;
    return 0;
  };

  const kDegeri = mineralKatsayi();
  const toplamBaglayici = (Number(recete.cimento) || 0) + (Number(recete.mineralKatki) || 0);
  const baglayiciEsdeger = (Number(recete.cimento) || 0) + ((Number(recete.mineralKatki) || 0) * kDegeri);
  const toplamAgrega = ((Number(recete.agrega05) || 0) + (Number(recete.agrega512) || 0) + (Number(recete.agrega1222) || 0) + (Number(recete.agrega2232) || 0));
  const scOrani = baglayiciEsdeger > 0 ? ((Number(recete.su) || 0) / baglayiciEsdeger) : 0;

  return (
    <div>
      <h3>1. Reçete Tasarımı (TS EN 206)</h3>
      <div style={{ background: "#f0f8ff", padding: 15, borderRadius: 8 }}>
        <label><strong>Beton Sınıfı Seçiniz:</strong> </label>
        <select
          value={betonSinifi}
          onChange={(e) => setBetonSinifi(e.target.value)}
          style={{ padding: 5, fontSize: "1rem", marginBottom: 15 }}
        >
          <option value="">-- Seçiniz --</option>
          {Object.keys(BETON_SINIFLARI).map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        
        {betonSinifi && BETON_SINIFLARI[betonSinifi] && (
          <div style={{ 
            marginTop: 15, 
            padding: 15, 
            background: "white", 
            borderRadius: 8,
            border: "2px solid #2196F3"
          }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#1976D2" }}>📋 Beton Özellikleri</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr style={{ background: "#e3f2fd" }}>
                  <td colSpan="2" style={{ padding: 8, fontWeight: "bold", textAlign: "center" }}>
                    🔹 SİLİNDİR NUMUNE (Ø150x300mm)
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>Karakteristik Dayanım (fck):</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>{BETON_SINIFLARI[betonSinifi].fck} MPa</td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>Ortalama Dayanım (fcm):</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>{BETON_SINIFLARI[betonSinifi].fcm} MPa</td>
                </tr>
                <tr style={{ background: "#e3f2fd" }}>
                  <td colSpan="2" style={{ padding: 8, fontWeight: "bold", textAlign: "center" }}>
                    🔸 KÜP NUMUNE (150x150x150mm)
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>Karakteristik Dayanım (fck):</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>{BETON_SINIFLARI[betonSinifi].fckKup} MPa</td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>Ortalama Dayanım (fcm):</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>{BETON_SINIFLARI[betonSinifi].fcmKup} MPa</td>
                </tr>
                <tr style={{ background: "#fff3e0" }}>
                  <td colSpan="2" style={{ padding: 8, fontWeight: "bold", textAlign: "center" }}>
                    ⚙️ DİĞER ÖZELLİKLER
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>Klorür Sınıfı:</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>{BETON_SINIFLARI[betonSinifi].klorurSinifi}</td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold" }}>Çevresel Etki Sınıfı:</td>
                  <td style={{ padding: 8 }}>
                    <select
                      value={cevreselEtki}
                      onChange={(e) => setCevreselEtki(e.target.value)}
                      style={{ padding: 6, fontSize: "1rem", minWidth: 260 }}
                    >
                      <option value="">-- Seçiniz --</option>
                      {CEVRESEL_ETKI_SINIFLARI.map((s) => (
                        <option key={s.kod} value={`${s.kod} ${s.aciklama}`}>
                          {s.kod} - {s.aciklama}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* MANUEL REÇETE GİRİŞİ */}
        {betonSinifi && (
          <div style={{
            marginTop: 20,
            padding: 15,
            background: "white",
            borderRadius: 8,
            border: "2px solid #4caf50"
          }}>
            <h4 style={{
              margin: "0 0 15px 0",
              padding: "10px",
              background: "#4caf50",
              color: "white",
              borderRadius: "5px",
              textAlign: "center"
            }}>
              ✏️ DÜZELTİLMİŞ REÇETE GİRİŞİ (kg/m³)
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                  Çimento (kg/m³):
                </label>
                <input
                  type="number"
                  value={recete.cimento}
                  onChange={(e) => receteDegistir("cimento", e.target.value)}
                  style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                />
              </div>

              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                  Mineral Katkı (Kül/Cüruf) (kg/m³):
                </label>
                <input
                  type="number"
                  value={recete.mineralKatki}
                  onChange={(e) => receteDegistir("mineralKatki", e.target.value)}
                  style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                />
                <select
                  value={recete.mineralTuru}
                  onChange={(e) => receteDegistir("mineralTuru", e.target.value)}
                  style={{ marginTop: 8, width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                >
                  <option value="">-- Mineral türü seçin --</option>
                  <option value="curuf">Curuf</option>
                  <option value="kül">Kül</option>
                  <option value="yok">Katkı Yok</option>
                </select>
              </div>

              {/* Su */}
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                  Su (kg/m³ veya lt/m³):
                </label>
                <input
                  type="number"
                  value={recete.su}
                  onChange={(e) => receteDegistir("su", e.target.value)}
                  style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                />
              </div>

              {/* Kimyasal Katkı 1 */}
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                  Kimyasal Katkı 1 (kg/m³):
                </label>
                <input
                  type="number"
                  value={recete.kimyasalKatki1}
                  onChange={(e) => receteDegistir("kimyasalKatki1", e.target.value)}
                  style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                />
              </div>

              {/* Kimyasal Katkı 2 */}
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                  Kimyasal Katkı 2 (kg/m³):
                </label>
                <input
                  type="number"
                  value={recete.kimyasalKatki2}
                  onChange={(e) => receteDegistir("kimyasalKatki2", e.target.value)}
                  style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                />
              </div>

              {/* Boş alan dengesi için */}
              <div></div>

              {/* Agregalar - Tam satır */}
              <div style={{ gridColumn: "1 / -1" }}>
                <h5 style={{ 
                  margin: "10px 0", 
                  padding: 8, 
                  background: "#e8f5e9", 
                  borderRadius: 4,
                  textAlign: "center"
                }}>
                  🪨 AGREGA MİKTARLARI
                </h5>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: 10 }}>
                  <div>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                      Agrega 0-5 mm (kg/m³):
                    </label>
                    <input
                      type="number"
                      value={recete.agrega05}
                      onChange={(e) => receteDegistir("agrega05", e.target.value)}
                      style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                      Agrega 5-12 mm (kg/m³):
                    </label>
                    <input
                      type="number"
                      value={recete.agrega512}
                      onChange={(e) => receteDegistir("agrega512", e.target.value)}
                      style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                      Agrega 12-22 mm (kg/m³):
                    </label>
                    <input
                      type="number"
                      value={recete.agrega1222}
                      onChange={(e) => receteDegistir("agrega1222", e.target.value)}
                      style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                    />
                  </div>

                  <div>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
                      Agrega 22-32 mm (kg/m³):
                    </label>
                    <input
                      type="number"
                      value={recete.agrega2232}
                      onChange={(e) => receteDegistir("agrega2232", e.target.value)}
                      style={{ width: "100%", padding: 8, fontSize: "1rem", border: "2px solid #ddd", borderRadius: 4 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Özet Bilgi */}
            <div style={{
              marginTop: 15,
              padding: 10,
              background: "#e3f2fd",
              borderRadius: 5,
              border: "1px solid #2196F3"
            }}>
              <strong>📊 Reçete Özeti:</strong>
              <div style={{ marginTop: 8, fontSize: "0.95rem" }}>
                <div>• Toplam Bağlayıcı (Çimento + mineral katkı): <strong>{toplamBaglayici.toFixed(1)} kg/m³</strong></div>
                <div>• Eşdeğer Bağlayıcı (Çimento + Mineral×k): <strong>{baglayiciEsdeger.toFixed(1)} kg/m³</strong> <small>(k: curuf=0.8, kül=0.4)</small></div>
                <div>• Mineral Türü: <strong>{recete.mineralTuru ? recete.mineralTuru.toUpperCase() : "Belirtilmedi"}</strong></div>
                <div>• Toplam Agrega: <strong>{toplamAgrega.toFixed(1)} kg/m³</strong></div>
                <div>• Su/Bağlayıcı Oranı: <strong>{baglayiciEsdeger > 0 ? scOrani.toFixed(3) : "0.000"}</strong></div>
                <div>• Toplam Kimyasal Katkı: <strong>{((Number(recete.kimyasalKatki1) || 0) + (Number(recete.kimyasalKatki2) || 0)).toFixed(2)} kg/m³</strong></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}