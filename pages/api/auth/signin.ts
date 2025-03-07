import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/db';
import User from '../../../models/user';

const ADMIN_CREDENTIALS = {
  username: 'mule',
  password: 'seylommule', 
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  await connectDB();

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if admin
    if (username === ADMIN_CREDENTIALS.username) {
      const isMatch = password === ADMIN_CREDENTIALS.password;
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ username, role: 'Admin' }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
      return res.status(200).json({ message: 'Login successful', token, role: 'Admin' });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
