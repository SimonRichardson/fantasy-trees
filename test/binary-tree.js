var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),
    monoid = require('fantasy-check/src/laws/monoid'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),

    Identity = require('fantasy-identities'),
    Tree = require('../fantasy-trees').BinaryTree,

    constant = combinators.constant,
    identity = combinators.identity;

function ord(x) {
    return function(y) {
        return x < y ? -1 : x > y ? 1 : 0;
    };
}

function show(a) {
    var x = '';
    a.map(function(a) {
        x += a;
    });
    return '[' + x + ']';
}

function run(a) {
    return Identity.of(show(a));
}

exports.tree = {

    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(Tree, run),
    'Identity (Applicative)': applicative.identity(λ)(Tree, run),
    'Composition (Applicative)': applicative.composition(λ)(Tree, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Tree, run),
    'Interchange (Applicative)': applicative.interchange(λ)(Tree, run),
    
    // Functor tests
    'All (Functor)': functor.laws(λ)(Tree.of, run),
    'Identity (Functor)': functor.identity(λ)(Tree.of, run),
    'Composition (Functor)': functor.composition(λ)(Tree.of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(Tree, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Tree, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Tree, run),
    'Associativity (Monad)': monad.associativity(λ)(Tree, run),
    
    // Manual tests
    'when testing insert should be correct value': function(test) {
        var a = Tree.of(1).insert(2, ord).insert(3, ord);
        test.equal(show(a), '[321]');
        test.done();
    },
    'when testing contains should be correct value': function(test) {
        var a = Tree.of(1).insert(2, ord).insert(3, ord);
        test.ok(a.contains(ord(2)));
        test.done();
    }
};
