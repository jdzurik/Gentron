"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <binding BeforeBuild='Run - Development' />
var path = require("path");
var webpack = require("webpack");
var config = {
    entry: './index.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
exports.default = config;
