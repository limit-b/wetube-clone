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
        req.flash('info', 'Not authorized.');
        return res.status(403).redirect('/');
    } else {
        return next();
    }
};

export const protectorMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        req.flash('info', 'Please log in first.');
        return res.status(401).redirect('/login');
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
