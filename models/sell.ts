import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISell extends Document {
  items: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  dateOfSell: Date;
}

const SellSchema: Schema = new mongoose.Schema({
  items: {
    type: String,
    required: [true, 'Items are required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true,
  },
  pricePerUnit: {
    type: Number,
    required: [true, 'Price per unit is required'],
    min: [0, 'Price per unit cannot be negative'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative'],
  },
  dateOfSell: {
    type: Date,
    required: [true, 'Date of sell is required'],
    default: Date.now, // Set default to current date
  },
});

const Sell: Model<ISell> = mongoose.models.Sell || mongoose.model<ISell>('Sell', SellSchema);
export default Sell;