import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { isHeroku } from './custom-modules';

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
});

const avatarS3Uploader = multerS3({
    // eslint-disable-next-line object-shorthand
    s3: s3,
    bucket: 'wetube-limit-a/avatars',
    acl: 'public-read',
});

const videoS3Uploader = multerS3({
    // eslint-disable-next-line object-shorthand
    s3: s3,
    bucket: 'wetube-limit-a/videos',
    acl: 'public-read',
});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.isHeroku = isHeroku;
    res.locals.loggedIn = Boolean(req.session.loggedIn);
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
    storage: isHeroku ? avatarS3Uploader : undefined,
    dest: 'uploads/avatars/',
    limits: { fileSize: 3000000 },
});

export const uploadVideoMiddleware = multer({
    storage: isHeroku ? videoS3Uploader : undefined,
    dest: 'uploads/videos/',
    limits: { fileSize: 30000000 },
});
