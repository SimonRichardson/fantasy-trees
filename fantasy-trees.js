var BinaryTree = require('./src/binary-tree'),
    FingerTree = require('./src/finger-tree');

if (typeof module != 'undefined')
    module.exports = {
        BinaryTree: BinaryTree,
        FingerTree: FingerTree
    };