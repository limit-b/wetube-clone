import { videos } from '../db';
import routes from '../routes';

export const homeController = (req, res) =>
  res.render('home', { pageTitle: 'Home', videos });

export const searchController = (req, res) => {
  // 비구조화 할당(구조분해 할당)
  const {
    query: { term: searchingFor },
  } = req;
  // const searchingFor = req.query.term;
  res.render('search', { pageTitle: 'Search', searchingFor, videos });
};

// export const videosController = (req, res) => res.render('videos');

export const getUploadController = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });

export const postUploadController = (req, res) => {
  const {
    body: { videoFile, videoTitle, videoDescription },
  } = req;
  // TODO: Upload Video(비디오 업로드), Save Video(비디오 저장)
  res.redirect(routes.videoDetail(123456));
};

export const videoDetailController = (req, res) =>
  res.render('video-detail', { pageTitle: 'Video Detail' });

export const editVideoController = (req, res) =>
  res.render('edit-video', { pageTitle: 'Edit Video' });

export const deleteVideoController = (req, res) =>
  res.render('delete-video', { pageTitle: 'Delete Video' });
