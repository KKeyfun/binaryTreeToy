class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr){
        this.root = buildTree([...new Set(arr)].sort((a,b)=> a-b));
    }

    find(value, node = this.root){
        console.log(value,node)
        if(value === node.data){
            return node;
        } else if(value < node.data && node.left){
            return this.find(value, node.left);
        } else if(value > node.data && node.right){
            return this.find(value, node.right);
        } else {
            return 0;
        }
    }
    
    isBalanced(){
        if(this.root.left && this.root.right){
            let diff = this.getDepth(this.root.left)-this.getDepth(this.root.right);
            return (diff>-2 && diff < 2);
        } else return false;
    }

    insert(value, node = this.root){
        if(node === null){
            node = new Node(value);
            return node;
        }
        if(node === value){
            return null;
        }

        if(value < node.data){
            node.left = this.insert(value,node.left);
        } else if(value > node.data){
            node.right = this.insert(value,node.right);
        }

        return node;
    }

    delete(value, node = this.root){
        if(!node){
            return null;
        }

        if(value<node.data){ // Traverse through tree
            node.left = this.delete(value,node.left);
        } else if(value>node.data){
            node.right = this.delete(value,node.right);
        } else { 

            if(!node.left){ // only child
                return node.right;
            } else if(!node.right){ // only child
                return node.left;
            } else {
                node.data = this.findSmallest(node.right);
                node.right = this.delete(node.data,node.right);
            }
        }
    }

    rebalance(){
        let arr = this.inOrder();
        this.root = buildTree(arr);
    }

    findSmallest(node = this.root){
        let min = node.data;
        let nextNode = node;

        while(nextNode.left){
            min = nextNode.left.data;
            nextNode = nextNode.left;
        }

        return min;
    }

    findLargest(node = this.root){
        let max = node.data;
        let nextNode = node;

        while(nextNode.right){
            max = nextNode.right.data;
            nextNode = nextNode.right;
        }

        return max;
    }

    preOrder(node = this.root){
        let arr = [];
        
        arr.push(node.data);
        if(node.left){
            arr.push(...this.preOrder(node.left));
        } 
        if(node.right){
            arr.push(...this.preOrder(node.right))
        }
        return arr;
    }

    inOrder(node = this.root){
        let arr = [];
        
        if(node.left){
            arr.push(...this.inOrder(node.left));
        } 
        arr.push(node.data);
        if(node.right){
            arr.push(...this.inOrder(node.right))
        }
        return arr;
    }

    postOrder(node = this.root){
        let arr = [];
        
        if(node.left){
            arr.push(...this.postOrder(node.left));
        } 
        if(node.right){
            arr.push(...this.postOrder(node.right))
        }
        arr.push(node.data);
        return arr;
    }

    levelOrder(node = this.root){
        let queue = [node];

        let acc = [];
        while(queue.length > 0){
            acc.push(queue[0].data);
            node = queue.shift();
            if(node.left){
                queue.push(node.left);
            }
            if(node.right){
                queue.push(node.right);
            }
        }

        return acc;
    }

    levelOrderCB(cb){
        let queue = [this.root];
        let acc = [];

        while(queue.length){
            const nextNode = queue.shift();
            cb ? cb(nextNode) : acc.push(nextNode.data);

            if(nextNode.left) queue.push(nextNode.left);
            if(nextNode.right) queue.push(nextNode.right);
        }

        return acc;
    }

    getDepth(node=this.root){
        if(!node){
            return 0; 
        }
        if(!node.left && !node.right){
            return 1;   
        } else {
            let left = this.getDepth(node.left);
            let right = this.getDepth(node.right);
            return (1 + ((left>right) ? left : right));
        }
    }
}

function buildTree(arr,start=0,end = arr.length-1){
    if(start>end) {
        return null;
    }

    let middle = Math.floor((start+end)/2);

    const root = new Node(arr[middle]);

    root.left = buildTree(arr,start,middle - 1);
    root.right = buildTree(arr,middle + 1,end);

    return root;
}


const input = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(input);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
prettyPrint(tree.root);

console.log(tree.isBalanced());
console.log(tree.find(8));
prettyPrint(tree.root);
console.log(tree.find(54321));
console.log(tree.findLargest());
console.log(tree.findSmallest());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder());

display(tree.getDepth(),'getDepth',5);
display(tree.isBalanced(),'isBalanced',true);
display(JSON.stringify(tree.find(324)),'find(324)','node holding 324');
tree.insert(52221);
display(JSON.stringify(tree.find(52221)),'insert(52221)','node holding 52221');
display(tree.findLargest(),'findLargest','52221');
display(tree.findSmallest(),'findSmallest','1');
display(tree.preOrder(),'preOrder',`[
    8,   4,    1,     3,
    5,   7,   67,     9,
   23, 324, 6345, 54321
 ]`);
display(tree.inOrder(),'inOrder',`[
    1,   3,    4,     5,
    7,   8,    9,    23,
   67, 324, 6345, 54321
 ]`);
display(tree.postOrder(),'postOrder',`[
    3,   1,  7,     5,
    4,  23,  9, 54321,
 6345, 324, 67,     8
]`);
display(tree.levelOrder(),'levelOrder',`[
    8,4,67,1,5,9,324,3,7,23,6345,52221
]`);
display(tree.levelOrderCB(),'levelOrderCB',`[
    8,4,67,1,5,9,324,3,7,23,6345,52221
]`);

tree.insert(52220);
tree.insert(52222);
tree.insert(52223);
tree.insert(52224);
display(tree.isBalanced(),'isBalanced after 4 insertions (52220-52224)',false);
tree.rebalance();
display(tree.isBalanced(),'after rebalance',true);
display(tree.preOrder(),'preOrder','console for the tree');
prettyPrint(tree.root);

function display(fxn,desc,expect){
    const div = document.createElement('div');
    div.textContent = `Got: //${fxn}//, ${desc}. Expects: ${expect}`;
    document.body.appendChild(div);
    document.body.appendChild(document.createElement('br'));
}