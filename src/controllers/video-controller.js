export const homeController = (req, res) => res.render('home');

export const searchController = (req, res) => res.send('search page');

export const uploadVideoController = (req, res) =>
  res.send('upload video page');

export const watchVideoController = (req, res) => res.render('watch');

export const editVideoController = (req, res) => {
  return res.send(
    `<!DOCTYPE html><html lang="ko"><head><title>WeTube</title></head><body><h1>edit video page, #id : ${req.params.id}</h1><footer>&copy; 2021 WeTube - All rights reserved</footer></body></html>`
  );
};

export const deleteVideoController = (req, res) => {
  return res.send(`delete video page, #id : ${req.params.id}`);
};
