const path = require('path');
// const autoprefixer = require('autoprefixer');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const MODE = process.env.WEBPACK_ENV;
// const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js');
// const OUTPUT_DIR = path.join(__dirname, 'static');

console.log(path.resolve(__dirname, 'assets', 'js'));

const config = {
    // entry: ['@babel/polyfill', ENTRY_FILE],
    entry: './src/client/js/main.js',
    // output: { path: OUTPUT_DIR, filename: '[name].js' },
    output: {
        path: path.resolve(__dirname, 'assets', 'js'),
        filename: 'main.js',
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
            // css-loader ver-4.3.0
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    // { loader: 'style-loader' },
                    // { loader: MiniCssExtractPlugin.loader },
                    // { loader: 'css-loader' },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 [
                    //                     'autoprefixer',
                    //                     { overrideBrowserslist: 'cover 99.5%' },
                    //                 ],
                    //             ],
                    //         },
                    //     },
                    // },
                    // { loader: 'sass-loader' },
                ],
            },
        ],
    },
    // plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
    mode: 'development',
};

module.exports = config;
