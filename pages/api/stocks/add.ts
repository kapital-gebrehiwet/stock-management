import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db'; // Adjust path if necessary
import Stock from '../../../models/Stock'; // Adjust path if necessary

interface IStockRequestBody {
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log('API request received:', req.method, req.url); // Log request method and URL

  if (req.method === 'POST') {
    await connectDB();
    console.log('Database connected'); // Log database connection

    const { name, quantity, price, category }: IStockRequestBody = req.body;
    console.log('Request body:', req.body); // Log request body

    if (!name || !quantity || !price || !category) {
      console.log('Validation failed: Missing fields'); // Log validation failure
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      const newStock = new Stock({ name, quantity, price, category });
      await newStock.save();
      console.log('Stock added successfully:', newStock); // Log successful stock addition
      res.status(201).json({ message: 'Stock added successfully', stock: newStock });
    } catch (error) {
      console.error('Error adding stock:', error); // Log error details
      res.status(500).json({ message: 'Failed to add stock', error: (error as Error).message });
    }
  } else {
    console.log('Method not allowed:', req.method); // Log invalid method
    res.status(405).json({ message: 'Method not allowed' });
  }
}
