const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const MODE = process.env.WEBPACK_ENV;

console.log(path.resolve(__dirname, 'assets', 'js'));

const config = {
    entry: './src/client/js/main.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/main.js',
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
            // css-loader ver-4.3.0
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'css/styles.css' })],
    mode: 'development',
    watch: true,
};

module.exports = config;
