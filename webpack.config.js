const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
        ]
    },
    entry: {
        tabs: './src/tabs.ts',
        saveload: './src/saveload.ts',
        loader: './src/loader.ts'
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'js')
    },
};