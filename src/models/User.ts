import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true},
    role: { type: String, enum: ['superAdmin', 'admin'], default: 'admin' },
    lastToken: { type: String }
});

export default mongoose.model('User', UserSchema);
