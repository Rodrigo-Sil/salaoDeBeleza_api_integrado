import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  async function login(email, senha) {
    try {
      const response = await loginAdmin(email, senha);

      const admin = {
        email,
      };

      localStorage.setItem("admin", JSON.stringify(admin));
      setUser(admin);

      navigate("/servicos");

      return response.data;
    } catch (error) {
      alert("Email ou senha inválidos");
      console.error(error.response?.data);
    }
  }

  function logout() {
    localStorage.removeItem("admin");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}