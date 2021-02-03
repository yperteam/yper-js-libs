const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "@yper-script": path.resolve(__dirname, "src/"),
            jquery: "jquery/src/jquery"
        }
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname),
        library: "yperLibs",
        libraryTarget: "umd"
    },
    mode: "production",
};