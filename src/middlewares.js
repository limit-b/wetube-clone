import multer from 'multer';

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = 'WeTube';
    res.locals.loggedInUser = req.session.user || {};
    // console.log(req.session);
    next();
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        req.flash('error', 'Not authorized.');
        return res.redirect('/');
    } else {
        return next();
    }
};

export const protectorMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        req.flash('error', 'Please log in first.');
        return res.redirect('/login');
    } else {
        return next();
    }
};

export const uploadAvatarMiddleware = multer({
    dest: 'uploads/avatars/',
    limits: { fileSize: 3000000 },
});

export const uploadVideoMiddleware = multer({
    dest: 'uploads/videos/',
    limits: { fileSize: 30000000 },
});
