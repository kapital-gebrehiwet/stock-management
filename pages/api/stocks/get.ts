import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db';
import Stock from '../../../models/Stock';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    await connectDB();

    try {
      const stocks = await Stock.find({});
      res.status(200).json({ success: true, stocks });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve stocks', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
