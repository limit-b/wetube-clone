export const homeController = (req, res) =>
  res.render('home', { pageTitle: 'Home', potato: 1245 });
export const searchController = (req, res) =>
  res.render('search', { pageTitle: 'Search' });
// export const videosController = (req, res) => res.render('videos');
export const uploadController = (req, res) =>
  res.render('upload', { pageTitle: 'Upload' });
export const videoDetailController = (req, res) =>
  res.render('video-detail', { pageTitle: 'Video Detail' });
export const editVideoController = (req, res) =>
  res.render('edit-video', { pageTitle: 'Edit Video' });
export const deleteVideoController = (req, res) =>
  res.render('delete-video', { pageTitle: 'Delete Video' });
