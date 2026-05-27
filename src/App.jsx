import { Routes, Route, Link } from "react-router-dom";
import Ledger from "./pages/Ledger";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <nav style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Link to="/">Ledger</Link>
        <Link to="/deposit">Deposit</Link>
        <Link to="/withdraw">Withdraw</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Ledger />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </div>
  );
}
