import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db'; // Adjust path if necessary
import Sell from '../../../models/sell'; // Adjust path if necessary

interface ISellRequestBody {
  items: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  dateOfSell: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log('API request received:', req.method, req.url); // Log request method and URL

  if (req.method === 'POST') {
    await connectDB();
    console.log('Database connected'); // Log database connection

    const { items, quantity, unit, pricePerUnit, totalPrice, dateOfSell }: ISellRequestBody = req.body;
    console.log('Request body:', req.body); // Log request body

    if (!items || !quantity || !unit || !pricePerUnit || !totalPrice || !dateOfSell) {
      console.log('Validation failed: Missing fields'); // Log validation failure
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      const newSell = new Sell({
        items,
        quantity,
        unit,
        pricePerUnit,
        totalPrice,
        dateOfSell,
      });
      await newSell.save();
      console.log('Sell added successfully:', newSell); // Log successful sell addition
      res.status(201).json({ message: 'Sell added successfully', sell: newSell });
    } catch (error) {
      console.error('Error adding sell:', error); // Log error details
      res.status(500).json({ message: 'Failed to add sell', error: (error as Error).message });
    }
  } else {
    console.log('Method not allowed:', req.method); // Log invalid method
    res.status(405).json({ message: 'Method not allowed' });
  }
}