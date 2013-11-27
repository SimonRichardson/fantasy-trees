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
Tree.prototype.chain = function(f) {
    var scope = this;
    return scope.cata({
        Empty: constant(scope),
        Node: function(x, l, r) {
            return f(x, l.chain(f), r.chain(f));
        }
    });
};

// Derived
Tree.prototype.ap = function(a) {
    return this.chain(function(f) {
        return a.map(f);
    });
};
Tree.prototype.map = function(f) {
    return this.chain(function(x, l, r) {
        return Tree.Node(f(x), l, r);
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = Tree;
