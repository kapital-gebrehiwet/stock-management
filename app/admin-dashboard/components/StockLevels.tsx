'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface StockItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export default function StockLevels() {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Stock Levels</h2>
      {stocks.length === 0 ? (
        <p>No stock available</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id} className="hover:bg-gray-200">
                <td className="border p-2">{stock.name}</td>
                <td className="border p-2">{stock.quantity}</td>
                <td className="border p-2">${stock.price.toFixed(2)}</td>
                <td className="border p-2">{stock.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
