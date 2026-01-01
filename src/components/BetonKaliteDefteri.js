import React, { useState, useEffect } from "react";
import { betonKaliteKonular } from "./betonKaliteKonular";

export default function BetonKaliteDefteri() {
  const [secilenKonu, setSecilenKonu] = useState(null);
  const [tumKonular, setTumKonular] = useState([]);

  // Hem sabit hem de özel konuları birleştir
  useEffect(() => {
    const ozelKonular = localStorage.getItem("ozel_konular");
    if (ozelKonular) {
      const parsed = JSON.parse(ozelKonular);
      setTumKonular([...betonKaliteKonular, ...parsed]);
    } else {
      setTumKonular(betonKaliteKonular);
    }
  }, []);

  const konular = tumKonular;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
        borderRadius: "12px",
        color: "white",
        marginBottom: "30px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: "0 0 10px 0", fontSize: "32px" }}>📚 Beton Kalite Defteri</h1>
        <p style={{ margin: 0, fontSize: "16px", opacity: 0.9 }}>
          Beton üretimi ve kalite kontrolü için profesyonel rehber
        </p>
      </div>

      {/* Konu Listesi */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px" }}>
        {/* Sol Menü */}
        <div style={{ 
          background: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          height: "fit-content"
        }}>
          <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>📑 Konular</h3>
          {konular.map((konu) => (
            <div
              key={konu.id}
              onClick={() => setSecilenKonu(konu)}
              style={{
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                background: secilenKonu?.id === konu.id ? "#2196F3" : "#f5f5f5",
                color: secilenKonu?.id === konu.id ? "white" : "#333",
                transition: "all 0.3s",
                border: "2px solid transparent",
                borderColor: secilenKonu?.id === konu.id ? "#1976D2" : "transparent"
              }}
              onMouseEnter={(e) => {
                if (secilenKonu?.id !== konu.id) {
                  e.target.style.background = "#e3f2fd";
                }
              }}
              onMouseLeave={(e) => {
                if (secilenKonu?.id !== konu.id) {
                  e.target.style.background = "#f5f5f5";
                }
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>
                {konu.baslik}
              </div>
              <div style={{ 
                fontSize: "12px", 
                opacity: 0.8,
                background: secilenKonu?.id === konu.id ? "rgba(255,255,255,0.2)" : "#e0e0e0",
                padding: "2px 8px",
                borderRadius: "3px",
                display: "inline-block"
              }}>
                {konu.kategori}
              </div>
            </div>
          ))}

          <div style={{ 
            marginTop: "20px",
            padding: "15px",
            background: "#e8f5e9",
            borderRadius: "6px",
            fontSize: "13px"
          }}>
            <strong>💡 İpucu:</strong> Sol menüden bir konu seçerek detaylı bilgilere ulaşabilirsiniz.
          </div>
        </div>

        {/* Sağ İçerik */}
        <div style={{ 
          background: "white",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          minHeight: "500px"
        }}>
          {secilenKonu ? (
            <div>
              <div style={{ 
                background: "#f5f5f5",
                padding: "15px",
                borderRadius: "6px",
                marginBottom: "20px",
                borderLeft: "4px solid #2196F3"
              }}>
                <h2 style={{ margin: "0 0 8px 0", color: "#1976D2" }}>
                  {secilenKonu.baslik}
                </h2>
                <span style={{ 
                  fontSize: "14px",
                  background: "#2196F3",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "4px"
                }}>
                  {secilenKonu.kategori}
                </span>
              </div>

              <div 
                style={{ 
                  lineHeight: "1.8",
                  color: "#333",
                  fontSize: "15px"
                }}
                dangerouslySetInnerHTML={{ __html: secilenKonu.icerik }}
              />
            </div>
          ) : (
            <div style={{ 
              textAlign: "center",
              padding: "100px 20px",
              color: "#999"
            }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>📖</div>
              <h3 style={{ color: "#666" }}>Hoş Geldiniz!</h3>
              <p>Lütfen sol menüden bir konu seçiniz.</p>
            </div>
          )}
        </div>
      </div>

      {/* Alt Bilgi */}
      <div style={{ 
        marginTop: "30px",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          📌 Bu defter sürekli güncellenmektedir. Yeni konular düzenli olarak eklenmektedir.
        </p>
      </div>
    </div>
  );
}
