import mongoose from 'mongoose';

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

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
