const path = require('path');
// TODO ? const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
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
            jquery: "jquery/src/jquery",
            react: path.resolve(__dirname, "./node_modules/react"),
            react_dom: path.resolve(__dirname, "./node_modules/react-dom")
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, "lib"),
        library: "yperLibs",
        libraryTarget: "umd"
    },
    // TODO plugins: [commonsPlugin],
    mode: "production",
};