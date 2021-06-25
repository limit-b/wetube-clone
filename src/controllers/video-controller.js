import VideoModel from '../models/Video';

const fakeUser = { username: 'limit', loggedIn: false };

export const homeController = async (req, res) => {
  // VideoModel.find({}, (error, videosDB) => {});
  try {
    const videosDB = await VideoModel.find({});
    return res.render('home', { pageTitle: 'Home', videosDB, fakeUser });
  } catch (error) {
    return res.render('server-error', { error });
  }
};

export const searchController = (req, res) => res.send('search page');

export const getUploadVideoController = (req, res) => {
  return res.render('upload-video', { pageTitle: 'Upload Video' });
};

export const postUploadVideoController = (req, res) => {
  const { title } = req.body;
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
