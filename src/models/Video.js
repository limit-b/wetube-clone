import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoUrl: { type: String, required: true, unique: true, trim: true },
    thumbnailUrl: { type: String, required: true, unique: true, trim: true },
    hashtags: [{ type: String, trim: true }],
    title: { type: String, maxLength: 80, required: true, trim: true },
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    videoCreatedAt: { type: Date, default: Date.now, required: true },
    videoOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: { type: String, maxLength: 140, minLenght: 20, trim: true },
    videoComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

videoSchema.static('formatHashtags', function (hashtags) {
    return hashtags
        .split(/\s*,\s*/)
        .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
