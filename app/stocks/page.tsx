'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface IStock {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('/api/stocks/get');
        setStocks(response.data.stocks);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load stocks');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-5 text-center text-gray-700">Available Stocks</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-4">Name</th>
              <th className="border p-4">Quantity</th>
              <th className="border p-4">Price</th>
              <th className="border p-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id}>
                <td className="border p-4">{stock.name}</td>
                <td className="border p-4">{stock.quantity}</td>
                <td className="border p-4">{stock.price.toFixed(2)} ETB

                </td>
                <td className="border p-4">{stock.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockList;
