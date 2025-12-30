import React, { useEffect, useState } from "react";

function BirimMaliyet({ recete, onMaliyetHesapla }) {
  const [toplam, setToplam] = useState(0);

  useEffect(() => {
    if (!recete) return;

    // 🧮 BASİT AMA GERÇEKÇİ MODEL
    const cimento = recete.fck * 8;      // kg
    const agrega = 1800;                  // kg
    const enerji = 60;                    // TL
    const iscilik = 45;                   // TL

    const cimentoTL = cimento * 2.5;
    const agregaTL = agrega * 0.35;

    const toplamMaliyet =
      cimentoTL + agregaTL + enerji + iscilik;

    setToplam(toplamMaliyet);
    onMaliyetHesapla(toplamMaliyet);
  }, [recete, onMaliyetHesapla]);

  if (!recete) return <p>Reçete seçilmedi.</p>;

  return (
    <div>
      <h2>Birim Maliyet</h2>
      <p>Toplam Maliyet (1 m³): <b>{toplam.toFixed(2)} TL</b></p>
    </div>
  );
}

export default BirimMaliyet;
