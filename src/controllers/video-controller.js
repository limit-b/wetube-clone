import VideoModel from '../models/Video';
import UserModel from '../models/User';
import CommentModel from '../models/Comment';

export const homeController = async (req, res) => {
    try {
        const videosDB = await VideoModel.find({})
            .sort({ videoCreatedAt: 'desc' })
            .populate('videoOwner');
        // console.log(videosDB);
        return res.status(200).render('home', { pageTitle: 'Home', videosDB });
    } catch (error) {
        console.error(error);
        return res.redirect('/');
    }
};

export const searchController = async (req, res) => {
    const { keyword } = req.query;
    let searchVideosDB = [];
    if (keyword) {
        searchVideosDB = await VideoModel.find({
            title: { $regex: new RegExp(keyword, 'i') },
        })
            .sort({ videoCreatedAt: 'desc' })
            .populate('videoOwner');
    }
    return res.render('search', { pageTitle: 'Search', searchVideosDB });
};

export const getUploadVideoController = (req, res) => {
    return res.render('videos/upload-video', { pageTitle: 'Upload Video' });
};

export const postUploadVideoController = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        files: {
            videoFile: [{ path: videoUrl }],
            thumbnailFile: [{ path: thumbnailUrl }],
        },
        body: { title, description, hashtags },
    } = req;
    if (
        title === null ||
        title === undefined ||
        title === '' ||
        title.trim() === ''
    ) {
        req.flash('info', 'Title is empty.');
        return res
            .status(400)
            .render('videos/upload-video', { pageTitle: 'Upload Video' });
    } else {
        try {
            const newVideo = await VideoModel.create({
                videoUrl,
                thumbnailUrl,
                hashtags: VideoModel.formatHashtags(hashtags),
                title,
                videoOwner: _id,
                description,
            });
            await UserModel.findByIdAndUpdate(_id, {
                $push: { userVideos: newVideo._id },
            });
            // const userDB = await UserModel.findById(_id);
            // await userDB.userVideos.push(newVideo._id);
            // await userDB.save();
            const updatedUserDB = await UserModel.findById(_id).populate({
                path: 'userVideos',
                populate: { path: 'videoOwner', model: 'User' },
            });
            req.flash('success', 'Video uploaded.');
            return res.status(201).render('users/user-profile', {
                pageTitle: updatedUserDB.userName,
                userDB: updatedUserDB,
            });
        } catch (error) {
            console.error(error);
            req.flash('error', 'Video not uploaded.');
            return res.redirect('/');
            // return res.render('videos/upload-video', { pageTitle: 'Upload Video' });
        }
    }
};

export const watchVideoController = async (req, res) => {
    const { id } = req.params;
    const videoDB = await VideoModel.findById(id)
        .populate('videoOwner')
        .populate('videoComments');
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        // console.log(videoDB);
        return res.render('videos/watch-video', {
            pageTitle: videoDB.title,
            videoDB,
        });
    }
};

export const registerViewController = async (req, res) => {
    const { id } = req.params;
    const exists = await VideoModel.exists({ _id: id });
    // const videoDB = await VideoModel.findById(id);
    if (!exists) {
        return res.sendStatus(404);
    } else {
        try {
            await VideoModel.findByIdAndUpdate(id, {
                $inc: { 'meta.views': 1 },
            });
            // videoDB.meta.views += 1;
            // await videoDB.save();
            return res.sendStatus(200);
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    }
};

export const createCommentController = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
        body: { commentText },
    } = req;
    const videoDB = await VideoModel.findById(id);
    if (
        commentText === null ||
        commentText === undefined ||
        commentText === '' ||
        commentText.trim() === ''
    ) {
        return res.sendStatus(400);
    } else if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        try {
            const newComment = await CommentModel.create({
                commentVideo: id,
                commentOwner: _id,
                commentText,
            });
            await VideoModel.findByIdAndUpdate(id, {
                $push: { videoComments: newComment._id },
            });
            // await videoDB.videoComments.push(newComment._id);
            // await videoDB.save();
            // await UserModel.findByIdAndUpdate(_id, {
            //     $push: { userComments: newComment._id },
            // });
            return res.status(201).json({ newCommentId: newComment._id });
        } catch (error) {
            console.error(error);
            req.flash('error', 'Comment not uploaded.');
            return res.redirect('/');
        }
    }
};

export const deleteCommentController = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
        body: { commentId },
    } = req;
    const videoDB = await VideoModel.findById(id);
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        const commentDB = await CommentModel.findById(commentId);
        if (String(commentDB.commentOwner) !== String(_id)) {
            req.flash('error', 'You are not the owner of the comment.');
            return res.status(403).redirect('/');
        } else {
            try {
                await CommentModel.findByIdAndDelete(commentId);
                await videoDB.videoComments.splice(
                    videoDB.videoComments.indexOf(commentId),
                    1
                );
                await videoDB.save();
                return res.sendStatus(200);
            } catch (error) {
                console.warn(error);
                req.flash('warn', 'Comment not deleted.');
                return res.redirect('/');
                // return res.render('videos/watch-video', {
                //     pageTitle: videoDB.title,
                //     videoDB,
                // });
            }
        }
    }
};

export const getEditVideoController = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;
    const videoDB = await VideoModel.findById(id);
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else if (String(videoDB.videoOwner) !== String(_id)) {
        req.flash('error', 'You are not the owner of the video.');
        return res.status(403).redirect('/');
    } else {
        return res.render('videos/edit-video', {
            pageTitle: `Edit ${videoDB.title}`,
            videoDB,
        });
    }
};

export const postEditVideoController = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
        body: { title, description, hashtags },
    } = req;
    const videoDB = await VideoModel.findById(id);
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else if (
        title === null ||
        title === undefined ||
        title === '' ||
        title.trim() === ''
    ) {
        req.flash('info', 'Title is empty.');
        return res.status(400).render('videos/edit-video', {
            pageTitle: `Edit ${videoDB.title}`,
            videoDB,
        });
    } else if (String(videoDB.videoOwner) !== String(_id)) {
        req.flash('error', 'You are not the owner of the video.');
        return res.status(403).redirect('/');
    } else {
        try {
            await VideoModel.findByIdAndUpdate(id, {
                hashtags: VideoModel.formatHashtags(hashtags),
                title,
                description,
            });
            const updatedUserDB = await UserModel.findById(_id).populate({
                path: 'userVideos',
                populate: { path: 'videoOwner', model: 'User' },
            });
            req.flash('success', 'Video updated.');
            return res.status(200).render('users/user-profile', {
                pageTitle: updatedUserDB.userName,
                userDB: updatedUserDB,
            });
            // return res.status(200).redirect(`/videos/${id}`);
        } catch (error) {
            console.error(error);
            req.flash('error', 'Video not updated.');
            return res.redirect('/');
            // return res.render('videos/edit-video', {
            //     pageTitle: `Edit ${videoDB.title}`,
            //     videoDB,
            // });
        }
    }
};

export const deleteVideoController = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;
    const videoDB = await VideoModel.findById(id).populate('videoOwner');
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else if (String(videoDB.videoOwner._id) !== String(_id)) {
        req.flash('error', 'You are not the owner of the video.');
        return res.status(403).redirect('/');
    } else {
        try {
            const ownerUserDB = await UserModel.findById(_id);
            await VideoModel.findByIdAndDelete(id);
            await ownerUserDB.userVideos.splice(
                ownerUserDB.userVideos.indexOf(id),
                1
            );
            await ownerUserDB.save();
            await CommentModel.deleteMany({ commentVideo: id });
            // videoDB.videoComments.forEach(async (comment) => {
            //     await CommentModel.findByIdAndDelete(comment._id);
            // });
            const updatedUserDB = await UserModel.findById(_id).populate({
                path: 'userVideos',
                populate: { path: 'videoOwner', model: 'User' },
            });
            req.flash('info', 'Video deleted.');
            return res.status(200).render('users/user-profile', {
                pageTitle: updatedUserDB.userName,
                userDB: updatedUserDB,
            });
            // return res.status(200).redirect('/');
        } catch (error) {
            console.warn(error);
            req.flash('warn', 'Video not deleted.');
            return res.redirect('/');
            // return res.render('videos/watch-video', {
            //     pageTitle: videoDB.title,
            //     videoDB,
            // });
        }
    }
};
