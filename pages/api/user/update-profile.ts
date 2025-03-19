import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/db';
import User from '../../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    
    await connectDB();

    const { fullName, phoneNumber, address, bio, avatar } = req.body;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        $set: {
          'profile.fullName': fullName,
          'profile.phoneNumber': phoneNumber,
          'profile.address': address,
          'profile.bio': bio,
          'profile.avatar': avatar,
          'profile.lastUpdated': new Date()
        }
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      profile: updatedUser.profile
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 