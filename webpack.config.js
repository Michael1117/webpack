// webpack 是node 写出来的 node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let Webpack = require('webpack')


console.log(path.resolve('dist'))
module.exports = {
    devServer:{//开发服务器配置
        port: 3000,
        progress: true, // 进度条
        contentBase: './dist',  // 指向build
        //open: true,   // 自动打开
        //compress: true  // 压缩
    },
    optimization: {  // 优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,   // 并发打包
                //sourceMap: true
            }),
            new OptimizeCss()
        ]
    },
    mode: 'development',  // 模式 默认两种  production development
    entry: './src/index.js', // 入口
    output: {   // 出口
        filename: 'bundle.[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname,'dist'),   // 路径必须是一个绝对路径  //此时需要path path.resolve()能将相对路径解析为绝对路径
        //publicPath: 'http://www.baidu.com'                             
    },
    plugins: [// 数组  放着所有的webpack 插件
        new HtmlWebpackPlugin({
            template: './src/index.html',  // 需要打包的模板
            filename: 'index.html',     // 打包后的文件名
            minify: {
                removeAttributeQuotes: true,  // 删除双引号
                collapseWhitespace: true   // 折叠空行
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        /* new Webpack.ProvidePlugin({  // 在每个模块中 都注入$
            $: 'jquery'
        }) */

    ],
    externals: {
        jquery: '$'
    },
    module: {  // 模块
        // loader 

        rules: [  // 规则  css-loader  解析 @import 这种语法
            // style-loader 把css 插入到head 的标签中
            // loader的特点  希望单一
            // loader的用法  字符串只用一个loader
            // 多个loader需要 []
            // loader 的顺序 默认是从右向左执行  从下到上执行
            // loader 还可以写成 对象方式
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                //use: 'file-loader'
                // 做一个限制  当我们的图片 < 多少k的时候 用base64来转化
                // 否则用file-loader 产生真实的图片
                use: {
                    loader: 'url-loader',
                    options: {
                        //limit: 2000 * 1024,  // 如果图片小于 2000k 全部变成 base64
                        limit: 1,
                        outputPath: '/img/',
                        publicPath: 'http://www.baidu.com'
                    }
                } 

            },
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            },
           /*  {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        enforce: 'pre'  // previous  前置先执行  因为loader 是从下往上执行的
                    }
                }
            }, */
            {
                test: /\.js$/,   // normal  普通的loader  默认
                use: {
                    loader: 'babel-loader',
                    options: {  // 用babel-loader 需要把es6 -> es5  @babel/preset-env
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                //  可以处理less 文件
                test: /\.css$/, 
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            //{test: /\.css$/, use:['style-loader', 'css-loader']}
            {
                //  可以处理less 文件  sass stylus node-sass sass-loader
                // stylus stylus-loader 
                test: /\.less$/, 
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',  // @import 解析路径
                    'postcss-loader',
                    'less-loader'  // 把less -> css 
                ]
            }
        ]
    }       
}