import routes from '../routes';

export const getJoinController = (req, res) =>
  res.render('join', { pageTitle: 'Join' });

export const postJoinController = (req, res) => {
  // 비구조화 할당(구조분해 할당)
  const {
    body: { name, email, password, password2 },
  } = req;
  console.log(name, email, password, password2);
  if (password !== password2) {
    res.status(400);
    res.render('join', { pageTitle: 'Join' });
  } else {
    // TODO: Register User(사용자 등록), Log User In(사용자 로그인)
    res.redirect(routes.home);
  }
};

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
