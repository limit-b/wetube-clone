import bcrypt from 'bcrypt';
import UserModel from '../models/User';

export const getJoinController = (req, res) => {
    return res.render('join', { pageTitle: 'Join' });
};

export const postJoinController = async (req, res) => {
    const {
        userName,
        email,
        userID,
        password,
        confirmPassword,
        country,
    } = req.body;
    const pageTitle = 'Join';
    if (password !== confirmPassword) {
        return res.status(400).render('join', {
            pageTitle,
            errorMessage: 'Password confirmation does not match.',
        });
    } else {
        const exists = await UserModel.exists({ $or: [{ email }, { userID }] });
        if (exists) {
            return res.status(400).render('join', {
                pageTitle,
                errorMessage: 'This E-mail / ID is already taken.',
            });
        } else {
            try {
                await UserModel.create({
                    userName,
                    email,
                    userID,
                    password,
                    country,
                });
                return res.redirect('/login');
            } catch (error) {
                console.log(error);
                return res.status(400).render('join', {
                    pageTitle,
                    errorMessage: error._message,
                });
            }
        }
    }
};

export const getLoginController = (req, res) => {
    return res.render('login', { pageTitle: 'Login' });
};

export const postLoginController = async (req, res) => {
    const { userID, password } = req.body;
    const user = await UserModel.findOne({ userID });
    const pageTitle = 'Login';
    if (!user) {
        return res.status(400).render('login', {
            pageTitle,
            errorMessage: 'An account with this ID does not exists.',
        });
    } else {
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).render('login', {
                pageTitle,
                errorMessage: 'Wrong password.',
            });
        } else {
            console.log('Log user in! Coming soon!');
            return res.redirect('/');
        }
    }
};

export const logoutController = (req, res) => res.send('logout page');

export const editUserProfileController = (req, res) =>
    res.send('edit user profile page');

export const removeUserProfileController = (req, res) =>
    res.send('remove user profile page');

export const seeUserController = (req, res) => res.send('see user page');
