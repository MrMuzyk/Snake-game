/**
# do wykonania w katalogu (tworzy plik package.json)
npm init

# następnie:
npm install webpack
npm install babel-core babel-preset-es2015 babel-loader --save-dev

# lokalnie webpack (tak jest instalowany wyżej):
# ./node_modules/.bin/webpack
# globalnie webpack:
# webpack

# moduły css oraz serwer webpack:
npm install style-loader css-loader node-sass sass-loader webpack-dev-server --save-dev

# ręczne odpalenie webpacka
./node_modules/.bin/webpack

# uruchomienie webpack server:
./node_modules/.bin/webpack-dev-server --inline --hot

http://localhost:8080/webpack-dev-server/
**/

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "./js/out.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        filename: './js/out.js',
    }
}
