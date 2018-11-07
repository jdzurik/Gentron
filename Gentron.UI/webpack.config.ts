/// <binding />
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
    entry: {
        app: ['webpack/hot/dev-server', './index.js'],
    },
    output: {
        path: path.resolve(__dirname, './built'),
        filename: './bundle.js',
        publicPath: 'http://localhost:8080/built/'
    },
    devServer: {
        //hot: true,
        //contentBase: path.resolve(__dirname, './built'),
        publicPath: 'http://localhost:8080/built/'
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
        new MonacoWebpackPlugin({}),
        //new webpack.HotModuleReplacementPlugin()
    ],
    target: "electron-renderer"
}

export default config;