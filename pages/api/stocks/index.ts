import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db';
import Stock from '../../../models/Stock';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const stocks = await Stock.find({});
      res.status(200).json(stocks);
    } catch (error:any) {
      res.status(500).json({ message: 'Failed to fetch stocks', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
