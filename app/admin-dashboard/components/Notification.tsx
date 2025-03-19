'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface StockItem {
  _id: string;
  name: string;
  quantity: number;
}

export default function Notification() {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const lowStockThreshold = 10;

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await axios.get('/api/stocks');
        setStocks(data);
      } catch {
        // Handle error silently or show a generic error message
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const lowStockItems = stocks.filter((stock) => stock.quantity < lowStockThreshold);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Stock Alerts</h2>
      {lowStockItems.length === 0 ? (
        <p className="text-green-600 text-center">All stocks are sufficient.</p>
      ) : (
        <ul className="list-disc pl-6">
          {lowStockItems.map((stock) => (
            <li key={stock._id} className="text-red-600">
              <span className="font-bold">{stock.name}</span> - Only {stock.quantity} left!
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
