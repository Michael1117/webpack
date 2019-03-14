// webpack 是node 写出来的 node的写法
let path = require('path')
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
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname,'dist')   // 路径必须是一个绝对路径  
                                     //此时需要path path.resolve()能将相对路径解析为绝对路径
    }         
}