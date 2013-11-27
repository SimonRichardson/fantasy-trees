var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),
    monoid = require('fantasy-check/src/laws/monoid'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),

    Identity = require('fantasy-identities'),
    Tree = require('../fantasy-trees'),

    identity = combinators.identity;

function concat(a, b) {
    return a.concat(b);
}

function show(a) {
    return '[' + a.fold([], concat).toString() + ']';
}

function run(a) {
    return Identity.of(show(a));
}

exports.list = {

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

    // Monoid tests
    'All (Monoid)': monoid.laws(λ)(Tree, run),
    'leftIdentity (Monoid)': monoid.leftIdentity(λ)(Tree, run),
    'rightIdentity (Monoid)': monoid.rightIdentity(λ)(Tree, run),
    'associativity (Monoid)': monoid.associativity(λ)(Tree, run)

    // Manual tests
};
