// Global
const HOME = '/',
  SEARCH = '/search',
  JOIN = '/join',
  LOGIN = '/login',
  LOGOUT = '/logout';

// Users
const USERS = '/users',
  USER_DETAIL = '/:id',
  EDIT_PROFILE = '/edit-profile',
  CHANGE_PASSWORD = '/change-password';

// Videos
const VIDEOS = '/videos',
  UPLOAD = '/upload',
  VIDEO_DETAIL = '/:id',
  EDIT_VIDEO = '/:id/edit',
  DELETE_VIDEO = '/:id/delete';

// Export Routes
const routes = {
  home: HOME,
  search: SEARCH,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,

  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,

  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: VIDEO_DETAIL,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default routes;
