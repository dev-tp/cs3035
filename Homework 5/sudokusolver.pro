% Render solutions nicely.
% :- use_rendering(sudoku).

% Required module to make ins work
:- use_module(library(clpfd)).

% Example by Markus Triska, taken from the SWI-Prolog manual.

sudoku(Rows) :-
  length(Rows, 16), maplist(same_length(Rows), Rows),
  append(Rows, Vs), Vs ins 1..16,
  maplist(all_distinct, Rows),
  transpose(Rows, Columns),
  maplist(all_distinct, Columns),
  Rows = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P],
  blocks(A, B, C, D), blocks(E, F, G, H), blocks(I, J, K, L), blocks(M, N, O, P).

blocks([], [], [], []).

blocks([A, B, C, D | Bs1], [E, F, G, H | Bs2], [I, J, K, L | Bs3], [M, N, O, P | Bs4]) :-
  all_distinct([A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]),
  blocks(Bs1, Bs2, Bs3, Bs4).

problem(1, [[ 1,  _,  _,  2,   3,  4,  _,  _,  12,  _,  6,  _,   _,  _,  7,  _],
            [ _,  _,  8,  _,   _,  _,  7,  _,   _,  3,  _,  _,   9, 10,  6, 11],
            [ _, 12,  _,  _,  10,  _,  _,  1,   _, 13,  _, 11,   _,  _, 14,  _],
            [ 3,  _,  _, 15,   2,  _,  _, 14,   _,  _,  _,  9,   _,  _, 12,  _],

            [13,  _,  _,  _,   8,  _,  _, 10,   _, 12,  2,  _,   1, 15,  _,  _],
            [ _, 11,  7,  6,   _,  _,  _, 16,   _,  _,  _, 15,   _,  _,  5, 13],
            [ _,  _,  _, 10,   _,  5, 15,  _,   _,  4,  _,  8,   _,  _, 11,  _],
            [16,  _,  _,  5,   9, 12,  _,  _,   1,  _,  _,  _,   _,  _,  8,  _],

            [ _,  2,  _,  _,   _,  _,  _, 13,   _,  _, 12,  5,   8,  _,  _,  3],
            [ _, 13,  _,  _,  15,  _,  3,  _,   _, 14,  8,  _,  16,  _,  _,  _],
            [ 5,  8,  _,  _,   1,  _,  _,  _,   2,  _,  _,  _,  13,  9, 15,  _],
            [ _,  _, 12,  4,   _,  6, 16,  _,  13,  _,  _,  7,   _,  _,  _,  5],

            [ _,  3,  _,  _,  12,  _,  _,  _,   6,  _,  _,  4,  11,  _,  _, 16],
            [ _,  7,  _,  _,  16,  _,  5,  _,  14,  _,  _,  1,   _,  _,  2,  _],
            [11,  1, 15,  9,   _,  _, 13,  _,   _,  2,  _,  _,   _, 14,  _,  _],
            [ _, 14,  _,  _,   _, 11,  _,  2,   _,  _, 13,  3,   5,  _,  _, 12]]).

main :-
  problem(1, Rows),
  sudoku(Rows),
  maplist(portray_clause, Rows).
