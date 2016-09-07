module.exports = {
    entry: './src/js/main.js',
    output: {
        path: './',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    module: {
        loaders: [
            { test: /\.css$/, loaders: ['style','css']}
        ]
    }
}