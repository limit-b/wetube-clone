import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoUrl: { type: String, required: true },
    title: { type: String, maxLength: 80, required: true, trim: true },
    description: {
        type: String,
        maxLength: 140,
        minLenght: 20,
        required: true,
        trim: true,
    },
    createdAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
});

videoSchema.static('formatHashtags', async function (hashtags) {
    return hashtags
        .split(',')
        .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
