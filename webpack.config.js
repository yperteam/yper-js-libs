const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
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
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "development",
};