const config = require('./webpack.config');
const webpack = require('webpack');
const merge = require('webpack-merge');

function buildConfig(env) {
    const baseConfig = config(env);
    return merge(baseConfig, {
        plugins: [
            new webpack.DefinePlugin({
                API_IMAGES: JSON.stringify("http://localhost:8081/api/mandelbrot?")
            })
        ],
    });
}

module.exports = buildConfig;