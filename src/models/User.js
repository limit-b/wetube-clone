import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    userID: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    country: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
