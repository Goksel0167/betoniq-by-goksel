import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  return (
    <div>
      <h2>Kullanıcı Girişi</h2>

      <button onClick={() => login("lab")}>
        👨‍🔬 Laboratuvar
      </button>{" "}

      <button onClick={() => login("satis")}>
        💰 Satış
      </button>{" "}

      <button onClick={() => login("yonetici")}>
        👔 Yönetici
      </button>
    </div>
  );
}

export default Login;
