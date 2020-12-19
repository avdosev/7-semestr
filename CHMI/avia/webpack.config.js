const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = (env) => {
    console.log(env)

    const currentEnivronment = env.NODE_ENV || env.nodeEnv // почему-то devServer и обычная сборка по-разному прокидывают аргументы
    console.log(currentEnivronment)
    const isProduction = currentEnivronment === "prod"

    const devtool = isProduction ? '' : 'eval-cheap-module-source-map'
    console.log(isProduction)

    return {
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/', // этот путь будет добавляться в пути до каждого бандла внутри хтмл и других бандлов
            filename: "js/[name].[hash].bundle.js",
            chunkFilename: 'js/[name].[hash].bundle.js',
        },
        devtool,
        resolve: {
            extensions: ['.tsx', '.ts', ".js"]
        },
        optimization: {
            runtimeChunk: true

        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules)/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        compilerOptions: {
                            "sourceMap": !isProduction,
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: false,
                            }
                        }
                    ]
                },
                {
                    test: /\.(scss|module.(scss))$/,
                    exclude: /\.$/,
                    loader: [
                        !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|jpeg|gif|png|svg)$/,
                    loader: ['file-loader?context=src/images&name=images/[path][name].[ext]'],
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    loader: 'file-loader?name=fonts/[name].[hash].[ext]',
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            port: 3000,
            watchContentBase: true,
            progress: true,
            compress: true,
            hot: true,
            historyApiFallback: true
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {from: 'public', to: '.'},
                ],
            }),
            new HtmlWebpackPlugin({template: './public/index.html'}),
            new CheckerPlugin()
        ]
    }
}