import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [kullaniciAdi, setKullaniciAdi] = useState("");

  const handleLogin = (rol) => {
    if (!kullaniciAdi.trim()) {
      alert("⚠️ Lütfen kullanıcı adınızı giriniz!");
      return;
    }
    login(rol, kullaniciAdi);
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        maxWidth: "400px",
        width: "90%"
      }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
          🏭 BETONIQ Giriş
        </h2>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            placeholder="Adınızı giriniz"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
              transition: "border 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#555" }}>
            Rol Seçiniz:
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button 
              onClick={() => handleLogin("lab")}
              style={{
                padding: "15px",
                fontSize: "1rem",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => e.target.style.background = "#2980b9"}
              onMouseOut={(e) => e.target.style.background = "#3498db"}
            >
              👨‍🔬 Laboratuvar
            </button>

            <button 
              onClick={() => handleLogin("satis")}
              style={{
                padding: "15px",
                fontSize: "1rem",
                background: "#2ecc71",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => e.target.style.background = "#27ae60"}
              onMouseOut={(e) => e.target.style.background = "#2ecc71"}
            >
              💰 Satış
            </button>

            <button 
              onClick={() => handleLogin("yonetici")}
              style={{
                padding: "15px",
                fontSize: "1rem",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.3s"
              }}
              onMouseOver={(e) => e.target.style.background = "#c0392b"}
              onMouseOut={(e) => e.target.style.background = "#e74c3c"}
            >
              👔 Yönetici
            </button>
          </div>
        </div>

        <p style={{ fontSize: "0.85rem", color: "#7f8c8d", textAlign: "center", marginTop: "20px" }}>
          🔒 Güvenli giriş sistemi
        </p>
      </div>
    </div>
  );
}

export default Login;
