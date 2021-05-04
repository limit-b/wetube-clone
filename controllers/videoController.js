import Video from '../models/Video';
import routes from '../routes';

export const homeController = async (req, res) => {
  try {
    const videos = await Video.find({});
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
  res.render('search', { pageTitle: 'Search', searchingFor, videos });
};

export const getUploadController = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });

export const postUploadController = async (req, res) => {
  const {
    body: { videoTitle, videoDescription },
    file: { path },
  } = req;
  // TODO: Upload Video(비디오 업로드), Save Video(비디오 저장)
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
    res.render('video-detail', { pageTitle: 'Video Detail', video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editVideoController = (req, res) =>
  res.render('edit-video', { pageTitle: 'Edit Video' });

export const deleteVideoController = (req, res) =>
  res.render('delete-video', { pageTitle: 'Delete Video' });
