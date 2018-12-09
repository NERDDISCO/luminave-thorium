const path = require('path');
// Don't bundle the modules from node_modules, just require them
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
      './src/index.js'
    ],
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    mode: "development",
    optimization: {
      // We no not want to minimize our code.
      minimize: false
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js$/
            }
        ]
    }
}
