export const homeController = (req, res) => res.send('home page');

export const searchController = (req, res) => res.send('search page');

export const uploadVideoController = (req, res) =>
  res.send('upload video page');

export const seeVideoController = (req, res) => {
  return res.send(`see video page, #id : ${req.params.id}`);
};

export const editVideoController = (req, res) => {
  return res.send(`edit video page, #id : ${req.params.id}`);
};

export const deleteVideoController = (req, res) => {
  return res.send(`delete video page, #id : ${req.params.id}`);
};
