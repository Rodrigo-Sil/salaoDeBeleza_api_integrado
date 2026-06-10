import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Servicos from "./pages/Servicos";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/servicos"
        element={<PrivateRoute><Servicos /></PrivateRoute>}
      />
    </Routes>
  );
}

export default App;
