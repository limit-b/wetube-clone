import VideoModel from '../models/Video';
import UserModel from '../models/User';

export const homeController = async (req, res) => {
    try {
        const videosDB = await VideoModel.find({}).sort({ createdAt: 'desc' });
        // console.log(videosDB);
        return res.render('home', { pageTitle: 'Home', videosDB });
    } catch (error) {
        console.log(error);
        return res.status(400).render('server-error', { error });
    }
};

export const searchController = async (req, res) => {
    const { keyword } = req.query;
    let searchVideosDB = [];
    if (keyword) {
        searchVideosDB = await VideoModel.find({
            title: { $regex: new RegExp(keyword, 'i') },
        }).sort({ createdAt: 'desc' });
    }
    return res.render('search', { pageTitle: 'Search', searchVideosDB });
};

export const getUploadVideoController = (req, res) => {
    return res.render('upload-video', { pageTitle: 'Upload Video' });
};

export const postUploadVideoController = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        file: { path: videoUrl },
        body: { title, description, hashtags },
    } = req;
    const userDB = await UserModel.findById(_id);
    if (!userDB) {
        return res.status(404).render('404', { pageTitle: 'User not found.' });
    } else {
        try {
            const newVideo = await VideoModel.create({
                videoUrl,
                hashtags: await VideoModel.formatHashtags(hashtags),
                title,
                owner: _id,
                description,
            });
            userDB.videos.push(newVideo._id);
            userDB.save();
            return res.redirect('/');
        } catch (error) {
            return res.status(400).render('upload-video', {
                pageTitle: 'Upload Video',
                errorMessage: error._message,
            });
        }
    }
};

export const watchVideoController = async (req, res) => {
    const { id } = req.params;
    const videoDB = await VideoModel.findById(id).populate('owner');
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        // const videoOwner = await UserModel.findById(video.owner);
        return res.render('watch-video', {
            pageTitle: videoDB.title,
            videoDB,
            // videoOwner,
        });
    }
};

export const getEditVideoController = async (req, res) => {
    const { id } = req.params;
    const videoDB = await VideoModel.findById(id);
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        return res.render('edit-video', {
            pageTitle: `Edit ${videoDB.title}`,
            videoDB,
        });
    }
};

export const postEditVideoController = async (req, res) => {
    const {
        params: { id },
        body: { title, description, hashtags },
    } = req;
    const videoDB = await VideoModel.findById(id);
    if (!videoDB) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        try {
            await VideoModel.findByIdAndUpdate(id, {
                hashtags: await VideoModel.formatHashtags(hashtags),
                title,
                description,
            });
            return res.redirect(`/videos/${id}`);
        } catch (error) {
            console.log(error);
            return res.status(400).render('server-error', { error });
        }
    }
};

export const deleteVideoController = async (req, res) => {
    const { id } = req.params;
    try {
        await VideoModel.findByIdAndDelete(id);
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(400).render('server-error', { error });
    }
};
