import React, { useState, useEffect } from "react";

export default function SatisTeklif({ birimMaliyet }) {
  const [kar, setKar] = useState(15);
  const [iskonto, setIskonto] = useState(0);
  const [karlıFiyat, setKarliFiyat] = useState(0);
  const [netFiyat, setNetFiyat] = useState(0);

  useEffect(() => {
    const karli = birimMaliyet * (1 + kar / 100);
    const net = karli * (1 - iskonto / 100);

    setKarliFiyat(karli.toFixed(2));
    setNetFiyat(net.toFixed(2));
  }, [birimMaliyet, kar, iskonto]);

  return (
    <div>
      <h2>Satış & Teklif</h2>

      <p>Birim Maliyet: <b>{birimMaliyet.toFixed(2)} TL/m³</b></p>

      <label>Kâr Oranı (%): </label>
      <input
        type="number"
        value={kar}
        onChange={e => setKar(Number(e.target.value))}
      />

      <br />

      <label>İskonto (%): </label>
      <input
        type="number"
        value={iskonto}
        onChange={e => setIskonto(Number(e.target.value))}
      />

      <p><b>Kârlı Fiyat:</b> {karlıFiyat} TL/m³</p>
      <p><b>Net Satış Fiyatı:</b> {netFiyat} TL/m³</p>

      <button>📄 PDF Teklif Oluştur</button>
    </div>
  );
}
