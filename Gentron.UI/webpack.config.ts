/// <binding BeforeBuild='Run - Development' />
import * as path from 'path';
import * as webpack from 'webpack';
import * as MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const config: webpack.Configuration = {
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
}

export default config;