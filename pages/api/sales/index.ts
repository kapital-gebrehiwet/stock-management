// api/sales/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db';
import Sell from '../../../models/sell';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const sales = await Sell.find({});
      res.status(200).json({ success: true, sales }); // Wrap in an object
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch sales', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}