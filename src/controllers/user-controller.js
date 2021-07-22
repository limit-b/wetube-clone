import UserModel from '../models/User';

export const getJoinController = (req, res) => {
    return res.render('join', { pageTitle: 'Join' });
};

export const postJoinController = async (req, res) => {
    const { userName, email, userID, password, country } = req.body;
    try {
        await UserModel.create({ userName, email, userID, password, country });
        return res.redirect('/login');
    } catch (error) {
        console.log(error);
        return res.end();
    }
};

export const loginController = (req, res) => res.send('login page');

export const logoutController = (req, res) => res.send('logout page');

export const editUserProfileController = (req, res) =>
    res.send('edit user profile page');

export const removeUserProfileController = (req, res) =>
    res.send('remove user profile page');

export const seeUserController = (req, res) => res.send('see user page');
