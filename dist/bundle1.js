 (function(modules) { // webpackBootstrap  webpack 启动函数
 	// The module cache 先定义一个缓存 如果模块加载完了 不需要再次加载模块 直接在缓存中取
 	var installedModules = {};

 	// The require function  配置 实现了require 方法
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
 	
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })

 ({"./src/a.js":  // key -> 当前模块的路径
    (function(module, exports) {  // value-> 函数

    eval("module.exports = \"hello world11\"\n\n//# sourceURL=webpack:///./src/a.js?");

    }),
    "./src/index.js":  // key -> 当前模块的路径
    (function(module, exports, __webpack_require__) {  // value-> 函数
    eval("//console.log(\"hello world\");\r\n\r\nlet str = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\r\n\r\nconsole.log(str)\n\n//# sourceURL=webpack:///./src/index.js?");
    
    })
});