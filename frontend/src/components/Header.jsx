import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";


export default function Header() {
  const { logout } = useAuth();

  return (
    <div className="header">
      <span>Salão de Beleza</span>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "#968cff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          A
        </div>

        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}
