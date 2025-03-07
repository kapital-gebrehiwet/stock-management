import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'yourSuperSecretKey';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized: Missing token' });

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const { username, email } = req.body;

    if (!username || !email) return res.status(400).json({ message: 'Missing required fields' });

    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { username, email },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
