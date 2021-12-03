import VideoModel from '../models/Video';
import UserModel from '../models/User';

export const homeController = async (req, res) => {
    try {
        const videosDB = await VideoModel.find({})
            .sort({ createdAt: 'desc' })
            .populate('owner');
        // console.log(videosDB);
        return res.render('home', { pageTitle: 'Home', videosDB });
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
            .sort({ createdAt: 'desc' })
            .populate('owner');
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
        file: { path: videoUrl },
        body: { title, description, hashtags },
    } = req;
    try {
        const userDB = await UserModel.findById(_id);
        const newVideo = await VideoModel.create({
            videoUrl,
            hashtags: VideoModel.formatHashtags(hashtags),
            title,
            owner: _id,
            description,
        });
        await userDB.videos.push(newVideo._id);
        await userDB.save();
        req.flash('success', 'Video uploaded.');
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Video not uploaded.');
        return res.render('videos/upload-video', { pageTitle: 'Upload Video' });
    }
};

export const watchVideoController = async (req, res) => {
    const { id } = req.params;
    const videoDB = await VideoModel.findById(id).populate('owner');
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        // const videoOwner = await UserModel.findById(video.owner);
        return res.render('videos/watch-video', {
            pageTitle: videoDB.title,
            videoDB,
            // videoOwner,
        });
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
    } else if (String(videoDB.owner) !== String(_id)) {
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
    } else if (String(videoDB.owner) !== String(_id)) {
        req.flash('error', 'You are not the owner of the video.');
        return res.status(403).redirect('/');
    } else {
        try {
            await VideoModel.findByIdAndUpdate(id, {
                hashtags: VideoModel.formatHashtags(hashtags),
                title,
                description,
            });
            req.flash('success', 'Video updated.');
            return res.redirect(`/videos/${id}`);
        } catch (error) {
            console.error(error);
            req.flash('error', 'Video not updated.');
            return res.render('videos/edit-video', {
                pageTitle: `Edit ${videoDB.title}`,
                videoDB,
            });
        }
    }
};

export const registerViewController = async (req, res) => {
    const { id } = req.params;
    const videoDB = await VideoModel.findById(id);
    if (!videoDB) {
        return res.sendStatus(404);
    } else {
        try {
            videoDB.meta.views += 1;
            await videoDB.save();
            return res.sendStatus(200);
        } catch (error) {
            return res.redirect('/');
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
    const videoDB = await VideoModel.findById(id).populate('owner');
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else if (String(videoDB.owner) !== String(_id)) {
        req.flash('error', 'You are not the owner of the video.');
        return res.status(403).redirect('/');
    } else {
        try {
            const ownerUserDB = await UserModel.findById(_id);
            await VideoModel.findByIdAndDelete(id);
            await ownerUserDB.videos.splice(ownerUserDB.videos.indexOf(id), 1);
            await ownerUserDB.save();
            req.flash('info', 'Video deleted.');
            return res.redirect('/');
        } catch (error) {
            console.warn(error);
            // const videoOwner = await UserModel.findById(video.owner);
            req.flash('warn', 'Video not deleted.');
            return res.render('videos/watch-video', {
                pageTitle: videoDB.title,
                videoDB,
                // videoOwner,
            });
        }
    }
};
