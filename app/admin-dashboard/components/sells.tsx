'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface SellItem {
  _id: string;
  items: string;  // Assume a single item name, not an array
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  dateOfSell: string; // Store date as a string to avoid parsing issues
}

export default function SaleLevels() {
  const [sales, setSales] = useState<SellItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await axios.get('/api/sales');
        console.log("Fetched Sales Data:", data);
        
        if (data.success) {
          setSales(data.sales);
        } else {
          alert("Failed to fetch sales data");
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
        alert('Failed to fetch sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
      {sales.length === 0 ? (
        <p>No sales recorded</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-2">Items Sold</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Price per Unit</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-200">
                <td className="border p-2">{sale.items}</td>
                <td className="border p-2">{sale.quantity}</td>
                <td className="border p-2">{sale.unit}</td>
                <td className="border p-2">
                  ${sale.pricePerUnit ? sale.pricePerUnit.toFixed(2) : "0.00"}
                </td>
                <td className="border p-2">
                  ${sale.totalPrice ? sale.totalPrice.toFixed(2) : "0.00"}
                </td>
                <td className="border p-2">
                  {sale.dateOfSell ? new Date(sale.dateOfSell).toLocaleDateString() : "Invalid Date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
