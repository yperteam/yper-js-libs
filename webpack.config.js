const path = require('path');

module.exports = {
    // entry: './src/index.ts',
    entry: {
        index: './src/index.ts',

        retail_point_controller: "./src/controller/retail_point_controller",
        admin_delivery_controller: "./src/controller/admin_delivery_controller",
        admin_controller: "./src/controller/admin_controller",
        delivery_controller: "./src/controller/delivery_controller",
        hub_controller: "./src/controller/hub_controller",
        journey_controller: "./src/controller/journey_controller",
        invoice_controller: "./src/controller/invoice_controller",
        order_controller: "./src/controller/order_controller",
        user_controller: "./src/controller/user_controller",
        user_payment_method_controller: "./src/controller/user_payment_method_controller",
        payment_intent_controller: "./src/controller/payment_intent_controller",
        parcel_controller: "./src/controller/parcel_controller",
        search_controller: "./src/controller/search_controller",
        target_controller: "./src/controller/target_controller",

        password_checker: "./src/component/password_checker/password_checker",
    },
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
            jquery: "jquery/src/jquery"
        }
    },
    output: {
        // filename: 'index.js',
        filename: '[name].js',
        path: path.resolve(__dirname, "lib"),
        library: "yperLibs",
        libraryTarget: "umd"
    },
    mode: "production",
};