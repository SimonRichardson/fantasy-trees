# Fantasy Tree

This library implements purely functional, monadic homogenous tree 
data structure.

## Types

The current implementation of Fantasy Tree has two type different
structures.

* Binary Tree
* Finger Tree

### Binary Tree

The Binary Tree is a non-balanced possible empty tree structure. It's
currently only a Functor and Applicative Functor, although with a 
bit of effort could become a Monoid as concatenation of the tree is
quite complex.

### Finger Tree

The Finger Tree is a non-balanced non-empty tree structure. It's 
currently only a Functor.

## Fantasy Land Compatible

[
  ![](https://raw.github.com/fantasyland/fantasy-land/master/logo.png)
](https://github.com/fantasyland/fantasy-land)
