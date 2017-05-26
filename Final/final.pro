% Part 1
daughter(Person, Parent) :- female(Person), parent(Parent, Person).
son(Person, Parent) :- male(Person), parent(Parent, Person).

father(Person, Child) :- male(Person), parent(Person, Child).
mother(Person, Child) :- female(Person), parent(Person, Child).

brother(Person, Sibling) :- male(Person), parent(Parent, Person), parent(Parent, Sibling), not(Person = Sibling).
sister(Person, Sibling) :- female(Person), parent(Parent, Person), parent(Parent, Sibling), not(Person = Sibling).

aunt(Person, NieceOrNephew) :- sister(Person, Parent), parent(Parent, NieceOrNephew).
uncle(Person, NieceOrNephew) :- brother(Person, Parent), parent(Parent, NieceOrNephew).

grandfather(Person, GrandChild) :- male(Person), parent(Person, Someone), parent(Someone, GrandChild).
grandmother(Person, GrandChild) :- female(Person), parent(Person, Someone), parent(Someone, GrandChild).

female(betty).
female(mary).
female(sarah).
female(susan).
female(terry).
male(bob).
male(dan).
male(george).
male(mike).
male(rick).

parent(bob, rick).
parent(bob, betty).
parent(sarah, rick).
parent(sarah, betty).

parent(rick, dan).
parent(rick, george).
parent(susan, dan).
parent(susan, george).

parent(betty, terry).
parent(betty, mary).
parent(mike, terry).
parent(mike, mary).

% Part 2
last_one(X, [X]).
last_one(X, [_ | L]) :- last_one(X, L).

last_but_one(X, [X, _]).
last_but_one(X, [_, H | T]) :- last_but_one(X, [H | T]).
