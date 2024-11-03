import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import PriceDisplay from "./PriceDisplay"; // เปลี่ยนชื่อให้ถูกต้อง
import CryptoChart from "./CryptoChart";
import Login from "./Login";
import Signup from "./Signup";
import { AuthProvider, useAuth } from "./AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Content />
      </Router>
    </AuthProvider>
  );
};

// คอมโพเนนต์หลักที่แยก logic ของเนื้อหา
const Content: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div>
      {/* ซ่อน nav ในหน้า /login และ /signup */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <nav>
          <Link to="/price-display">Current Prices</Link>&emsp;
          <Link to="/chart">Price Chart</Link>&emsp;
          <Link to="/login">Sign Out</Link>&emsp;
        </nav>
      )}

      <Routes>
        {/* เมื่อเข้าหน้าแรก / จะนำไปที่ /login หากผู้ใช้ยังไม่ได้ล็อกอิน */}
        <Route path="/" element={user ? <Navigate to="/price-display" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* เส้นทาง Protected สำหรับหน้าที่ต้องการล็อกอิน */}
        <Route path="/price-display" element={<PrivateRoute component={<PriceDisplay />} />} /> {/* เปลี่ยนจาก <price-display /> เป็น <PriceDisplay /> */}
        <Route path="/chart" element={<PrivateRoute component={<CryptoChart />} />} />
      </Routes>
    </div>
  );
};

// คอมโพเนนต์ PrivateRoute สำหรับป้องกันเส้นทางที่ต้องล็อกอิน
const PrivateRoute = ({ component }: { component: JSX.Element }) => {
  const { user } = useAuth();
  return user ? component : <Navigate to="/login" />;
};

export default App;
