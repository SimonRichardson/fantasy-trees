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
    return this.fold(
        Tree.Empty,
        function(a, b, c, d) {
            return a.concat(f(b, c, d));
        }
    );
};
Tree.prototype.fold = function(v, f) {
    var rec = function(a, b) {
        return a.cata({
            Empty: constant(b),
            Node: function(x, y, z) {
                return f(b, x, rec(y, b), rec(z, b));
            }
        });
    };
    return rec(this, v);
};

// Derived
Tree.prototype.ap = function(a) {
    return this.chain(function(f) {
        return a.map(f);
    });
};
Tree.prototype.concat = function(x) {
    return this.fold(x, function(a, b) {
        return a.cata({
            Empty: function() {
                return Tree.of(b);
            },
            Node: function(x, y, z) {
                return Tree.Node(b, y, z);
            }
        });
    });
};
Tree.prototype.map = function(f) {
    return this.chain(function(x, y, z) {
        return Tree.Node(f(x), y.map(f), z.map(f));
    });
};

// Export
if(typeof module != 'undefined')
    module.exports = Tree;
