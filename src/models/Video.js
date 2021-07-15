import mongoose from 'mongoose';

// export const formatHashtags = (hashtags) =>
//     hashtags
//         .split(',')
//         .map((word) => (word.startsWith('#') ? word : `#${word}`));

const videoSchema = new mongoose.Schema({
    title: { type: String, maxLength: 80, required: true, trim: true },
    description: {
        type: String,
        minLenght: 20,
        maxLength: 140,
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

// /* eslint-disable */
// videoSchema.pre('save', async function () {
//     /* eslint-enable */
//     this.hashtags = this.hashtags[0]
//         .split(',')
//         .map((word) => (word.startsWith('#') ? word : `#${word}`));
// });

/* eslint-disable */
videoSchema.static('formatHashtags', function (hashtags) {
    /* eslint-enable */
    return hashtags
        .split(',')
        .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
