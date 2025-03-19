import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: 'Admin' | 'User';
  profile: {
    fullName: string;
    phoneNumber: string;
    address: string;
    bio: string;
    avatar: string;
    createdAt: Date;
    lastUpdated: Date;
  };
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Ensure email is required and unique
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  profile: {
    fullName: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
  }
});

// Update lastUpdated timestamp before saving
UserSchema.pre('save', function(this: IUser, next) {
  if (this.isModified('profile')) {
    this.profile.lastUpdated = new Date();
  }
  next();
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
