export const homeController = (req, res) => res.send('home page');

export const searchController = (req, res) => res.send('search page');

export const uploadVideoController = (req, res) =>
  res.send('upload video page');

export const seeVideoController = (req, res) => {
  console.log(req.params);
  res.send('see video page');
};

export const editVideoController = (req, res) => {
  console.log(req.params);
  res.send('edit video page');
};

export const deleteVideoController = (req, res) => {
  console.log(req.params);
  res.send('delete video page');
};
