import VideoModel from '../models/Video';
// import { formatHashtags } from '../models/Video';

const fakeUser = { username: 'limit', loggedIn: false };

export const homeController = async (req, res) => {
    try {
        const videosDB = await VideoModel.find({});
        console.log(videosDB);
        return res.render('home', { pageTitle: 'Home', videosDB, fakeUser });
    } catch (error) {
        return res.render('server-error', { error });
    }
};

export const searchController = (req, res) => res.send('search page');

export const getUploadVideoController = (req, res) => {
    return res.render('upload-video', { pageTitle: 'Upload Video' });
};

export const postUploadVideoController = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await VideoModel.create({
            title,
            description,
            // hashtags: formatHashtags(hashtags),
            hashtags: VideoModel.formatHashtags(hashtags),
        });
        return res.redirect('/');
    } catch (error) {
        return res.render('upload-video', {
            pageTitle: 'Upload Video',
            errorMessage: error._message,
        });
    }
};

export const watchVideoController = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.render('404', { pageTitle: 'Video not found.' });
    } else {
        return res.render('watch-video', { pageTitle: video.title, video });
    }
    // try {
    //     const video = await VideoModel.findById(id);
    //     return res.render('watch-video', { pageTitle: video.title, video });
    // } catch (error) {
    //     console.log(error);
    //     return res.render('404', { pageTitle: 'Video not found.' });
    // }
};

export const getEditVideoController = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.render('404', { pageTitle: 'Video not found.' });
    } else {
        return res.render('edit-video', {
            pageTitle: `Edit ${video.title}`,
            video,
        });
    }
    // try {
    //     const video = await VideoModel.findById(id);
    //     return res.render('edit-video', { pageTitle: `Editing: `, video });
    // } catch (error) {
    //     console.log(error);
    //     return res.render('404', { pageTitle: 'Video not found.' });
    // }
};

export const postEditVideoController = async (req, res) => {
    const {
        params: { id },
        body: { title, description, hashtags },
    } = req;
    const video = await VideoModel.exists({ _id: id });
    if (!video) {
        return res.render('404', { pageTitle: 'Video not found.' });
    } else {
        await VideoModel.findByIdAndUpdate(id, {
            title,
            description,
            // hashtags: formatHashtags(hashtags),
            hashtags: VideoModel.formatHashtags(hashtags),
        });
        // video.title = title;
        // video.description = description;
        // video.hashtags = hashtags
        //     .split(',')
        //     .map((word) => (word.startsWith('#') ? word : `#${word}`));
        // await video.save();
        return res.redirect(`/videos/${id}`);
    }
};

export const deleteVideoController = (req, res) => {
    return res.send(`delete video page, #id : ${req.params.id}`);
};
