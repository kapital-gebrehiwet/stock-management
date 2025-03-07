'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IFormData {
  name: string;
  quantity: string;
  price: string;
  category: string;
}

const AddStock: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    quantity: '',
    price: '',
    category: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('api/stocks/add', {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });
      alert(response.data.message);
      setFormData({ name: '', quantity: '', price: '', category: '' });
      router.push('/admin/dashboard'); // Redirect to the admin dashboard
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adding stock');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">Add New Stock</h2>
        <div className="mb-4">
          <input 
            type="text"
            name="name"
            placeholder="Stock Name"
            value={formData.name}
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
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
