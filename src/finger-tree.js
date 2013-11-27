var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),

    constant = combinators.constant,
    identity = combinators.identity,

    Tree = daggy.taggedSum({
        Fork: ['left', 'right'],
        Leaf: ['x']
    });

// Methods
Tree.of = function(x) {
    return Tree.Leaf(x);
};

// Derived
Tree.prototype.map = function(f) {
    var scope = this;
    return scope.cata({
        Leaf: function(x) {
            return Tree.Leaf(f(x));
        },
        Fork: function(x, y) {
            return Tree.Fork(x.map(f), y.map(f));
        }
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = Tree;
