import Header from "../components/Header";
import "../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
