import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected DB');
const handleError = (error) =>
  console.log(`❌ Error on DB Connection: ${error}`);

db.once('open', handleOpen);
db.on('error', handleError);

// export const videos = [
//   {
//     videoId: 123456,
//     title: 'Video cool',
//     description: 'This is something',
//     views: 10,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: { id: 654321, name: 'limit', email: 'limit@limit@com' },
//   },
//   {
//     videoId: 234567,
//     title: 'Video awesome',
//     description: 'This is something',
//     views: 10,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: { id: 654321, name: 'limit', email: 'limit@limit@com' },
//   },
//   {
//     videoId: 345678,
//     title: 'Video funny',
//     description: 'This is something',
//     views: 10,
//     videoFile:
//       'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
//     creator: { id: 654321, name: 'limit', email: 'limit@limit@com' },
//   },
// ];
