import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectDB from '../../../lib/db';
import User from '../../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  await connectDB();

  const { email,username, password } = req.body;

  if (!email||!username || !password) {
    return res.status(400).json({ message: 'email,Username and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email,username, password: hashedPassword, role: 'User' });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
