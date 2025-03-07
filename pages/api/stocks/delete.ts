import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db';
import Stock from '../../../models/Stock';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await connectDB();

    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: 'Stock ID is required' });
      return;
    }

    try {
      const deletedStock = await Stock.findByIdAndDelete(id);
      if (!deletedStock) {
        res.status(404).json({ message: 'Stock not found' });
        return;
      }
      res.status(200).json({ message: 'Stock deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting stock', error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
