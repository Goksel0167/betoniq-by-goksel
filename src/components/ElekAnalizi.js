import React, { useState } from "react";

const ELEKLER = [31.5, 22.4, 19, 16, 11.2, 8, 5.6, 4, 2, 0.5, 0.25, 0.125, 0.063];

// Örnek limitler (ileride standarttan gelecek)
const LIMITLER = {
  min: 5,
  max: 100
};

function ElekAnalizi({ onDataReady }) {
  const [veriler, setVeriler] = useState({});
  const [uyari, setUyari] = useState("");

  const handleChange = (elek, value) => {
    setVeriler({ ...veriler, [elek]: value });
  };

  const kontrolEt = () => {
    const girilenler = Object.entries(veriler)
      .filter(([_, v]) => v !== "" && !isNaN(v));

    if (girilenler.length < 4) {
      setUyari("⚠️ Yetersiz elek verisi, sonuç güvenilir değil.");
      return;
    }

    const limitDisi = girilenler.filter(
      ([_, v]) => v < LIMITLER.min || v > LIMITLER.max
    );

    if (limitDisi.length > 0) {
      setUyari("🔴 Bazı elekler limit dışı!");
    } else {
      setUyari("🟢 Elek analizi limitler içinde.");
      onDataReady && onDataReady(girilenler);
    }
  };

  return (
    <div>
      <h2>Elek Analizi</h2>

      {ELEKLER.map(elek => (
        <div key={elek}>
          <label>{elek} mm geçen (%)</label><br />
          <input
            type="number"
            value={veriler[elek] ?? ""}
            onChange={e => handleChange(elek, e.target.value)}
          />
          <br />
        </div>
      ))}

      <button onClick={kontrolEt}>Kontrol Et</button>

      <p>{uyari}</p>
    </div>
  );
}

export default ElekAnalizi;
