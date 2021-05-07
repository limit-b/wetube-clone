import Video from '../models/Video';
import routes from '../routes';

export const homeController = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

export const searchController = (req, res) => {
  const {
    query: { term: searchingFor },
  } = req;
  res.render('search', { pageTitle: 'Search', searchingFor });
};

export const getUploadController = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });

export const postUploadController = async (req, res) => {
  const {
    body: { videoTitle, videoDescription },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title: videoTitle,
    description: videoDescription,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetailController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('video-detail', { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideoController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('edit-video', { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideoController = async (req, res) => {
  const {
    params: { id },
    body: { videoTitle, videoDescription },
  } = req;
  try {
    await Video.findOneAndUpdate(
      { _id: id },
      { title: videoTitle, description: videoDescription }
    );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideoController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
