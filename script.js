class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr){
        this.root = buildTree(arr);
    }

    find(value,node=this.root){
        if(value == node.data){
            return node;
        } else if(value<node.data && node.left){
            return find(node.left);
        } else if(value>node.data && node.right){
            return find(node.right);
        } else {
            return -1;
        }
    }
    
    isBalanced(){
        if(this.root.left && this.root.right){
            let diff = getDepth(this.root.left)-getDepth(this.root.right);
            return (diff>-2 && diff < 2);
        } else return false;
    }
}

function buildTree(arr){
    const filtered = [...new Set(arr)]; // Remove duplicate results from initial array

    let root = new Node(filtered[0]);
    
    for(let i=1;i<filtered.length;i++){
        buildTreeAux(root,filtered[i]);
    }
    
    return root;
}

function buildTreeAux(node,value){
    // Trying to make self balancing
    if(value<node.data && !node.left){
        node.left = new Node(value);
    } else if(value>node.data && !node.left){
        let newRoot = new Node(value);
        newRoot.left = node;
        node = newRoot;//
        return node;//
    //
    }else if(value<node.data){
        if(node.left){
            buildTreeAux(node.left,value);
        } else {
            node.left = new Node(value);
        }
    } else if (value>node.data){
        if(node.right){
            buildTreeAux(node.right,value);
        } else {
            node.right = new Node(value);
        }
    }
}

function rotateTree(node,direction){
    let temp = node;
    if(direction==left){
        
    } else {
        
    }
}

function getDepth(node,base=1){
    if(!node){
        return 0; 
    }
    if(!node.left && !node.right){
        return 1;   
    } else {
        let left = getDepth(node.left);
        let right = getDepth(node.right);
        return (1 + ((left>right) ? left : right));
    }
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

console.log(getDepth(tree.root));
console.log(tree.isBalanced());
console.log(tree.find(1).right);