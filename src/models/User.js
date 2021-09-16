import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    socialLoginOnly: { type: Boolean, default: false },
    avatarUrl: String,
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    userID: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    country: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

// bug fix
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
