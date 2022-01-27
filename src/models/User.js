import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    socialLoginOnly: { type: Boolean, default: false, required: true },
    avatarUrl: { type: String, trim: true },
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    userID: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    country: { type: String, trim: true },
    userVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    userComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// bug fix
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
