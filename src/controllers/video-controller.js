import VideoModel from '../models/Video';

export const homeController = async (req, res) => {
    try {
        const videosDB = await VideoModel.find({}).sort({ createdAt: 'desc' });
        console.log(videosDB);
        return res.render('home', { pageTitle: 'Home', videosDB });
    } catch (error) {
        return res.render('server-error', { error });
    }
};

export const searchController = async (req, res) => {
    const { keyword } = req.query;
    let searchVideos = [];
    if (keyword) {
        searchVideos = await VideoModel.find({
            title: { $regex: new RegExp(keyword, 'i') },
        }).sort({ createdAt: 'desc' });
    }
    return res.render('search', { pageTitle: 'Search', searchVideos });
};

export const getUploadVideoController = (req, res) => {
    return res.render('upload-video', { pageTitle: 'Upload Video' });
};

export const postUploadVideoController = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await VideoModel.create({
            title,
            description,
            hashtags: await VideoModel.formatHashtags(hashtags),
        });
        return res.redirect('/');
    } catch (error) {
        return res.status(400).render('upload-video', {
            pageTitle: 'Upload Video',
            errorMessage: error._message,
        });
    }
};

export const watchVideoController = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        return res.render('watch-video', { pageTitle: video.title, video });
    }
};

export const getEditVideoController = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        return res.render('edit-video', {
            pageTitle: `Edit ${video.title}`,
            video,
        });
    }
};

export const postEditVideoController = async (req, res) => {
    const {
        params: { id },
        body: { title, description, hashtags },
    } = req;
    const video = await VideoModel.exists({ _id: id });
    if (!video) {
        return res.status(404).render('404', { pageTitle: 'Video not found.' });
    } else {
        await VideoModel.findByIdAndUpdate(id, {
            title,
            description,
            hashtags: await VideoModel.formatHashtags(hashtags),
        });
        return res.redirect(`/videos/${id}`);
    }
};

export const deleteVideoController = async (req, res) => {
    const { id } = req.params;
    await VideoModel.findByIdAndDelete(id);
    return res.redirect('/');
};
