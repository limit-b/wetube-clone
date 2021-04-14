export const joinController = (req, res) =>
  res.render('join', { pageTitle: 'Join' });
export const loginController = (req, res) =>
  res.render('login', { pageTitle: 'Log In' });
export const logoutController = (req, res) =>
  res.render('logout', { pageTitle: 'Log Out' });
// export const usersController = (req, res) => res.render('users');
export const userDetailController = (req, res) =>
  res.render('user-detail', { pageTitle: 'User Detail' });
export const editProfileController = (req, res) =>
  res.render('edit-profile', { pageTitle: 'Edit Profile' });
export const changePasswordController = (req, res) =>
  res.render('change-password', { pageTitle: 'Change Password' });
