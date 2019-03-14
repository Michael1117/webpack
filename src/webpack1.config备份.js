// webpack 是node 写出来的 node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(path.resolve('dist'))
module.exports = {
    devServer:{//开发服务器配置
        port: 3000,
        progress: true, // 进度条
        contentBase: './dist',  // 指向build
        //open: true,   // 自动打开
        compress: true  // 压缩
    },
    mode: 'development',  // 模式 默认两种  production development
    entry: './src/index.js', // 入口
    output: {   // 出口
        filename: 'bundle.[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname,'dist')   // 路径必须是一个绝对路径  
                                     //此时需要path path.resolve()能将相对路径解析为绝对路径
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
        })
    ],
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
                //  可以处理less 文件
                test: /\.css$/, 
                use:[{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'  //插入到顶部 这样自己写的样式才会生效
                    }
                }, 'css-loader']
            },
            //{test: /\.css$/, use:['style-loader', 'css-loader']}
            {
                //  可以处理less 文件  sass stylus node-sass sass-loader
                // stylus stylus-loader 
                test: /\.less$/, 
                use:[{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'  //插入到顶部 这样自己写的样式才会生效
                    }
                }, 
                'css-loader',  // @import 解析路径
                'less-loader'  // 把less -> css 
            ]
            }
        ]
    }       
}