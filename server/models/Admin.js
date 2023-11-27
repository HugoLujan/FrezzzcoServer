import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, minLength: 8},
  createdAt: { type: Date, default: Date.now },
  role: { type: String, required: true }
});

export default mongoose.model('Users', usersSchema);

 