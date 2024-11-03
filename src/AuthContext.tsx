import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// สร้าง Context
const AuthContext = createContext<any>(null);

// สร้าง Provider สำหรับ Context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username,
        password,
      });
      console.log("Login Response:", response.data); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูล
      if (response.data.user) {
        setUser(response.data.user); // สมมุติว่า API ส่งกลับข้อมูลผู้ใช้
        localStorage.setItem("token", response.data.token); // เก็บ JWT ลงใน localStorage
    } 
  } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // ลบ JWT จาก localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook เพื่อใช้ Context
export const useAuth = () => {
  return useContext(AuthContext);
};
