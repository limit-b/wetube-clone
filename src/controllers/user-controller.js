import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
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
    } else if (password === undefined || password === '') {
        return res.status(400).render('join', {
            pageTitle,
            errorMessage: 'Password cannot be empty.',
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
    const userDB = await UserModel.findOne({ socialLoginOnly: false, userID });
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
            req.session.loggedIn = true;
            req.session.user = userDB;
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
            // TODO: set notification
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
                        userName: githubUserData.name
                            ? githubUserData.name
                            : githubUserData.login,
                        email: trueEmailObj.email,
                        userID: githubUserData.login,
                        password: '',
                        country: githubUserData.location
                            ? githubUserData.location
                            : 'Unknown',
                        avatarUrl: githubUserData.avatar_url,
                    });
                    req.session.loggedIn = true;
                    req.session.user = githubUser;
                    return res.redirect('/');
                } catch (error) {
                    console.log(error);
                    return res.status(400).render('server-error', { error });
                }
            } else {
                req.session.loggedIn = true;
                req.session.user = githubUser;
                return res.redirect('/');
            }
        }
    } else {
        //TODO: set notification
        return res.redirect('/login');
    }
};

export const logoutController = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
};

export const getEditUserController = async (req, res) => {
    return res.render('edit-user', { pageTitle: 'Edit User' });
};

export const postEditUserController = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { userName, email, userID, country },
    } = req;
    const exists = await UserModel.exists({
        _id: { $ne: _id },
        $or: [{ email }, { userID }],
    });
    const pageTitle = 'Edit User';
    if (exists) {
        return res.status(400).render('edit-user', {
            pageTitle,
            errorMessage: 'This E-mail / ID is already taken.',
        });
    } else {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                _id,
                { userName, email, userID, country },
                { new: true }
            );
            // req.session.user = {
            //     ...req.session.user,
            //     userName,
            //     email,
            //     userID,
            //     country,
            // };
            req.session.user = updatedUser;
            return res.redirect('/');
        } catch (error) {
            console.log(error);
            return res.status(400).render('edit-user', {
                pageTitle,
                errorMessage: error._message,
            });
        }
    }
};

export const getChangePasswordController = (req, res) => {
    const { socialLoginOnly } = req.session.user;
    if (socialLoginOnly === true) {
        return res.redirect('/');
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
    if (newPassword !== confirmNewPassword) {
        return res.status(400).render('users/change-password', {
            pageTitle: 'Change Password',
            errorMessage: 'The password does not match the confirmation.',
        });
    } else if (newPassword === undefined || newPassword === '') {
        return res.status(400).render('users/change-password', {
            pageTitle: 'Change Password',
            errorMessage: 'Password cannot be empty.',
        });
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
                return res.status(400).render('users/change-password', {
                    pageTitle: 'Change Password',
                    errorMessage: 'The current password is incorrect.',
                });
            } else {
                try {
                    userDB.password = newPassword;
                    await userDB.save();
                    //TODO: send notification
                    return res.redirect('/users/logout');
                } catch (error) {
                    console.log(error);
                    return res.status(400).render('users/change-password', {
                        pageTitle: 'Change Password',
                        errorMessage: error._message,
                    });
                }
            }
        }
    }
};

export const removeUserController = (req, res) => res.send('remove user page');

export const seeUserController = (req, res) => res.send('see user page');
