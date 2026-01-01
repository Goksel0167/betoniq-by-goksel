import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function SatisTeklif({ birimMaliyet, recete }) {
  const [kar, setKar] = useState("");
  const [iskonto, setIskonto] = useState("");
  const [hataMesaji, setHataMesaji] = useState("");
  const [kayitMesaji, setKayitMesaji] = useState("");
  const [kayitliTeklifler, setKayitliTeklifler] = useState([]);
  const [manuelBirimFiyat, setManuelBirimFiyat] = useState("");

  const STORAGE_KEY = "betoniq_teklif_kayitlari_v1";

  // Teklif formu verileri
  const [form, setForm] = useState({
    firmaAdi: "",
    projeAdi: "",
    adres: "",
    il: "",
    ilce: "",
    vergiDairesi: "",
    vergiNo: "",
    yetkili: "",
    telefon: "",
    email: "",
    teklifNo: "",
    tarih: "",
    gecerlilikGun: "",
    odeme: "",
    vadeGun: "",
    teslimSure: "",
    kdv: "",
    miktar: "",
    nakliyeKm: "",
    nakliyeBirim: "",
    pompa: "",
    notlar: ""
  });

  // Kayıtları yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setKayitliTeklifler(parsed);
      }
    } catch (err) {
      console.error("Kayit okunamadi", err);
    }
  }, []);

  const persistTeklifler = (list) => {
    setKayitliTeklifler(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Kayit yazilamadi", err);
    }
  };

  const updateForm = (alan, deger) => {
    setForm((prev) => ({ ...prev, [alan]: deger }));
  };

  const parseLocalizedNumber = (value) => {
    if (value === undefined || value === null) return null;
    const str = String(value).trim();
    if (str === "") return null;
    const num = Number(str.replace(",", "."));
    return Number.isFinite(num) ? num : null;
  };

  // HESAPLAMALAR (Anlık yapılır)
  // Eğer maliyet 0 gelirse veya yoksa güvenli davran
  const hamMaliyet = Number(birimMaliyet) || 0;
  const karOrani = Number(kar) || 0;
  const iskontoOrani = Number(iskonto) || 0;
  const karliFiyat = hamMaliyet * (1 + karOrani / 100);
  const netFiyatOtomatik = karliFiyat * (1 - iskontoOrani / 100);
  const manuelNet = parseLocalizedNumber(manuelBirimFiyat);
  const gecerliNetFiyat = manuelNet !== null ? manuelNet : netFiyatOtomatik;

  const handleKarChange = (value) => {
    const numValue = Number(value);
    if (numValue < 0) {
      setHataMesaji("⚠️ Kâr oranı negatif olamaz!");
      return;
    }
    if (numValue > 200) {
      setHataMesaji("⚠️ Kâr oranı çok yüksek! (%200'den fazla)");
      return;
    }
    setHataMesaji("");
    setKar(numValue);
  };

  const handleIskontoChange = (value) => {
    const numValue = Number(value);
    if (numValue < 0) {
      setHataMesaji("⚠️ İskonto negatif olamaz!");
      return;
    }
    if (numValue > 100) {
      setHataMesaji("⚠️ İskonto %100'den fazla olamaz!");
      return;
    }
    setHataMesaji("");
    setIskonto(numValue);
  };

  const bugunISO = () => new Date().toISOString().split("T")[0];

  const olusturTeklifNo = (kaynakNo) => {
    if (String(kaynakNo || form.teklifNo || "").trim()) return String(kaynakNo || form.teklifNo).trim();
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    return `T-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  };

  const guvenliTarih = (value) => {
    const d = value ? new Date(value) : new Date();
    return Number.isNaN(d.getTime()) ? new Date() : d;
  };

  const odemeMetni = (offer) => {
    const odeme = (offer?.odeme || form.odeme || "").trim();
    const vadeGun = offer?.vadeGun ?? form.vadeGun;
    if (odeme.toLowerCase() === "vade" && vadeGun) return `Vade (${vadeGun} gün)`;
    return odeme || "-";
  };

  const teslimMetni = (offer) => {
    const tsKaynak = offer?.teslimSure ?? form.teslimSure;
    const ts = (tsKaynak || "").toString().trim();
    if (!ts) return "-";
    const num = Number(ts);
    if (!Number.isNaN(num) && ts !== "") return `${num} gün`;
    return ts;
  };

  const teklifObjesiOlustur = (kaynakForm = form) => {
    const teklifNo = olusturTeklifNo(kaynakForm.teklifNo);
    const tarih = kaynakForm.tarih || bugunISO();
    const netKaynak = parseLocalizedNumber(kaynakForm.netFiyat);
    const net = netKaynak !== null ? netKaynak : gecerliNetFiyat;
    const karli = Number.isFinite(kaynakForm.karliFiyat) ? Number(kaynakForm.karliFiyat) : karliFiyat;
    return {
      ...kaynakForm,
      teklifNo,
      tarih,
      betonSinifi: kaynakForm.betonSinifi || recete.betonSinifi || "",
      fck: kaynakForm.fck ?? recete.fck ?? "",
      fcm: kaynakForm.fcm ?? recete.fcm ?? "",
      hamMaliyet,
      karliFiyat: karli,
      netFiyat: net,
      karOrani,
      iskontoOrani,
      miktar: Number(kaynakForm.miktar) || 0
    };
  };

  const teklifKaydet = () => {
    const yeniTeklif = teklifObjesiOlustur({ ...form, netFiyat: gecerliNetFiyat });
    const guncelListe = [yeniTeklif, ...kayitliTeklifler.filter((t) => t.teklifNo !== yeniTeklif.teklifNo)];
    persistTeklifler(guncelListe);
    setForm((prev) => ({ ...prev, teklifNo: yeniTeklif.teklifNo, tarih: yeniTeklif.tarih }));
    setKayitMesaji(`Teklif kaydedildi (#${yeniTeklif.teklifNo})`);
    setTimeout(() => setKayitMesaji(""), 3000);
  };

  const teklifYukle = (teklif) => {
    setForm({
      ...form,
      ...teklif
    });
    setKar(teklif.karOrani ?? kar);
    setIskonto(teklif.iskontoOrani ?? iskonto);
    setManuelBirimFiyat(teklif.netFiyat !== undefined ? String(teklif.netFiyat).replace(".", ",") : "");
  };

  const pdfOlustur = (teklifFromList) => {
    const doc = new jsPDF();

    const teklif = teklifFromList ? teklifObjesiOlustur(teklifFromList) : teklifObjesiOlustur();

    // Yardımcı: boş değerleri tire yap, Türkçe karakterler için standart font
    const t = (v) => (v && String(v).trim().length ? String(v).trim() : "-");

    const betonSinifi = teklif.betonSinifi || recete.betonSinifi || "";
    const tarihStr = guvenliTarih(teklif.tarih).toLocaleDateString("tr-TR");
    const miktarDegeri = Number(teklif.miktar) || 0;
    const netFiyatDegeri = Number(teklif.netFiyat) || 0;
    const toplamTutar = (netFiyatDegeri * miktarDegeri).toFixed(2);

    // Başlık
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("HAZIR BETON FIYAT TEKLIF FORMU", 105, 16, { align: "center" });

    // Firma / Müşteri bilgileri
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Firma / Şantiye: ${t(teklif.firmaAdi)}`, 20, 30);
    doc.text(`Proje: ${t(teklif.projeAdi)}`, 20, 38);
    doc.text(`Adres: ${t(teklif.adres)}`, 20, 46);
    doc.text(`İl/İlçe: ${t(teklif.il)} / ${t(teklif.ilce)}`, 20, 54);
    doc.text(`Vergi Dairesi-No: ${t(teklif.vergiDairesi)} - ${t(teklif.vergiNo)}`, 20, 62);
    doc.text(`Yetkili: ${t(teklif.yetkili)}   Tel: ${t(teklif.telefon)}   E-Posta: ${t(teklif.email)}`, 20, 70);

    // Teklif kimliği
    doc.text(`Teklif No: ${t(teklif.teklifNo)}`, 150, 30);
    doc.text(`Tarih: ${tarihStr}`, 150, 38);
    doc.text(`Geçerlilik: ${t(teklif.gecerlilikGun)} gün`, 150, 46);

    // Çizgiler
    doc.line(20, 76, 190, 76);

    // Ürün tablosu
    const startY = 84;
    doc.setFont("helvetica", "bold");
    doc.text("Beton Bilgileri", 20, startY);
    doc.setFont("helvetica", "normal");

    const rowY = startY + 8;
    doc.text(`Beton Sınıfı: ${betonSinifi}`, 20, rowY);
    doc.text(`Miktar: ${t(teklif.miktar)} m³`, 100, rowY);
    doc.text(`Birim Fiyat: ${netFiyatDegeri.toFixed(2)} TL/m³`, 20, rowY + 8);
    doc.text(`Toplam: ${toplamTutar} TL`, 100, rowY + 8);
    doc.text(`KDV Durumu: ${t(teklif.kdv)}`, 20, rowY + 16);

    // Hizmetler
    const hizY = rowY + 28;
    doc.setFont("helvetica", "bold");
    doc.text("Hizmetler", 20, hizY);
    doc.setFont("helvetica", "normal");
    doc.text(`Pompa: ${t(teklif.pompa)} TL`, 20, hizY + 16);

    // Koşullar
    const kosulY = hizY + 26;
    doc.setFont("helvetica", "bold");
    doc.text("Teklif Koşulları", 20, kosulY);
    doc.setFont("helvetica", "normal");
    doc.text(`Teslim Süresi: ${teslimMetni(teklif)}`, 20, kosulY + 8);
    doc.text(`Ödeme Şartı: ${odemeMetni(teklif)}`, 20, kosulY + 16);
    doc.text(`Teklif Geçerliliği: ${t(teklif.gecerlilikGun)} gün`, 20, kosulY + 24);

    // Notlar
    const notY = kosulY + 36;
    doc.setFont("helvetica", "bold");
    doc.text("Notlar / Özel Hükümler", 20, notY);
    doc.setFont("helvetica", "normal");
    doc.text(t(teklif.notlar), 20, notY + 8, { maxWidth: 170 });

    // Alt bilgi
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "bold");
    doc.text("Bu teklif BETONIQ sistemi tarafından otomatik oluşturulmuştur.", 105, 284, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text("TS EN 206 ve TSE 13515 standartlarına uygundur. İçerik telif hakları saklıdır, izinsiz çoğaltılamaz.", 105, 291, { align: "center", maxWidth: 180 });

    doc.save(`Betoniq_Teklif_${betonSinifi || ""}_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const excelOlustur = (teklifFromList) => {
    const teklif = teklifFromList ? teklifObjesiOlustur(teklifFromList) : teklifObjesiOlustur();
    // Excel için veri hazırla
    const teklifData = [
      ["HAZIR BETON FİYAT TEKLİF FORMU"],
      [],
      ["Tarih", guvenliTarih(teklif.tarih).toLocaleDateString('tr-TR')],
      ["Teklif No", teklif.teklifNo],
      ["Firma / Şantiye", teklif.firmaAdi],
      ["Proje", teklif.projeAdi],
      ["Adres", teklif.adres],
      ["İl/İlçe", `${teklif.il} / ${teklif.ilce}`],
      ["Vergi Dairesi-No", `${teklif.vergiDairesi} - ${teklif.vergiNo}`],
      ["Yetkili", teklif.yetkili],
      ["Telefon", teklif.telefon],
      ["E-Posta", teklif.email],
      [],
      ["Beton Sınıfı", teklif.betonSinifi],
      ["Miktar", `${teklif.miktar} m³`],
      ["Birim Fiyat", `${(Number(teklif.netFiyat) || 0).toFixed(2)} TL/m³`],
      ["Toplam Tutar", `${((Number(teklif.netFiyat) || 0) * (Number(teklif.miktar) || 0)).toFixed(2)} TL`],
      ["KDV Durumu", teklif.kdv],
      ["Dayanım (Fck)", `${teklif.fck} MPa`],
      ["Dayanım (Fcm)", `${teklif.fcm} MPa`],
      [],
      ["Hizmetler"],
      ["Pompa", `${teklif.pompa} TL`],
      [],
      ["Koşullar"],
      ["Teslim Süresi", teslimMetni(teklif)],
      ["Ödeme Şartı", odemeMetni(teklif)],
      ["Geçerlilik", `${teklif.gecerlilikGun} gün`],
      [],
      ["Notlar", teklif.notlar],
      [],
      ["Bu teklif BETONIQ sistemi tarafından oluşturulmuştur."],
      ["TS EN 206 ve TSE 13515 standartlarına uygun olarak hazırlanmıştır."]
    ];

    // Worksheet oluştur
    const ws = XLSX.utils.aoa_to_sheet(teklifData);
    
    // Sütun genişliklerini ayarla
    ws['!cols'] = [
      { wch: 25 },
      { wch: 25 }
    ];

    // Workbook oluştur
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teklif");

    // Excel dosyasını indir
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `Betoniq_Teklif_${recete.betonSinifi}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div>
      <h3>3. Satış ve Teklif</h3>
      <div style={{ background: "#e8f5e9", padding: 15, borderRadius: 8 }}>
        <p>
          Seçilen Reçete: <strong>{recete.betonSinifi}</strong> <br/>
          Hammadde Maliyeti: <strong>{hamMaliyet.toFixed(2)} TL</strong>
        </p>

        {/* Fiyat parametreleri */}
        <div style={{ display: "flex", gap: "20px", marginBottom: 15, flexWrap: "wrap" }}>
          <div>
            <label>Kâr (%): </label>
            <input 
              type="number" 
              value={kar} 
              onChange={e => handleKarChange(e.target.value)}
              style={{ width: 70 }}
              min="0"
              max="200"
            />
          </div>
          <div>
            <label>İskonto (%): </label>
            <input 
              type="number" 
              value={iskonto} 
              onChange={e => handleIskontoChange(e.target.value)}
              style={{ width: 70 }}
              min="0"
              max="100"
            />
          </div>
        </div>

        {hataMesaji && (
          <div style={{ 
            padding: "10px", 
            background: "#ffebee", 
            color: "#c62828", 
            borderRadius: "5px",
            marginBottom: "10px",
            fontWeight: "bold"
          }}>
            {hataMesaji}
          </div>
        )}

        {/* Teklif formu */}
        <div style={{
          background: "white",
          borderRadius: 8,
          padding: 15,
          border: "2px solid #2e7d32",
          marginBottom: 15
        }}>
          <h4 style={{ marginTop: 0, color: "#2e7d32" }}>Teklif Bilgileri</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            <div>
              <label>Teklif No</label>
              <input style={{ width: "100%" }} value={form.teklifNo} onChange={(e)=>updateForm("teklifNo", e.target.value)} />
            </div>
            <div>
              <label>Tarih</label>
              <input type="date" style={{ width: "100%" }} value={form.tarih} onChange={(e)=>updateForm("tarih", e.target.value)} />
            </div>
            <div>
              <label>Geçerlilik (gün)</label>
              <input type="number" style={{ width: "100%" }} value={form.gecerlilikGun} onChange={(e)=>updateForm("gecerlilikGun", e.target.value)} />
            </div>
            <div>
              <label>Ödeme Şartı</label>
              <select style={{ width: "100%" }} value={form.odeme} onChange={(e)=>updateForm("odeme", e.target.value)}>
                <option value="">-- Seçiniz --</option>
                <option value="Peşin">Peşin</option>
                <option value="Vade">Vade</option>
              </select>
              {form.odeme === "Vade" && (
                <input
                  type="number"
                  placeholder="Vade süresi (gün)"
                  value={form.vadeGun}
                  onChange={(e)=>updateForm("vadeGun", e.target.value)}
                  style={{ width: "100%", marginTop: 8 }}
                />
              )}
            </div>
            <div>
              <label>Teslim Süresi (gün)</label>
              <input
                type="number"
                placeholder="Gün"
                style={{ width: "100%" }}
                value={form.teslimSure}
                onChange={(e)=>updateForm("teslimSure", e.target.value)}
              />
            </div>
            <div>
              <label>KDV Durumu</label>
              <select style={{ width: "100%" }} value={form.kdv} onChange={(e)=>updateForm("kdv", e.target.value)}>
                <option value="">-- Seçiniz --</option>
                <option value="KDV Hariç">KDV Hariç</option>
                <option value="KDV Dahil">KDV Dahil</option>
              </select>
            </div>
          </div>

          <h4 style={{ marginTop: 20, color: "#2e7d32" }}>Müşteri / Şantiye</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            <div><label>Firma / Şantiye</label><input style={{ width: "100%" }} value={form.firmaAdi} onChange={(e)=>updateForm("firmaAdi", e.target.value)} /></div>
            <div><label>Proje</label><input style={{ width: "100%" }} value={form.projeAdi} onChange={(e)=>updateForm("projeAdi", e.target.value)} /></div>
            <div><label>Adres</label><input style={{ width: "100%" }} value={form.adres} onChange={(e)=>updateForm("adres", e.target.value)} /></div>
            <div><label>İl</label><input style={{ width: "100%" }} value={form.il} onChange={(e)=>updateForm("il", e.target.value)} /></div>
            <div><label>İlçe</label><input style={{ width: "100%" }} value={form.ilce} onChange={(e)=>updateForm("ilce", e.target.value)} /></div>
            <div><label>Vergi Dairesi</label><input style={{ width: "100%" }} value={form.vergiDairesi} onChange={(e)=>updateForm("vergiDairesi", e.target.value)} /></div>
            <div><label>Vergi No</label><input style={{ width: "100%" }} value={form.vergiNo} onChange={(e)=>updateForm("vergiNo", e.target.value)} /></div>
            <div><label>Yetkili Kişi</label><input style={{ width: "100%" }} value={form.yetkili} onChange={(e)=>updateForm("yetkili", e.target.value)} /></div>
            <div><label>Telefon</label><input style={{ width: "100%" }} value={form.telefon} onChange={(e)=>updateForm("telefon", e.target.value)} /></div>
            <div><label>E-Posta</label><input style={{ width: "100%" }} value={form.email} onChange={(e)=>updateForm("email", e.target.value)} /></div>
          </div>

          <h4 style={{ marginTop: 20, color: "#2e7d32" }}>Ürün ve Hizmetler</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            <div><label>Beton Sınıfı</label><input disabled style={{ width: "100%", background: "#f5f5f5" }} value={recete.betonSinifi} /></div>
            <div><label>Miktar (m³)</label><input type="number" style={{ width: "100%" }} value={form.miktar} onChange={(e)=>updateForm("miktar", e.target.value)} /></div>
            <div>
              <label>Birim Fiyat (TL/m³)</label>
              <input
                type="text"
                style={{ width: "100%" }}
                value={manuelBirimFiyat !== "" ? manuelBirimFiyat : gecerliNetFiyat.toFixed(2).replace(".", ",")}
                onChange={(e)=>setManuelBirimFiyat(e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div><label>Toplam Tutar (TL)</label><input disabled style={{ width: "100%", background: "#f5f5f5" }} value={(gecerliNetFiyat * (Number(form.miktar)||0)).toFixed(2)} /></div>
            <div><label>Pompa (TL)</label><input type="number" style={{ width: "100%" }} value={form.pompa} onChange={(e)=>updateForm("pompa", e.target.value)} /></div>
          </div>

          <h4 style={{ marginTop: 20, color: "#2e7d32" }}>Notlar / Özel Hükümler</h4>
          <textarea style={{ width: "100%", minHeight: 80 }} value={form.notlar} onChange={(e)=>updateForm("notlar", e.target.value)} />
        </div>

        <div style={{ borderTop: "2px solid #ccc", paddingTop: 10 }}>
          <p>Liste Fiyatı: {karliFiyat.toFixed(2)} TL</p>
          <h2 style={{ color: "green", marginTop: 0 }}>
            NET SATIŞ: {gecerliNetFiyat.toFixed(2)} TL/m³
          </h2>
        </div>

        {kayitMesaji && (
          <div style={{
            background: "#e3f2fd",
            color: "#0d47a1",
            padding: "10px 12px",
            borderRadius: 6,
            margin: "10px 0",
            border: "1px solid #90caf9",
            fontWeight: "bold"
          }}>
            {kayitMesaji}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }} className="button-group">
          <button 
            onClick={teklifKaydet}
            style={{ 
              background: "#ffa000", color: "white", 
              border: "none", padding: "10px 20px", 
              cursor: "pointer", borderRadius: 5, fontSize: "1rem",
              fontWeight: "bold",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#ff8f00"}
            onMouseOut={(e) => e.target.style.background = "#ffa000"}
          >
            💾 Teklifi Kaydet
          </button>

          <button 
            onClick={pdfOlustur}
            style={{ 
              background: "#2e7d32", color: "white", 
              border: "none", padding: "10px 20px", 
              cursor: "pointer", borderRadius: 5, fontSize: "1rem",
              fontWeight: "bold",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#1b5e20"}
            onMouseOut={(e) => e.target.style.background = "#2e7d32"}
          >
            📄 PDF Teklif İndir
          </button>

          <button 
            onClick={excelOlustur}
            style={{ 
              background: "#1976d2", color: "white", 
              border: "none", padding: "10px 20px", 
              cursor: "pointer", borderRadius: 5, fontSize: "1rem",
              fontWeight: "bold",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#1565c0"}
            onMouseOut={(e) => e.target.style.background = "#1976d2"}
          >
            📊 Excel İndir
          </button>
        </div>

        {/* Kayıtlı teklif listesi */}
        <div style={{ marginTop: 25 }}>
          <h4 style={{ color: "#2e7d32", marginBottom: 10 }}>Kayıtlı Teklifler</h4>
          {kayitliTeklifler.length === 0 && (
            <p style={{ color: "#555" }}>Henüz kayıtlı teklif yok. "Teklifi Kaydet" ile kaydedin.</p>
          )}

          {kayitliTeklifler.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                <thead>
                  <tr style={{ background: "#f1f8e9", textAlign: "left" }}>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Teklif No</th>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Tarih</th>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Firma</th>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Proje</th>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Beton</th>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Net Fiyat</th>
                    <th style={{ padding: 8, borderBottom: "1px solid #c8e6c9" }}>Aksiyon</th>
                  </tr>
                </thead>
                <tbody>
                  {kayitliTeklifler.map((t) => (
                    <tr key={t.teklifNo} style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <td style={{ padding: 8, fontWeight: "bold" }}>{t.teklifNo}</td>
                      <td style={{ padding: 8 }}>{guvenliTarih(t.tarih).toLocaleDateString("tr-TR")}</td>
                      <td style={{ padding: 8 }}>{t.firmaAdi}</td>
                      <td style={{ padding: 8 }}>{t.projeAdi}</td>
                      <td style={{ padding: 8 }}>{t.betonSinifi}</td>
                      <td style={{ padding: 8 }}>{(Number(t.netFiyat) || 0).toFixed(2)} TL/m³</td>
                      <td style={{ padding: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button onClick={() => teklifYukle(t)} style={{ padding: "6px 10px", cursor: "pointer" }}>Yükle</button>
                        <button onClick={() => pdfOlustur(t)} style={{ padding: "6px 10px", cursor: "pointer" }}>PDF</button>
                        <button onClick={() => excelOlustur(t)} style={{ padding: "6px 10px", cursor: "pointer" }}>Excel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}