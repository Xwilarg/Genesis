const path = require('path');

module.exports = {
    mode: 'production',
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
        saveload: './src/saveload.ts'
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'js')
    },
};