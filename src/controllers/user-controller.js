import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import UserModel from '../models/User';

export const getJoinController = (req, res) => {
    return res.render('join', { pageTitle: 'Join' });
};

export const postJoinController = async (req, res) => {
    const { userName, email, userID, password, confirmPassword, country } =
        req.body;
    const pageTitle = 'Join';
    if (password !== confirmPassword) {
        req.flash('info', 'Password confirmation does not match.');
        return res.status(400).render('join', { pageTitle });
    } else if (
        password === undefined ||
        password.trim() === '' ||
        confirmPassword === undefined ||
        confirmPassword.trim() === ''
    ) {
        req.flash('info', 'Password cannot be empty.');
        return res.status(400).render('join', { pageTitle });
    } else {
        const exists = await UserModel.exists({ $or: [{ email }, { userID }] });
        if (exists) {
            req.flash('info', 'This E-mail / ID is already taken.');
            return res.status(400).render('join', { pageTitle });
        } else {
            try {
                await UserModel.create({
                    userName,
                    email,
                    userID,
                    password,
                    country,
                });
                req.flash('success', 'Join success.');
                return res.status(201).redirect('/login');
            } catch (error) {
                console.error(error);
                req.flash('error', 'Join failed');
                return res.redirect('/');
                // return res.render('join', { pageTitle });
            }
        }
    }
};

export const getLoginController = (req, res) => {
    return res.render('login', { pageTitle: 'Login' });
};

export const postLoginController = async (req, res) => {
    const { userID, password } = req.body;
    const userDB = await UserModel.findOne({ socialLoginOnly: false, userID });
    const pageTitle = 'Login';
    if (!userDB) {
        req.flash('info', 'An account with this ID does not exists.');
        return res.status(400).render('login', { pageTitle });
    } else {
        const comparePassword = await bcrypt.compare(password, userDB.password);
        if (!comparePassword) {
            req.flash('info', 'Wrong password.');
            return res.status(400).render('login', { pageTitle });
        } else {
            req.session.loggedIn = true;
            req.session.user = userDB;
            req.flash('success', 'Login success.');
            return res.redirect('/');
        }
    }
};

export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        allow_signup: false,
        scope: 'read:user user:email',
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: 'POST',
            headers: { Accept: 'application/json' },
        })
    ).json();
    if ('access_token' in tokenRequest) {
        const apiUrl = 'https://api.github.com';
        const githubUserData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${tokenRequest.access_token}`,
                },
            })
        ).json();
        const githubEmailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${tokenRequest.access_token}`,
                },
            })
        ).json();
        const trueEmailObj = githubEmailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!trueEmailObj) {
            req.flash('error', 'GitHub login failed.');
            return res.redirect('/login');
        } else {
            // TODO: githubID
            let githubUser = await UserModel.findOne({
                email: trueEmailObj.email,
            });
            if (!githubUser) {
                try {
                    githubUser = await UserModel.create({
                        socialLoginOnly: true,
                        avatarUrl: githubUserData.avatar_url,
                        userName: githubUserData.name
                            ? githubUserData.name
                            : githubUserData.login,
                        email: trueEmailObj.email,
                        userID: githubUserData.login,
                        password: '',
                        country: githubUserData.location
                            ? githubUserData.location
                            : 'Unknown',
                    });
                    req.session.loggedIn = true;
                    req.session.user = githubUser;
                    req.flash('success', 'GitHub login success.');
                    return res.status(201).redirect('/');
                } catch (error) {
                    console.error(error);
                    req.flash('error', 'GitHub login failed.');
                    return res.redirect('/login');
                }
            } else {
                req.session.loggedIn = true;
                req.session.user = githubUser;
                req.flash('success', 'GitHub login success.');
                return res.redirect('/');
            }
        }
    } else {
        req.flash('error', 'GitHub login failed.');
        return res.redirect('/login');
    }
};

export const logoutController = (req, res) => {
    // req.session.destroy();
    req.session.loggedIn = false;
    req.session.user = null;
    res.locals.loggedInUser = req.session.user || {};
    req.flash('info', 'Goodbye.');
    return res.redirect('/');
};

export const getEditUserController = async (req, res) => {
    return res.render('users/edit-user', { pageTitle: 'Edit User' });
};

export const postEditUserController = async (req, res) => {
    const {
        session: {
            user: { _id, avatarUrl },
        },
        file,
        body: { userName, email, userID, country },
    } = req;
    const exists = await UserModel.exists({
        _id: { $ne: _id },
        $or: [{ email }, { userID }],
    });
    // const pageTitle = 'Edit User';
    if (exists) {
        req.flash('info', 'This E-mail / ID is already taken.');
        return res
            .status(400)
            .render('users/edit-user', { pageTitle: 'Edit User' });
    } else {
        try {
            const updatedUserDB = await UserModel.findByIdAndUpdate(
                _id,
                {
                    avatarUrl: file ? file.path : avatarUrl,
                    userName,
                    email,
                    userID,
                    country,
                },
                { new: true }
            );
            req.session.user = updatedUserDB;
            req.flash('info', 'User info updated.');
            return res.status(200).redirect('/');
        } catch (error) {
            console.error(error);
            req.flash('error', 'User info not updated.');
            return res.redirect('/');
            // return res.render('users/edit-user', { pageTitle });
        }
    }
};

export const getChangePasswordController = (req, res) => {
    const { socialLoginOnly } = req.session.user;
    if (socialLoginOnly === true) {
        req.flash('info', 'You are logging in on social.');
        return res.status(403).redirect('/');
    } else {
        return res.render('users/change-password', {
            pageTitle: 'Change Password',
        });
    }
};

export const postChangePasswordController = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, confirmNewPassword },
    } = req;
    const pageTitle = 'Change Password';
    if (oldPassword === newPassword) {
        req.flash('info', 'The old password equals new password.');
        return res.status(400).render('users/change-password', { pageTitle });
    } else if (newPassword !== confirmNewPassword) {
        req.flash('info', 'The password does not match the confirmation.');
        return res.status(400).render('users/change-password', { pageTitle });
    } else if (
        newPassword === undefined ||
        newPassword.trim() === '' ||
        confirmNewPassword === undefined ||
        confirmNewPassword.trim() === ''
    ) {
        req.flash('info', 'Password cannot be empty.');
        return res.status(400).render('users/change-password', { pageTitle });
    } else {
        const userDB = await UserModel.findOne({
            socialLoginOnly: false,
            _id,
        });
        if (!userDB) {
            return res
                .status(404)
                .render('404', { pageTitle: 'User not found' });
        } else {
            const comparePassword = await bcrypt.compare(
                oldPassword,
                userDB.password
            );
            if (!comparePassword) {
                req.flash('info', 'The current password is incorrect.');
                return res
                    .status(400)
                    .render('users/change-password', { pageTitle });
            } else {
                try {
                    userDB.password = await newPassword;
                    await userDB.save();
                    // req.session.destroy();
                    req.session.loggedIn = false;
                    req.session.user = null;
                    res.locals.loggedInUser = req.session.user || {};
                    req.flash('success', 'Password updated.');
                    return res.status(200).redirect('/');
                    // return res.status(200).redirect('/users/logout');
                } catch (error) {
                    console.error(error);
                    req.flash('error', 'Can not change password.');
                    return res.redirect('/');
                    // return res.render('users/change-password', { pageTitle });
                }
            }
        }
    }
};

export const removeUserController = (req, res) => res.send('remove user page');

export const seeUserController = async (req, res) => {
    const {
        params: { id },
    } = req;
    const userDB = await UserModel.findById(id).populate({
        path: 'userVideos',
        populate: { path: 'videoOwner', model: 'User' },
    });
    if (!userDB) {
        return res.status(404).render('404', { pageTitle: 'User Not Found' });
    } else {
        return res.render('users/user-profile', {
            pageTitle: userDB.userName,
            userDB,
        });
    }
};
