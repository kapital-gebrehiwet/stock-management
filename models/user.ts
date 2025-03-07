import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email:String;
  username: string;
  password: string;
  role: 'Admin' | 'User';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Ensure email is required and unique
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
});


export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
