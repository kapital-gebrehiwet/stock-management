'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IFormData {
  items: string; // Comma-separated items
  quantity: string;
  unit: string;
  pricePerUnit: string;
  totalPrice: string;
  dateOfSell: string; // Format: YYYY-MM-DD
}

const AddSell: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    items: '',
    quantity: '',
    unit: '',
    pricePerUnit: '',
    totalPrice: '',
    dateOfSell: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('api/stocks/sell', {
        items: formData.items,// Convert to array
        quantity: Number(formData.quantity),
        unit: formData.unit,
        pricePerUnit: Number(formData.pricePerUnit),
        totalPrice: Number(formData.totalPrice),
        dateOfSell: new Date(formData.dateOfSell).toISOString(), // Format date
      });
      alert(response.data.message);
      setFormData({ items: '', quantity: '', unit: '', pricePerUnit: '', totalPrice: '', dateOfSell: '' });
      router.push('/'); // Redirect to the admin dashboard
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adding sale');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">Add New Sale</h2>
        <div className="mb-4">
          <input 
            type="text"
            name="items"
            placeholder="Items Sold "
            value={formData.items}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="unit"
            placeholder="Unit (e.g. kg, liters)"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="pricePerUnit"
            placeholder="Price per Unit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="totalPrice"
            placeholder="Total Price"
            value={formData.totalPrice}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            name="dateOfSell"
            placeholder="Date of Sale"
            value={formData.dateOfSell}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add sale
        </button>
      </form>
    </div>
  );
};

export default AddSell;