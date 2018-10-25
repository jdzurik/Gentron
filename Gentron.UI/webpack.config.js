"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var webpack = require("webpack");
var MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
var config = {
    mode: "development",
    entry: './index.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, '.')
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MonacoWebpackPlugin({})
    ]
};
exports.default = config;
