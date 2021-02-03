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
        filename: "yper_libs.js",
        path: path.resolve(__dirname, 'lib'),
        library: "yperLibs",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    mode: "production",
};