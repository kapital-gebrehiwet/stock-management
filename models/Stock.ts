import mongoose, { Schema, Document, Model } from 'mongoose';

interface IStock extends Document {
  name: string;
  quantity: number;
  price: number;
  category: string;
}

const StockSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Stock name is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
});

const Stock: Model<IStock> = mongoose.models.Stock || mongoose.model<IStock>('Stock', StockSchema);
export default Stock;  