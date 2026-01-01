import React, { useState, useEffect } from "react";
import Recete from "./components/Recete";
import BirimMaliyet from "./components/BirimMaliyet";
import SatisTeklif from "./components/SatisTeklif";
import ElekAnalizi from "./components/ElekAnalizi";
import GradasyonGrafik from "./components/GradasyonGrafik";
import KaliteKontrol from "./components/KaliteKontrol";
import BetonKaliteDefteri from "./components/BetonKaliteDefteri";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { rol, kullaniciAdi, logout } = useAuth();
  const [birimMaliyet, setBirimMaliyet] = useState(0);
  const [recete, setRecete] = useState(null);
  const [elekData, setElekData] = useState(null);
  const [grafikData, setGrafikData] = useState([]);
  const [aktiveSayfa, setAktiveSayfa] = useState("ana"); // 'ana', 'defter', 'admin'

  // LocalStorage'dan veri yükle
  useEffect(() => {
    const savedRecete = localStorage.getItem('betoniq_recete');
    const savedMaliyet = localStorage.getItem('betoniq_maliyet');
    const savedElekData = localStorage.getItem('betoniq_elekData');
    
    if (savedRecete) setRecete(JSON.parse(savedRecete));
    if (savedMaliyet) setBirimMaliyet(parseFloat(savedMaliyet));
    if (savedElekData) {
      const data = JSON.parse(savedElekData);
      setElekData(data);
      // Grafik datasını hazırla
      const grafik = Object.entries(data).map(([elek, gecen]) => ({
        elek: parseFloat(elek),
        gecen: parseFloat(gecen)
      }));
      setGrafikData(grafik);
    }
  }, []);

  // Verileri localStorage'a kaydet
  useEffect(() => {
    if (recete) localStorage.setItem('betoniq_recete', JSON.stringify(recete));
  }, [recete]);

  useEffect(() => {
    if (birimMaliyet > 0) localStorage.setItem('betoniq_maliyet', birimMaliyet.toString());
  }, [birimMaliyet]);

  useEffect(() => {
    if (elekData) localStorage.setItem('betoniq_elekData', JSON.stringify(elekData));
  }, [elekData]);

  const handleElekDataReady = (data) => {
    setElekData(data);
    // Grafik için data hazırla
    const grafik = Object.entries(data).map(([elek, gecen]) => ({
      elek: parseFloat(elek),
      gecen: parseFloat(gecen)
    }));
    setGrafikData(grafik);
  };
  
  // Giriş yapılmamışsa Login ekranını göster
  if (!rol) {
    return <Login />;
  }

  return (
    <div className="app-container" style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header with user info and logout */}
      <div className="header-section" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "20px",
        padding: "15px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "10px",
        color: "white"
      }}>
        <div>
          <h1 style={{ margin: 0, color: "white" }}>🧱 BETONIQ</h1>
          <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem" }}>Profesyonel Beton Tasarım ve Teklif Sistemi</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            👤 {kullaniciAdi} 
            <span style={{ 
              marginLeft: "10px", 
              padding: "4px 10px", 
              background: "rgba(255,255,255,0.3)", 
              borderRadius: "5px",
              fontSize: "0.85rem"
            }}>
              {rol === "lab" ? "👨‍🔬 Laboratuvar" : rol === "satis" ? "💰 Satış" : "👔 Yönetici"}
            </span>
          </p>
          <button 
            onClick={logout}
            style={{
              marginTop: "10px",
              padding: "8px 20px",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "2px solid white",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#667eea";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.color = "white";
            }}
          >
            🚪 Çıkış Yap
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        marginBottom: "20px",
        borderBottom: "2px solid #e0e0e0",
        paddingBottom: "10px"
      }}>
        <button
          onClick={() => setAktiveSayfa("ana")}
          style={{
            padding: "12px 24px",
            background: aktiveSayfa === "ana" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f5f5f5",
            color: aktiveSayfa === "ana" ? "white" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            transition: "all 0.3s",
            boxShadow: aktiveSayfa === "ana" ? "0 4px 6px rgba(0,0,0,0.1)" : "none"
          }}
        >
          🏠 Ana Sayfa
        </button>
        <button
          onClick={() => setAktiveSayfa("defter")}
          style={{
            padding: "12px 24px",
            background: aktiveSayfa === "defter" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f5f5f5",
            color: aktiveSayfa === "defter" ? "white" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            transition: "all 0.3s",
            boxShadow: aktiveSayfa === "defter" ? "0 4px 6px rgba(0,0,0,0.1)" : "none"
          }}
        >
          📖 Beton Kalite Defteri
        </button>
        <button
          onClick={() => setAktiveSayfa("admin")}
          style={{
            padding: "12px 24px",
            background: aktiveSayfa === "admin" ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f5f5f5",
            color: aktiveSayfa === "admin" ? "white" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            transition: "all 0.3s",
            boxShadow: aktiveSayfa === "admin" ? "0 4px 6px rgba(0,0,0,0.1)" : "none"
          }}
        >
          ⚙️ Admin Paneli
        </button>
      </div>

      {/* Sayfa İçerikleri */}
      {aktiveSayfa === "admin" ? (
        <AdminPanel />
      ) : aktiveSayfa === "defter" ? (
        <BetonKaliteDefteri />
      ) : (
      <>
        {/* 1. ADIM: Reçete Seçimi */}
        <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8, marginBottom: 20 }}>
          <Recete onReceteHazir={setRecete} />
        </div>

        {/* 1.5. ADIM: Elek Analizi ve Gradasyon */}
      <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <ElekAnalizi onDataReady={handleElekDataReady} />
        {grafikData.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h4>📊 Gradasyon Grafiği</h4>
            <GradasyonGrafik data={grafikData} />
          </div>
        )}
      </div>

      {/* 2. ADIM: Maliyet Hesabı (recete buraya gidiyor) */}
      <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <BirimMaliyet recete={recete} onMaliyetHesapla={setBirimMaliyet} />
      </div>

      {/* 2.5 ADIM: Kalite Kontrol - Laboratuvar (Sadece lab ve yönetici için) */}
      {(rol === "lab" || rol === "yonetici") && (
        <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8, marginBottom: 20, background: "#e3f2fd" }}>
          <KaliteKontrol recete={recete} />
        </div>
      )}

        {/* 3. ADIM: Satış ve Teklif (sadece satış ve yönetici) */}
        {(rol === "satis" || rol === "yonetici") && (
          <div style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8, backgroundColor: "#f9f9f9" }}>
            {recete ? (
              <SatisTeklif birimMaliyet={birimMaliyet} recete={recete} />
            ) : (
              <p style={{ color: "red" }}>⚠ Teklif oluşturmak için yukarıdan reçete seçiniz.</p>
            )}
          </div>
        )}
      </>
      )}
    </div>
  );
}

export default App;