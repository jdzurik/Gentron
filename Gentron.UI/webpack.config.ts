/// <binding BeforeBuild='Run - Development' />
import * as path from 'path';
import * as webpack from 'webpack';
import * as MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const config: webpack.Configuration = {
    //  fixes webpack compilation error,
    //  see: https://github.com/webpack-contrib/css-loader/issues/447
    node: {
        fs: "empty"
    },
    mode: "development",
    entry: './index.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, '.')
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
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
    ],
    target: "electron-renderer"
}

export default config;