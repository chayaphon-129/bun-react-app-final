<<<<<<< HEAD
# bun-react-app
=======
# React + TypeScript + Vite

How to use
1. git clone https://github.com/chayaphon-129/bun-react-app.git
2. bun install
3. bun dev
4. open browser http://localhost:3000/


หลักการออกแบบ

1.ไฟล์ App.tsx คือ คอมโพเนนต์หลัก ของแอปพลิเคชันที่เราจะเรนเดอร์ลงใน DOM ผ่าน index.tsx
-ทำหน้าที่ดึงข้อมูลจาก API (ในกรณีนี้คือ CoinDesk API) และแสดงผลข้อมูลในหน้าเว็บ
-ใช้ React Hooks เช่น useEffect (สำหรับการดึงข้อมูลเมื่อคอมโพเนนต์ถูกเรนเดอร์) และ useState (สำหรับการเก็บข้อมูลที่ดึงมาและสถานะการโหลด)
-เป็นศูนย์กลางของส่วนที่ผู้ใช้โต้ตอบ (UI) ในโปรเจค

2.ประกาศ type ของตัวแปร

interface CoindeskData {
  bpi: {
    USD: Bpi;
    GBP: Bpi;
    EUR: Bpi;
  };
}

3.คอมโพเนนต์ App ใช้ useState สองตัวในการจัดการกับ:
ข้อมูล (data) ที่ดึงมาจาก CoinDesk API ซึ่งเริ่มต้นเป็น null
สถานะการโหลด (loading) ที่บอกว่าเรากำลังโหลดข้อมูลจาก API อยู่หรือไม่ โดยเริ่มต้นเป็น true
เมื่อข้อมูลถูกดึงมาจาก API แล้ว เราจะใช้ setData เพื่ออัพเดตข้อมูลใน state และใช้ setLoading เพื่อบอกว่าเราดึงข้อมูลเสร็จแล้ว (เปลี่ยนจาก loading เป็น false)

const App: React.FC = () => {
  const [data, setData] = useState<CoindeskData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
};

4.ฟังก์ชัน fetchData จะดึงข้อมูลราคาปัจจุบันของ Bitcoin จาก https://api.coindesk.com/v1/bpi/currentprice.json CoinDesk API โดยใช้ fetch.
เมื่อได้ข้อมูลแล้วจะอัปเดต state ของ data (ซึ่งเก็บข้อมูล API) และเปลี่ยนสถานะ loading เป็น false เพื่อบอกว่าเสร็จสิ้นแล้ว.

const fetchData = () => {
  fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
};

5.ใช้ useEffect เพื่อเรียกใช้งาน Function fetchData และฟังก์ชั่น interval setให้หน้าเว็บ Refresh เองทุกๆ 3 วินาที

useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // Refresh ทุก 3 วินาที
    return () => clearInterval(interval); // Clear interval เมื่อ component unmount
  }, []);


6.ไฟล์ src/index.tsx ไฟล์นี้เป็นไฟล์ที่ใช้สำหรับ เริ่มต้นแอปพลิเคชัน React และเรนเดอร์แอปลงใน DOM
-ทำหน้าที่เชื่อมโยงระหว่าง React คอมโพเนนต์ (เช่น App) กับ DOM element จริง ๆ ที่เราจะนำไปแสดงผลในเบราว์เซอร์
-ใน React 18 จะใช้ createRoot() แทนการใช้ ReactDOM.render() แบบเวอร์ชันก่อนหน้า

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

7.ไฟล์ public/index.html ไฟล์นี้คือไฟล์ HTML พื้นฐาน ของโปรเจค React ของคุณ
จะเป็นไฟล์ที่เบราว์เซอร์โหลดครั้งแรกเมื่อผู้ใช้เข้าถึงเว็บแอปพลิเคชันของคุณ
มี <div id="root"></div> ที่ทำหน้าที่เป็นจุดที่ React จะแทรกคอนเทนต์จาก App.tsx หรือไฟล์ที่เรา set api ไว้ลงไปแสดง

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bun React App</title>
    <link rel="stylesheet" href="/public/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="/src/index.tsx"></script>
  </body>
</html>

สมาชิก
ชยพล สุวรรณวร 66130918
ตะวัน อันเตปุริก 61130301
กิตติพงศ์ ใจชื้น 66130811

>>>>>>> 79b2564 (CT648)
