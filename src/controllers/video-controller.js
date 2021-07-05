import VideoModel from '../models/Video';

const fakeUser = { username: 'limit', loggedIn: false };

export const homeController = async (req, res) => {
  // VideoModel.find({}, (error, videosDB) => {});
  try {
    const videosDB = await VideoModel.find({});
    console.log(videosDB);
    return res.render('home', { pageTitle: 'Home', videosDB, fakeUser });
  } catch (error) {
    return res.render('server-error', { error });
  }
};

export const searchController = (req, res) => res.send('search page');

export const getUploadVideoController = (req, res) => {
  return res.render('upload-video', { pageTitle: 'Upload Video' });
};

export const postUploadVideoController = async (req, res) => {
  const { title, description, hashtags } = req.body;
  // const newVideo = new VideoModel({
  //   title,
  //   description,
  //   createdAt: Date.now(),
  //   hashtags: hashtags.split(',').map((word) => `#${word}`),
  //   meta: { views: 0, rating: 0 },
  // });
  // await newVideo.save();
  await VideoModel.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(',').map((word) => `#${word}`),
    meta: { views: 0, rating: 0 },
  });
  return res.redirect('/');
};

export const watchVideoController = (req, res) => {
  const { id } = req.params;
  return res.render('watch-video', {
    pageTitle: `Watching: `,
  });
};

export const getEditVideoController = (req, res) => {
  const { id } = req.params;
  return res.render('edit-video', {
    pageTitle: `Editing: `,
  });
};

export const postEditVideoController = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  return res.redirect(`/videos/${id}`);
};

export const deleteVideoController = (req, res) => {
  return res.send(`delete video page, #id : ${req.params.id}`);
};
