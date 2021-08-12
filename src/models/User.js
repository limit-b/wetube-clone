import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    socialLoginOnly: { type: Boolean, default: false },
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    userID: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    country: String,
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
