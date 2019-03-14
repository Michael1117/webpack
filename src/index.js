// webpack 打包图片
// 1) 在js中创建 图片来引入
// file-loader 默认会在内部生成一张图片  到build 目录下
// 把生成的图片的名字返回回来
import './index.css'

import logo from './logo.jpg'  // 把图片引入  返回的结果是一个 新的图片地址
let image = new Image();

//image.src = './logo.jpg'  // 就是一个普通的字符串
image.src = logo
document.body.appendChild(image)

// 2) 在css 引入 background('url')
// 3) <img src="" alt=""/>

//import $ from 'expose-loader?$!jquery';
//import $ from 'jquery'

// expose-loader 暴露 全局的 loader  内联的loader 直接在代码中去用
// pre  前面执行的loader  normal  普通的loader  内联的loader  后置loader postloader

//import $ from 'jquery'


//console.log(window.$)  // 在每个 模块中 注入 $ 对象

// 1) expose-loader  暴露到window上
// 2) providePlugin  给每一个人提供一个$
// 3) 引入不打包

/* //console.log("hello world");

let str = require('./a.js')

console.log(str)

require('./index.css')

require('./index.less')

let fn = () => {
    console.log(1111)
}

fn()

@log
class A{  
    a = 1;
}
let a = new A();

console.log(a.a)


function log(target) {
    console.log(target)
} */