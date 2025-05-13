import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  googleId: string;
  name: string;
  email?: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  avatar: String,
});

export default mongoose.model<IUser>('User', userSchema);