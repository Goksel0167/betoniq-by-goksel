import React, { useState } from "react";
import Recete from "./components/Recete";
import BirimMaliyet from "./components/BirimMaliyet";
import SatisTeklif from "./components/SatisTeklif";

function App() {
  const [birimMaliyet, setBirimMaliyet] = useState(0);
  const [recete, setRecete] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>BETONIQ</h1>

      <Recete onReceteHazir={setRecete} />

      <hr />

      <BirimMaliyet onMaliyetHesapla={setBirimMaliyet} />

      <hr />

      {recete ? (
        <SatisTeklif birimMaliyet={birimMaliyet} />
      ) : (
        <p style={{ color: "red" }}>⚠ Reçete seçilmedi.</p>
      )}
    </div>
  );
}

export default App;
