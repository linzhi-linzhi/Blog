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


/**
 *   控制最大并发请求数
**/

function concurrencyRequest(urls,maxNum){
    let urlArr = [...urls]
    let count = 0
    let resNum = 0
    let resArr = []

    for (let i = 0; i < maxNum; i++) {
        edit(resNum)
    }

    function edit(index){
        count ++ 
        resNum ++
        fetch(urlArr[index]).then(res=>{
            console.log(res)
            resArr[index] = res 
        }).catch(err=>{
            console.log(err)
            resArr[index] = err 
        }).finally(()=>{
            count --
            if (resNum < urlArr.length) {
                edit(resNum)
            } else if( count === 0) {
                console.log('resArr', resArr)
            }
        })
    }
}




/**
 *   扁平数据结构转Tree
**/

// 递归查找

const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}

const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid)
  return result;
}


// 先把数据转成Map去存储，之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储。不同点在遍历的时候即做Map存储,有找对应关系。性能会更好。

function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}



/**
 *   每隔一端时间执行一次函数，一共执行n次
 **/

// 实现一个函数，使得 repeat(() => {console.log('1')}, 5, 2000) 每两秒执行一次打印，总共五次

function wait(millisecond) {
    return new Promise((resovle) => {
        setTimeout(() => {
            resovle()
        }, millisecond);
    })
}

async function repeat(task, count = 1, millisecond = 0) {
    while (count--) {
        await wait(millisecond)
        task()
    }
}

repeat(() => {
    console.log('1')
}, 5, 2000)




/**
 *   虚拟dom转真实dom
 **/

const vnode = {
    tag: 'div',
    attrs: {
        id: 'app',
    },
    children: [{
            tag: 'span',
            children: [{
                tag: 'a',
                children: [],
            }],
        },
        {
            tag: 'span',
            children: [{
                    tag: 'a',
                    children: [],
                },
                {
                    tag: 'a',
                    children: [],
                },
            ],
        },
    ],
}

render(vnode, document.querySelector('#root'))

/**
 * @description: 创建节点，添加到容器中
 * @param {type} vnode
 * @param {type} container
 */


function render(vnode, container) {
    const {
        tag,
        attrs,
        children
    } = vnode
    let vdom = document.createElement(tag)

    if (typeof attrs === 'object') {
        for (const key in attrs) {
            vdom[key] = attrs[key]
        }

    }

    if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
            render(children[i], vdom)
        }
    }

    container.appendChild(vdom)

}

