import React, { useState } from "react";
// Gerçek standart verisini içe aktarıyoruz
import { TSE_13515_0315 } from "./tse13515"; 

// Elek çaplarını standart dosyasından alıyoruz (String'den sayıya çevirerek sıralayalım)
const ELEKLER = Object.keys(TSE_13515_0315).map(Number).sort((a, b) => b - a);

function ElekAnalizi({ onDataReady }) {
  const [veriler, setVeriler] = useState({});
  const [uyari, setUyari] = useState("");
  const [basarili, setBasarili] = useState(false);

  const handleChange = (elek, value) => {
    setVeriler({ ...veriler, [elek]: value });
    setBasarili(false); // Veri değişirse onayı sıfırla
  };

  const kontrolEt = () => {
    let hataVar = false;
    let mesaj = "";

    // Her bir elek için kontrol yap
    for (let elek of ELEKLER) {
      const girilenDeger = parseFloat(veriler[elek]);
      
      // Eğer veri girilmemişse atla (veya zorunlu kılabilirsin)
      if (isNaN(girilenDeger)) continue;

      const [min, max] = TSE_13515_0315[elek]; // Standarttan limitleri çek

      if (girilenDeger < min || girilenDeger > max) {
        hataVar = true;
        mesaj = `🔴 HATA: ${elek}mm eleğinde değer ${girilenDeger}%. (Limit: %${min} - %${max})`;
        break; // İlk hatada dur
      }
    }

    if (hataVar) {
      setUyari(mesaj);
      setBasarili(false);
    } else {
      setUyari("🟢 Tebrikler! Karışım TS EN 13515 limitlerine uygun.");
      setBasarili(true);
      if (onDataReady) onDataReady(veriler);
    }
  };

  return (
    <div style={{ marginTop: 20, padding: 20, border: "1px solid #ccc" }}>
      <h3>🧪 Elek Analizi (TS EN 13515)</h3>
      <p><small>Değerlerinizi (%) giriniz:</small></p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="elek-grid">
        {ELEKLER.map(elek => {
          const [min, max] = TSE_13515_0315[elek];
          return (
            <div key={elek} style={{ marginBottom: 5 }}>
              <label style={{ fontSize: "0.9em" }}>
                <b>{elek} mm</b> <span style={{color: "#666"}}>({min}-{max})</span>:
              </label>
              <input
                type="number"
                placeholder="%"
                style={{ width: "60px", marginLeft: 5 }}
                value={veriler[elek] ?? ""}
                onChange={e => handleChange(elek, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <br />
      <button onClick={kontrolEt} style={{ cursor: "pointer", padding: "5px 15px" }}>
        🔍 Standart Kontrolü Yap
      </button>

      <p style={{ fontWeight: "bold", color: basarili ? "green" : "red" }}>
        {uyari}
      </p>
    </div>
  );
}

export default ElekAnalizi;