// eslint-disable-next-line import/prefer-default-export
export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = 'WeTube';
    res.locals.loggedInUser = req.session.user;
    // console.log('--- session ---');
    // console.log(req.session);
    // console.log('--- locals ---');
    // console.log(res.locals);
    next();
};
