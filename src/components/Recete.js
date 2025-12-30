import React, { useState, useEffect } from "react";

const BETON_SINIFLARI = {
  "C8/10": { fck: 8, fcm: 10 },
  "C12/15": { fck: 12, fcm: 15 },
  "C16/20": { fck: 16, fcm: 20 },
  "C20/25": { fck: 20, fcm: 25 },
  "C25/30": { fck: 25, fcm: 30 },
  "C30/37": { fck: 30, fcm: 37 },
  "C35/45": { fck: 35, fcm: 45 },
  "C40/50": { fck: 40, fcm: 50 },
  "C50/60": { fck: 50, fcm: 60 }
};

export default function Recete({ onReceteHazir }) {
  const [betonSinifi, setBetonSinifi] = useState("");
  const [fck, setFck] = useState(0);
  const [fcm, setFcm] = useState(0);

  useEffect(() => {
    if (betonSinifi && BETON_SINIFLARI[betonSinifi]) {
      const secim = BETON_SINIFLARI[betonSinifi];
      setFck(secim.fck);
      setFcm(secim.fcm);

      onReceteHazir({
        betonSinifi,
        fck: secim.fck,
        fcm: secim.fcm,
        fck4: (secim.fck * 1.1).toFixed(1)
      });
    }
  }, [betonSinifi]);

  return (
    <div>
      <h2>Reçete Tasarımı</h2>

      <label>Beton Sınıfı (TS EN 206): </label>
      <select
        value={betonSinifi}
        onChange={(e) => setBetonSinifi(e.target.value)}
      >
        <option value="">Seçiniz</option>
        {Object.keys(BETON_SINIFLARI).map(k => (
          <option key={k} value={k}>{k}</option>
        ))}
      </select>

      {betonSinifi && (
        <>
          <p><b>Fck:</b> {fck} MPa</p>
          <p><b>Fcm:</b> {fcm} MPa</p>
          <p><b>Fck₄:</b> {(fck * 1.1).toFixed(1)} MPa</p>
        </>
      )}
    </div>
  );
}
