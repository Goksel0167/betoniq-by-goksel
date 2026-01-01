import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Standart beton sınıfları için küp değerleri (fckKup/fcmKup) yedek amaçlı
const SINIF_KUP_HARITASI = {
  "C16/20": { fckKup: 20, fcmKup: 22.1 },
  "C20/25": { fckKup: 25, fcmKup: 27.1 },
  "C25/30": { fckKup: 30, fcmKup: 32.1 },
  "C30/37": { fckKup: 37, fcmKup: 39.1 },
  "C35/45": { fckKup: 45, fcmKup: 47.1 },
  "C40/50": { fckKup: 50, fcmKup: 52.1 },
  "C45/55": { fckKup: 55, fcmKup: 57.1 },
  "C50/60": { fckKup: 60, fcmKup: 62.1 }
};

export default function KaliteKontrol({ recete }) {
  const [numuneTipi, setNumuneTipi] = useState("silindir"); // silindir veya kup
  const [numuneler, setNumuneler] = useState([
    { id: 1, gun7: "", gun28: "", durum: "" },
    { id: 2, gun7: "", gun28: "", durum: "" },
    { id: 3, gun7: "", gun28: "", durum: "" },
  ]);

  const [tedarikci, setTedarikci] = useState({ unvan: "", yetkili: "" });
  const [musteri, setMusteri] = useState({ unvan: "", yetkili: "" });

  const [ortalama7, setOrtalama7] = useState(0);
  const [ortalama28, setOrtalama28] = useState(0);
  const [sonuc, setSonuc] = useState("");
  const [ts500Sonuc, setTs500Sonuc] = useState(null);
  const [ts500Uyari, setTs500Uyari] = useState("");

  // Seçilen numune tipine göre dayanım değerlerini türet
  const seciliFck = recete
    ? (
        numuneTipi === "silindir"
          ? Number(recete.fck)
          : Number(recete.fckKup ?? SINIF_KUP_HARITASI[recete.betonSinifi]?.fckKup ?? recete.fck)
      )
    : 0;

  // fcm seçimi: önce ilgili fcm, yoksa uygun fck + 2.1
  const seciliFcmHam = recete
    ? (
        numuneTipi === "silindir"
          ? Number(recete.fcm)
          : Number(recete.fcmKup ?? SINIF_KUP_HARITASI[recete.betonSinifi]?.fcmKup)
      )
    : 0;
  const seciliFckForFcm = recete
    ? (
        numuneTipi === "silindir"
          ? Number(recete.fck)
          : Number(recete.fckKup ?? SINIF_KUP_HARITASI[recete.betonSinifi]?.fckKup ?? recete.fck)
      )
    : 0;
  const seciliFcm = Number.isFinite(seciliFcmHam) && seciliFcmHam > 0
    ? seciliFcmHam
    : (Number.isFinite(seciliFckForFcm) ? seciliFckForFcm + 2.1 : 0);

  const hesapla = () => {
    if (!recete) {
      alert("Önce reçete seçiniz!");
      return;
    }

    // Ortalama hesapla
    let toplam7 = 0;
    let toplam28 = 0;
    let sayac7 = 0;
    let sayac28 = 0;

    numuneler.forEach(n => {
      if (n.gun7 && !isNaN(parseFloat(n.gun7))) {
        toplam7 += parseFloat(n.gun7);
        sayac7++;
      }
      if (n.gun28 && !isNaN(parseFloat(n.gun28))) {
        toplam28 += parseFloat(n.gun28);
        sayac28++;
      }
    });

    const ort7 = sayac7 > 0 ? toplam7 / sayac7 : 0;
    const ort28 = sayac28 > 0 ? toplam28 / sayac28 : 0;

    setOrtalama7(ort7);
    setOrtalama28(ort28);

    // Numune tipine göre hedef dayanımı belirle
    const fck = seciliFck;
    const fcm = seciliFcm;
    
    let durum = "";

    // TS EN 206: Ortalama dayanım fcm (fck + 2.1 MPa) ve üzerinde olmalı
    if (ort28 >= fcm) {
      durum = "✅ UYGUN - Beton dayanımı standartları karşılıyor! (Ortalama ≥ fcm)";
    } else {
      durum = "❌ UYGUN DEĞİL - Ortalama fcm altında";
    }

    setSonuc(durum);

    // Her numune için durumu güncelle
    const yeniNumuneler = numuneler.map(n => {
      const d28 = parseFloat(n.gun28);
      if (!Number.isNaN(d28) && d28 >= fcm) {
        return { ...n, durum: "✅ Uygun" };
      }
      return { ...n, durum: "❌ Uygun Değil" };
    });

    setNumuneler(yeniNumuneler);

    // TS 500 değerlendirmesi (9 numune, 3'erli gruplar)
    const gun28List = yeniNumuneler
      .map(n => parseFloat(n.gun28))
      .filter(v => !Number.isNaN(v));

    if (gun28List.length < 9) {
      setTs500Sonuc(null);
      setTs500Uyari("TS 500 değerlendirme için en az 9 adet 28 günlük numune (3 grup) gerekir.");
      return;
    }

    // 3'erli gruplara böl
    const groups = [];
    for (let i = 0; i + 2 < gun28List.length; i += 3) {
      groups.push([gun28List[i], gun28List[i + 1], gun28List[i + 2]]);
    }

    if (groups.length < 3) {
      setTs500Sonuc(null);
      setTs500Uyari("TS 500 değerlendirme için en az 3 grup gereklidir (her biri 3 numune).");
      return;
    }

    const allValues = groups.flat();
    const partyMean = allValues.reduce((a, b) => a + b, 0) / allValues.length;
    const groupMeans = groups.map(g => g.reduce((a, b) => a + b, 0) / g.length);
    const minGroupMean = Math.min(...groupMeans);
    const fckDegeri = fck;
    const criterionA = partyMean >= (fckDegeri + 1);
    const criterionB = minGroupMean >= (fckDegeri - 3);
    const accepted = criterionA && criterionB;

    setTs500Uyari("");
    setTs500Sonuc({
      fck: fckDegeri,
      partyMean,
      groupMeans,
      minGroupMean,
      criterionA,
      criterionB,
      accepted,
      grupSayisi: groups.length,
      numuneSayisi: allValues.length
    });
  };

  const numuneDegistir = (id, alan, deger) => {
    const yeni = numuneler.map(n => 
      n.id === id ? { ...n, [alan]: deger } : n
    );
    setNumuneler(yeni);
  };

  const numuneEkle = () => {
    const yeniId = numuneler.length + 1;
    setNumuneler([...numuneler, { id: yeniId, gun7: "", gun28: "", durum: "" }]);
  };

  const numuneSil = (id) => {
    if (numuneler.length > 1) {
      setNumuneler(numuneler.filter(n => n.id !== id));
    }
  };

  const excelOlustur = () => {
    if (!recete) {
      alert("Önce reçete seçiniz!");
      return;
    }

    const raporData = [
      ["BETONIQ - KALİTE KONTROL RAPORU"],
      [],
      ["Beton Sınıfı", recete.betonSinifi],
      ["Numune Tipi", numuneTipi === "silindir" ? "Silindir (Ø150x300mm)" : "Küp (150x150x150mm)"],
      ["Karakteristik Dayanım (fck)", `${seciliFck} MPa`],
      ["Ortalama Dayanım (fcm)", `${seciliFcm} MPa`],
      ["Tarih", new Date().toLocaleDateString('tr-TR')],
      ["Tedarikçi Beton Firması", tedarikci.unvan || "-"],
      ["Yetkili / Kaşe-İmza", tedarikci.yetkili || "-"],
      ["Satın Alan Firma / Şahıs", musteri.unvan || "-"],
      ["Yetkili / Kaşe-İmza", musteri.yetkili || "-"],
      [],
      ["TS 500 Uygunluk"],
      ts500Sonuc ? ["Grup Sayısı", ts500Sonuc.grupSayisi] : ["Grup Sayısı", "-"],
      ts500Sonuc ? ["Numune Sayısı", ts500Sonuc.numuneSayisi] : ["Numune Sayısı", "-"],
      ts500Sonuc ? ["fck (MPa)", ts500Sonuc.fck] : ["fck (MPa)", "-"],
      ts500Sonuc ? ["Parti Ortalaması", ts500Sonuc.partyMean.toFixed(2)] : ["Parti Ortalaması", "-"],
      ts500Sonuc ? ["En Küçük Grup Ortalaması", ts500Sonuc.minGroupMean.toFixed(2)] : ["En Küçük Grup Ortalaması", "-"],
      ts500Sonuc ? ["Kriter A (fcm ≥ fck+1)", ts500Sonuc.criterionA ? "Sağlandı" : "Sağlanmadı"] : ["Kriter A (fcm ≥ fck+1)", "-"],
      ts500Sonuc ? ["Kriter B (fcmin ≥ fck-3)", ts500Sonuc.criterionB ? "Sağlandı" : "Sağlanmadı"] : ["Kriter B (fcmin ≥ fck-3)", "-"],
      ts500Sonuc ? ["Genel Sonuç", ts500Sonuc.accepted ? "✅ UYGUN" : "❌ UYGUN DEĞİL"] : ["Genel Sonuç", "-"],
      [],
      ["NUMUNE SONUÇLARI"],
      ["Numune No", "7 Gün (MPa)", "28 Gün (MPa)", "Durum"],
    ];

    numuneler.forEach((n, index) => {
      raporData.push([
        index + 1,
        n.gun7 || "-",
        n.gun28 || "-",
        n.durum || "-"
      ]);
    });

    raporData.push([]);
    raporData.push(["ORTALAMA DEĞERLER"]);
    raporData.push(["7 Gün Ortalama", `${ortalama7.toFixed(2)} MPa`]);
    raporData.push(["28 Gün Ortalama", `${ortalama28.toFixed(2)} MPa`]);
    raporData.push([]);
    raporData.push(["SONUÇ", sonuc]);

    const ws = XLSX.utils.aoa_to_sheet(raporData);
    ws['!cols'] = [
      { wch: 25 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kalite Kontrol");

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `Betoniq_Kalite_Kontrol_${recete.betonSinifi}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (!recete) {
    return (
      <p style={{ color: "#999" }}>
        Kalite kontrol için önce reçete seçiniz...
      </p>
    );
  }

  return (
    <div>
      <h3>🔬 Laboratuvar - Kalite Kontrol (TS EN 206)</h3>
      <div style={{ background: "#e3f2fd", padding: 15, borderRadius: 8 }}>
        <div style={{ 
          background: "white", 
          padding: 15, 
          borderRadius: 8,
          marginBottom: 15
        }}>
          <h4 style={{ margin: "0 0 10px 0" }}>Beton Bilgileri</h4>
          <p><strong>Sınıf:</strong> {recete.betonSinifi}</p>
          <div style={{ marginBottom: 10 }}>
            <strong>Numune Tipi:</strong>
            <select 
              value={numuneTipi} 
              onChange={(e) => setNumuneTipi(e.target.value)}
              style={{ 
                marginLeft: "10px", 
                padding: "5px 10px", 
                borderRadius: "4px", 
                border: "1px solid #3498db",
                fontSize: "14px"
              }}
            >
              <option value="silindir">🔹 Silindir (Ø150x300mm)</option>
              <option value="kup">🔸 Küp (150x150x150mm)</option>
            </select>
          </div>
          <p><strong>fck:</strong> {seciliFck} MPa (Karakteristik dayanım)</p>
          <p><strong>fcm:</strong> {seciliFcm} MPa (Ortalama dayanım = fck + 2.1)</p>
          <p><strong>Kabul Kriteri:</strong> Ortalama ≥ fcm = {seciliFcm} MPa</p>
        </div>

        <div style={{
          background: "white",
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
          border: "1px solid #cfd8dc"
        }}>
          <h4 style={{ marginTop: 0 }}>Taraf Bilgileri ve Kaşe/İmza</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            <div>
              <label style={{ fontWeight: "bold" }}>Tedarikçi Beton Firması</label>
              <input
                style={{ width: "100%", padding: 8, marginTop: 4, border: "1px solid #ccc", borderRadius: 4 }}
                value={tedarikci.unvan}
                onChange={(e) => setTedarikci(prev => ({ ...prev, unvan: e.target.value }))}
                placeholder="Firma/Şahıs adı"
              />
              <input
                style={{ width: "100%", padding: 8, marginTop: 6, border: "1px solid #ccc", borderRadius: 4 }}
                value={tedarikci.yetkili}
                onChange={(e) => setTedarikci(prev => ({ ...prev, yetkili: e.target.value }))}
                placeholder="Yetkili isim / Kaşe-İmza"
              />
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Satın Alan Firma / Şahıs</label>
              <input
                style={{ width: "100%", padding: 8, marginTop: 4, border: "1px solid #ccc", borderRadius: 4 }}
                value={musteri.unvan}
                onChange={(e) => setMusteri(prev => ({ ...prev, unvan: e.target.value }))}
                placeholder="Firma/Şahıs adı"
              />
              <input
                style={{ width: "100%", padding: 8, marginTop: 6, border: "1px solid #ccc", borderRadius: 4 }}
                value={musteri.yetkili}
                onChange={(e) => setMusteri(prev => ({ ...prev, yetkili: e.target.value }))}
                placeholder="Yetkili isim / Kaşe-İmza"
              />
            </div>
          </div>
        </div>

        <h4>Numune Dayanım Sonuçları</h4>
        <table border="1" style={{ 
          width: "100%", 
          borderCollapse: "collapse", 
          textAlign: "center",
          background: "white"
        }}>
          <thead>
            <tr style={{ background: "#1976d2", color: "white" }}>
              <th style={{ padding: 10 }}>Numune No</th>
              <th>7 Gün (MPa)</th>
              <th>28 Gün (MPa)</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {numuneler.map((n, index) => (
              <tr key={n.id}>
                <td style={{ padding: 8, fontWeight: "bold" }}>{index + 1}</td>
                <td>
                  <input
                    type="number"
                    step="0.1"
                    value={n.gun7}
                    onChange={(e) => numuneDegistir(n.id, "gun7", e.target.value)}
                    style={{ 
                      width: "80px", 
                      padding: 5, 
                      textAlign: "center",
                      border: "1px solid #ddd"
                    }}
                    placeholder="Gir"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.1"
                    value={n.gun28}
                    onChange={(e) => numuneDegistir(n.id, "gun28", e.target.value)}
                    style={{ 
                      width: "80px", 
                      padding: 5, 
                      textAlign: "center",
                      border: "1px solid #ddd"
                    }}
                    placeholder="Gir"
                  />
                </td>
                <td style={{ fontWeight: "bold" }}>{n.durum}</td>
                <td>
                  <button
                    onClick={() => numuneSil(n.id)}
                    style={{
                      padding: "5px 10px",
                      background: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer"
                    }}
                  >
                    🗑️ Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TS 500 Uygunluk Değerlendirmesi */}
        <div style={{
          marginTop: 15,
          padding: 15,
          background: "white",
          borderRadius: 8,
          border: "1px solid #cfd8dc"
        }}>
          <h4 style={{ marginTop: 0 }}>TS 500 Uygunluk (9 numune / 3 grup)</h4>
          {ts500Uyari && (
            <div style={{
              background: "#fff3e0",
              border: "1px solid #ffb74d",
              color: "#e65100",
              padding: "10px 12px",
              borderRadius: 6,
              marginBottom: 10
            }}>
              {ts500Uyari}
            </div>
          )}

          {ts500Sonuc && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              <div><strong>Grup Sayısı:</strong> {ts500Sonuc.grupSayisi}</div>
              <div><strong>Numune Sayısı:</strong> {ts500Sonuc.numuneSayisi}</div>
              <div><strong>fck (MPa):</strong> {ts500Sonuc.fck}</div>
              <div><strong>Parti Ortalaması:</strong> {ts500Sonuc.partyMean.toFixed(2)}</div>
              <div><strong>En Küçük Grup Ortalaması:</strong> {ts500Sonuc.minGroupMean.toFixed(2)}</div>
              <div><strong>Kriter A (fcm ≥ fck+1):</strong> {ts500Sonuc.criterionA ? "✅" : "❌"}</div>
              <div><strong>Kriter B (fcmin ≥ fck-3):</strong> {ts500Sonuc.criterionB ? "✅" : "❌"}</div>
              <div style={{ fontWeight: "bold", color: ts500Sonuc.accepted ? "#2e7d32" : "#c62828" }}>
                Genel Sonuç: {ts500Sonuc.accepted ? "✅ BETON UYGUN" : "❌ BETON UYGUN DEĞİL"}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
          <button
            onClick={numuneEkle}
            style={{
              padding: "10px 20px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ➕ Numune Ekle
          </button>

          <button
            onClick={hesapla}
            style={{
              padding: "10px 20px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            📊 Hesapla ve Değerlendir
          </button>

          <button
            onClick={excelOlustur}
            style={{
              padding: "10px 20px",
              background: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            📄 Rapor Al (Excel)
          </button>
        </div>

        {/* Sonuçlar */}
        {sonuc && (
          <div style={{ 
            marginTop: 20, 
            padding: 15, 
            background: sonuc.includes("✅") ? "#e8f5e9" : 
                       sonuc.includes("⚠️") ? "#fff3e0" : "#ffebee",
            borderRadius: 8,
            border: `2px solid ${sonuc.includes("✅") ? "#4caf50" : 
                                 sonuc.includes("⚠️") ? "#ff9800" : "#f44336"}`
          }}>
            <h4>📊 Değerlendirme Sonuçları</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                    7 Gün Ortalama:
                  </td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
                    {ortalama7.toFixed(2)} MPa
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                    28 Gün Ortalama:
                  </td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd", fontWeight: "bold" }}>
                    {ortalama28.toFixed(2)} MPa
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                    Hedef (fck):
                  </td>
                  <td style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
                    {seciliFck} MPa
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 8, fontWeight: "bold" }}>
                    Durum:
                  </td>
                  <td style={{ 
                    padding: 8, 
                    fontWeight: "bold",
                    fontSize: "1.1em"
                  }}>
                    {sonuc}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
