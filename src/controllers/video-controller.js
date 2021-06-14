const fakeUser = { username: 'limit', loggedIn: false };

export const homeController = (req, res) => {
  const videosDB = [
    {
      title: 'first video',
      rating: 3,
      comments: 6,
      createdAt: `${8} minutes ago`,
      views: 200,
      id: 1,
    },
    {
      title: 'video #2',
      rating: 4,
      comments: 4,
      createdAt: `${6} minutes ago`,
      views: 100,
      id: 2,
    },
    {
      title: 'qwerty',
      rating: 5,
      comments: 2,
      createdAt: `${2} minutes ago`,
      views: 59,
      id: 3,
    },
  ];
  return res.render('home', {
    pageTitle: 'Home',
    potato: 'tomato',
    fakeUser,
    videosDB,
  });
};

export const searchController = (req, res) => res.send('search page');

export const uploadVideoController = (req, res) =>
  res.send('upload video page');

export const watchVideoController = (req, res) => res.render('watch-video');

export const editVideoController = (req, res) => res.render('edit-video');

export const deleteVideoController = (req, res) => {
  return res.send(`delete video page, #id : ${req.params.id}`);
};
