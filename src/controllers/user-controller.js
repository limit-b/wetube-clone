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
    const userDB = await UserModel.findOne({ userID });
    const pageTitle = 'Login';
    if (!userDB) {
        return res.status(400).render('login', {
            pageTitle,
            errorMessage: 'An account with this ID does not exists.',
        });
    } else {
        const comparePassword = await bcrypt.compare(password, userDB.password);
        if (!comparePassword) {
            return res.status(400).render('login', {
                pageTitle,
                errorMessage: 'Wrong password.',
            });
        } else {
            // console.log('Log user in!');
            req.session.loggedIn = true;
            req.session.user = userDB;
            return res.redirect('/');
        }
    }
};

export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: 'ec598b73204311df24d7',
        allow_signup: false,
        scope: 'read:user user:email',
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = (req, res) => res.send('finish page');

export const logoutController = (req, res) => res.send('logout page');

export const editUserProfileController = (req, res) =>
    res.send('edit user profile page');

export const removeUserProfileController = (req, res) =>
    res.send('remove user profile page');

export const seeUserController = (req, res) => res.send('see user page');
