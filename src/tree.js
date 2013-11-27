var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),

    constant = combinators.constant,
    identity = combinators.identity,

    Tree = daggy.taggedSum({
        Node: ['x', 'left', 'right'],
        Empty: []
    });

// Methods
Tree.of = function(x) {
    return Tree.Node(
        x,
        Tree.Empty,
        Tree.Empty
    );
};
Tree.empty = function() {
    return Tree.Empty;
};

// Derived
Tree.prototype.map = function(f) {
    var scope = this;
    return scope.cata({
        Empty: constant(scope),
        Node: function(x, l, r) {
            return Tree.Node(f(x), l.map(f), r.map(f));
        }
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = Tree;
