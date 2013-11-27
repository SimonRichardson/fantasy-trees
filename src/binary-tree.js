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
        Node: function(x, y, z) {
            return f(x, y.chain(f), z.chain(f));
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
    return this.chain(function(x, y, z) {
        return Tree.Node(f(x), y, z);
    });
};

Tree.prototype.insert = function(a, f) {
    return this.cata({
        Empty: function() {
            return Tree.of(a);
        },
        Node: function(x, y, z) {
            var b = f(x)(a);
            return b < 0 ? Tree.Node(x, y.insert(a, f), z) :
                    b > 0 ? Tree.Node(x, y, z.insert(a, f)) :
                            Tree.Node(x, y, z);
        }
    });
};
Tree.prototype.contains = function(f) {
    return this.cata({
        Empty: constant(false),
        Node: function(x, y, z) {
            var b = f(x);
            return b > 0 ? y.contains(f) :
                    b < 0 ? z.contains(f) :
                            true;
        }
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = Tree;
