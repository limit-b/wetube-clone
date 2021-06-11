const fakeUser = { username: 'limit', loggedIn: false };

export const homeController = (req, res) =>
  res.render('home', {
    pageTitle: 'Home',
    potato: 'tomato',
    fakeUser,
  });

export const searchController = (req, res) => res.send('search page');

export const uploadVideoController = (req, res) =>
  res.send('upload video page');

export const watchVideoController = (req, res) => res.render('watch-video');

export const editVideoController = (req, res) => res.render('edit-video');

export const deleteVideoController = (req, res) => {
  return res.send(`delete video page, #id : ${req.params.id}`);
};
