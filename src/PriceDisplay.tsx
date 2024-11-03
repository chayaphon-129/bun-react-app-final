import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PriceDisplay.css";

interface CryptoData {
  id: string;
  name: string;
  usd_price: number;
  thb_price: number;
  price_change_percentage_24h: number;
}

const COINS = [
  "bitcoin",
  "ethereum",
  "tether",
  "binancecoin",
  "solana",
  "ripple",
  "dogecoin",
  "tron",
  "cardano",
  "chainlink",
  "filecoin",
  "uniswap",
];

const PriceDisplay: React.FC = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const usdResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(",")}&order=market_cap_desc&per_page=12&page=1&sparkline=false`
      );

      if (!usdResponse.ok) {
        throw new Error(`HTTP error! Status: ${usdResponse.status}`);
      }

      const usdData = await usdResponse.json();
      console.log("USD Data:", usdData); // ตรวจสอบข้อมูล USD

      const thbResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=thb&ids=${COINS.join(",")}&order=market_cap_desc&per_page=12&page=1&sparkline=false`
      );

      if (!thbResponse.ok) {
        throw new Error(`HTTP error! Status: ${thbResponse.status}`);
      }

      const thbData = await thbResponse.json();
      console.log("THB Data:", thbData); // ตรวจสอบข้อมูล THB

      const thbDataMap = new Map(thbData.map((coin: any) => [coin.id, coin]));

      const combinedData = usdData.map((usdCoin: any) => {
        const thbCoin = thbDataMap.get(usdCoin.id);
        return {
          id: usdCoin.id,
          name: usdCoin.name,
          usd_price: usdCoin.current_price,
          thb_price: thbCoin ? thbCoin.current_price : 0,
          price_change_percentage_24h: usdCoin.price_change_percentage_24h,
        };
      });

      console.log("Combined Data:", combinedData); // ตรวจสอบข้อมูล Combined Data
      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Unable to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000); // รีเฟรชทุก 30 วินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  /*const handleCryptoClick = (coinId: string) => {
    navigate(`/chart/${coinId}`);
  };*/

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (data.length === 0) {
    return <p className="error-message">No data available. Please check your connection or try again later.</p>;
  }

  return (
    <div className="crypto-row">
      {data.map((coin) => (
        <div
          key={coin.id}
          className="crypto-item"
          onClick={() => handleCryptoClick(coin.id)}
          style={{ cursor: "pointer" }}
        >
          <h2>{coin.name}</h2>
          <p>USD: ${coin.usd_price.toFixed(2)}</p>
          <p>THB: ฿{coin.thb_price.toFixed(2)}</p>
          <p
            className={
              coin.price_change_percentage_24h >= 0
                ? "positive-change"
                : "negative-change"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default PriceDisplay;
