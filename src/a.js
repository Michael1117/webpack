module.exports = "hello world11"
require('@babel/polyfill')
/* (function (){

})() */

/* var a = {
    b:{
        aa: 1,
        bb: 2
    }
}

console.log(a.b.aa) */

class B {

}

function * gen(params){
    yield 1;
}

console.log(gen().next())


'aaa'.includes('a')