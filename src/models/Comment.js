import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    commentOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    commentCreatedAt: { type: Date, default: Date.now, required: true },
    contentText: {
        type: String,
        maxLength: 140,
        minLenght: 1,
        required: true,
        trim: true,
    },
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;
