var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),
    monoid = require('fantasy-check/src/laws/monoid'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),

    Identity = require('fantasy-identities'),
    Tree = require('../fantasy-trees').FingerTree,

    constant = combinators.constant,
    identity = combinators.identity;

function concat(a, b) {
    return a.concat(b);
}

function show(a) {
    var x = '';
    a.map(function(a) {
        x = a;
    });
    return '[' + x + ']';
}

function run(a) {
    return Identity.of(show(a));
}

exports.tree = {
    
    // Functor tests
    'All (Functor)': functor.laws(λ)(Tree.of, run),
    'Identity (Functor)': functor.identity(λ)(Tree.of, run),
    'Composition (Functor)': functor.composition(λ)(Tree.of, run),

    // Manual tests
};
