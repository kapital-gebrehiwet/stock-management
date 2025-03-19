import dotenv from 'dotenv';

dotenv.config();
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    // Connection options without deprecated options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Optional: Adjust as needed
    };

    await mongoose.connect(process.env.MONGODB_URI as string, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;