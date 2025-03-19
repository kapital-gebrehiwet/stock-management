import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/db'; // Ensure database connection
import User from '../../../models/user';

const secretKey = process.env.WT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    await connectDB();
    
    // Verify the token
    const decoded = jwt.verify(token, secretKey as string) as { id: string }; // Specify the type for decoded token
    const user = await User.findById(decoded.id).select('-password'); // Exclude the password field
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error verifying token or fetching user:', err); 
    res.status(401).json({ message: 'Invalid token' });
  }
}