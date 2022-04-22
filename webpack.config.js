/* eslint-disable prefer-template */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const MODE = process.env.WEBPACK_ENV;
const CLIENT_BASE_JS = './src/client/js/';

const config = {
    entry: {
        main: CLIENT_BASE_JS + 'main.js',
        videoPlayer: CLIENT_BASE_JS + 'video-player.js',
        loggedOutComment: CLIENT_BASE_JS + 'logged-out-comment.js',
        commentSection: CLIENT_BASE_JS + 'comment-section.js',
        recorder: CLIENT_BASE_JS + 'recorder.js',
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'css/styles.css' })],
};

module.exports = config;
