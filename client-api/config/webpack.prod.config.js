const config = require('./webpack.config');
const webpack = require('webpack');
const merge = require('webpack-merge');


function buildConfig(env) {
    const baseConfig = config(env);
    return merge(baseConfig, {
        plugins: [
            new webpack.DefinePlugin({
                API_IMAGES: JSON.stringify("http://ec2-34-241-76-172.eu-west-1.compute.amazonaws.com/api/mandelbrot?")
            })
        ],
    });
}

module.exports = buildConfig;