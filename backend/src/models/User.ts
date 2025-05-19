import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  googleId: string;
  name: string;
  email?: string;
  avatar?: string;
  role?: 'Admin' | 'User';
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  avatar: String,
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
});

export default mongoose.model<IUser>('User', userSchema);