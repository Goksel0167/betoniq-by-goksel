import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [rol, setRol] = useState(null); // lab | satis | yonetici

  const login = (seciliRol) => setRol(seciliRol);
  const logout = () => setRol(null);

  return (
    <AuthContext.Provider value={{ rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
