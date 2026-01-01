import React, { useState, useEffect } from "react";
import { betonKaliteKonular } from "./betonKaliteKonular";

export default function AdminPanel() {
  const [adminSifre, setAdminSifre] = useState("");
  const [girisYapildi, setGirisYapildi] = useState(false);
  const [konular, setKonular] = useState([]);
  const [yeniKonu, setYeniKonu] = useState({
    baslik: "",
    kategori: "",
    icerik: "",
    kaynak: ""
  });

  // LocalStorage'dan özel konuları yükle
  useEffect(() => {
    const kaydedilmisGiris = localStorage.getItem("admin_giris");
    if (kaydedilmisGiris === "true") {
      setGirisYapildi(true);
    }

    const ozelKonular = localStorage.getItem("ozel_konular");
    if (ozelKonular) {
      setKonular(JSON.parse(ozelKonular));
    }
  }, []);

  const adminGiris = () => {
    // Admin şifresi: goksel2026 (değiştirebilirsiniz)
    if (adminSifre === "goksel2026") {
      setGirisYapildi(true);
      localStorage.setItem("admin_giris", "true");
      alert("✅ Admin girişi başarılı!");
    } else {
      alert("❌ Hatalı şifre!");
    }
  };

  const cikisYap = () => {
    setGirisYapildi(false);
    localStorage.removeItem("admin_giris");
    setAdminSifre("");
  };

  const konuKaydet = () => {
    if (!yeniKonu.baslik || !yeniKonu.kategori || !yeniKonu.icerik) {
      alert("⚠️ Lütfen tüm alanları doldurun!");
      return;
    }

    const yeniId = betonKaliteKonular.length + konular.length + 1;
    const eklenecekKonu = {
      id: yeniId,
      ...yeniKonu,
      icerik: `${yeniKonu.icerik}

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 11px; color: #999; text-align: right; margin: 10px 0 0 0;">
        📚 Kaynak: ${yeniKonu.kaynak || "Göksel Çapkın"}
      </p>`
    };

    const guncelKonular = [...konular, eklenecekKonu];
    setKonular(guncelKonular);
    localStorage.setItem("ozel_konular", JSON.stringify(guncelKonular));

    alert("✅ Konu başarıyla kaydedildi!");
    setYeniKonu({ baslik: "", kategori: "", icerik: "", kaynak: "" });
  };

  const konuSil = (id) => {
    if (window.confirm("Bu konuyu silmek istediğinize emin misiniz?")) {
      const guncelKonular = konular.filter(k => k.id !== id);
      setKonular(guncelKonular);
      localStorage.setItem("ozel_konular", JSON.stringify(guncelKonular));
      alert("✅ Konu silindi!");
    }
  };

  const pdfYukle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    alert("📄 PDF yüklendi. İçeriği aşağıdaki alana manuel olarak kopyalayın.");
    // Not: Tarayıcıda PDF okuma için pdf.js kütüphanesi gerekir
    // Şimdilik manuel kopyala-yapıştır ile çalışıyoruz
  };

  const htmlSablonEkle = () => {
    const sablon = `
      <h3>🔍 Ana Başlık</h3>
      
      <h4>1. Alt Başlık</h4>
      <p><strong>Kalın Yazı:</strong></p>
      <ul>
        <li>Madde 1</li>
        <li>Madde 2</li>
      </ul>

      <hr style="margin: 20px 0;">

      <h4>2. Tablo Örneği</h4>
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Sütun 1</th>
            <th style="padding: 10px;">Sütun 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">Veri 1</td>
            <td style="padding: 8px;">Veri 2</td>
          </tr>
        </tbody>
      </table>

      <hr style="margin: 20px 0;">

      <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #4caf50;">
        <strong>✅ ÖNEMLİ NOT:</strong> Dikkat çekmek istediğiniz bilgiler buraya.
      </div>
    `;

    setYeniKonu({ ...yeniKonu, icerik: sablon });
  };

  if (!girisYapildi) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "80vh",
        padding: "20px"
      }}>
        <div style={{ 
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%"
        }}>
          <h2 style={{ textAlign: "center", color: "#667eea", marginBottom: "30px" }}>
            🔐 Admin Girişi
          </h2>
          <input
            type="password"
            placeholder="Admin Şifresi"
            value={adminSifre}
            onChange={(e) => setAdminSifre(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && adminGiris()}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={adminGiris}
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Giriş Yap
          </button>
          <p style={{ 
            textAlign: "center", 
            marginTop: "20px", 
            fontSize: "12px", 
            color: "#999" 
          }}>
            Sadece yöneticiler erişebilir
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
        borderRadius: "12px",
        color: "white",
        marginBottom: "30px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "32px" }}>⚙️ Admin Paneli</h1>
          <p style={{ margin: 0, fontSize: "16px", opacity: 0.9 }}>
            Beton Kalite Defteri İçerik Yönetimi
          </p>
        </div>
        <button
          onClick={cikisYap}
          style={{
            padding: "10px 20px",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid white",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🚪 Çıkış
        </button>
      </div>

      {/* Yeni Konu Ekleme Formu */}
      <div style={{ 
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h2 style={{ marginTop: 0, color: "#333" }}>➕ Yeni Konu Ekle</h2>

        {/* PDF Yükleme */}
        <div style={{ 
          background: "#e3f2fd", 
          padding: "20px", 
          borderRadius: "8px",
          marginBottom: "20px",
          border: "2px dashed #2196F3"
        }}>
          <label style={{ 
            display: "block", 
            marginBottom: "10px", 
            fontWeight: "bold",
            color: "#1976D2"
          }}>
            📄 PDF Dosyası Yükle (Opsiyonel)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={pdfYukle}
            style={{ marginBottom: "10px" }}
          />
          <p style={{ fontSize: "13px", color: "#666", margin: "10px 0 0 0" }}>
            PDF yükledikten sonra içeriği aşağıdaki alana kopyalayın
          </p>
        </div>

        {/* Form Alanları */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Konu Başlığı:
          </label>
          <input
            type="text"
            value={yeniKonu.baslik}
            onChange={(e) => setYeniKonu({ ...yeniKonu, baslik: e.target.value })}
            placeholder="örn: Beton Kürü ve Önemi"
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "15px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Kategori:
          </label>
          <input
            type="text"
            value={yeniKonu.kategori}
            onChange={(e) => setYeniKonu({ ...yeniKonu, kategori: e.target.value })}
            placeholder="örn: Beton Üretimi"
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "15px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Kaynak:
          </label>
          <input
            type="text"
            value={yeniKonu.kaynak}
            onChange={(e) => setYeniKonu({ ...yeniKonu, kaynak: e.target.value })}
            placeholder="örn: Göksel Çapkın / TeknoBeton"
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "15px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            İçerik (HTML):
          </label>
          <button
            onClick={htmlSablonEkle}
            style={{
              padding: "8px 16px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "10px"
            }}
          >
            📋 HTML Şablon Ekle
          </button>
          <textarea
            value={yeniKonu.icerik}
            onChange={(e) => setYeniKonu({ ...yeniKonu, icerik: e.target.value })}
            placeholder="HTML formatında içerik girin..."
            style={{
              width: "100%",
              minHeight: "300px",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "monospace",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          onClick={konuKaydet}
          style={{
            padding: "12px 30px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          💾 Konuyu Kaydet
        </button>
      </div>

      {/* Kaydedilmiş Konular */}
      {konular.length > 0 && (
        <div style={{ 
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>📚 Kaydedilmiş Özel Konular</h2>
          {konular.map((konu) => (
            <div
              key={konu.id}
              style={{
                padding: "15px",
                background: "#f5f5f5",
                borderRadius: "8px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong style={{ fontSize: "16px" }}>{konu.baslik}</strong>
                <br />
                <span style={{ fontSize: "13px", color: "#666" }}>
                  Kategori: {konu.kategori}
                </span>
              </div>
              <button
                onClick={() => konuSil(konu.id)}
                style={{
                  padding: "8px 16px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                🗑️ Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
