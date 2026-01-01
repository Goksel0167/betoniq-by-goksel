import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [rol, setRol] = useState(null); // lab | satis | yonetici
  const [kullaniciAdi, setKullaniciAdi] = useState("");

  // LocalStorage'dan oturum bilgisini yükle
  useEffect(() => {
    const savedRol = localStorage.getItem('betoniq_rol');
    const savedKullanici = localStorage.getItem('betoniq_kullanici');
    if (savedRol) setRol(savedRol);
    if (savedKullanici) setKullaniciAdi(savedKullanici);
  }, []);

  const login = (seciliRol, isim = "") => {
    setRol(seciliRol);
    setKullaniciAdi(isim || seciliRol);
    localStorage.setItem('betoniq_rol', seciliRol);
    localStorage.setItem('betoniq_kullanici', isim || seciliRol);
  };

  const logout = () => {
    setRol(null);
    setKullaniciAdi("");
    localStorage.removeItem('betoniq_rol');
    localStorage.removeItem('betoniq_kullanici');
  };

  return (
    <AuthContext.Provider value={{ rol, kullaniciAdi, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
