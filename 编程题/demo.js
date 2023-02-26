/**
 *  遍历一个dom树
**/

function traversal(node) {
    if (node && node.type === 1) {
        console.log(node.tagName)
    }
    let {
        childNodes
    } = node
    let item = undefined
    for (let i = 0; i < childNodes.length; i++) {
        item = childNodes[i]
        if (item.type === 1) {
            traversal(item)
        }

    }

}




/**
 *   原型链接输出
**/
function Foo() {
    Foo.prototype.a = function () {
        console.log(1)
    }
    this.a = function () {
        console.log(2)
    }
}
Foo.a = function () {
    console.log(3)
}
Foo.prototype.a = function () {
    console.log(4)
}

Foo.a()                     // 3 // 直接找Foo这个函数对象上面的a
let obj = new Foo()
obj.a()                     // 2 在this上找到a 不查找原型链
Foo.prototype.a()           // 1 // 在构造函数实例化的时候 被重写了





/**
 *   二叉树的层序遍历
**/

/**
 * 装饰器
 * @param {TreeNode} root
 * @return {number[][]}
 */

// TreeNode:{
//     val,
//     right,
//     right
// }

function levelOrder(root){
    if (!root) return []
    let res = []
    const help = (node,deep)=>{
        if (!node) return
        // 初始化层级
        if (!res[deep]) {
            res[deep] = []
        }
        // 从左到右 添加到对应的层级 后面的放在后面
        res[deep].push(node.val)
        deep++
        help(node.left, deep)
        help(node.right, deep)

    }
    help(root, 0)

}


/**
 *   计算乘阶
**/

function multiply(n){
    if (n === 1) {
        return n
    }else{
        let num = n
        n--
        return num*multiply(n)
    }
}



/**
 *   数组去重
**/

// ES6基本类型去重
function unique(arr) {
    return Array.from(new Set(arr))
}






