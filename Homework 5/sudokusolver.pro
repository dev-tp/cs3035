% Required module to make ins work
:- use_module(library(clpfd)).

% Example by Markus Triska, taken from the SWI-Prolog manual.

sudoku(Rows) :-
  length(Rows, 16), maplist(same_length(Rows), Rows),
  append(Rows, Vs), Vs ins 65..80, % A to P
  maplist(all_distinct, Rows),
  transpose(Rows, Columns),
  maplist(all_distinct, Columns),
  Rows = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P],
  blocks(A, B, C, D), blocks(E, F, G, H), blocks(I, J, K, L), blocks(M, N, O, P).

blocks([], [], [], []).

blocks([A, B, C, D | Bs1], [E, F, G, H | Bs2], [I, J, K, L | Bs3], [M, N, O, P | Bs4]) :-
  all_distinct([A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P]),
  blocks(Bs1, Bs2, Bs3, Bs4).

printLine([]) :- nl.
printLine([H | T]) :-
  char_code(Result, H),
  atom_concat(Result, ' ', Line),
  write(Line),
  printLine(T).

printRowsAsASCII([]).
printRowsAsASCII([H | T]) :-
  printLine(H),
  printRowsAsASCII(T).

problem(1, [[65,  _,  _, 66,  67, 68,  _,  _,  76,  _, 70,  _,   _,  _, 71,  _],
            [ _,  _, 72,  _,   _,  _, 71,  _,   _, 67,  _,  _,  73, 74, 70, 75],
            [ _, 76,  _,  _,  74,  _,  _, 65,   _, 77,  _, 75,   _,  _, 78,  _],
            [67,  _,  _, 79,  66,  _,  _, 78,   _,  _,  _, 73,   _,  _, 76,  _],

            [77,  _,  _,  _,  72,  _,  _, 74,   _, 76, 66,  _,  65, 79,  _,  _],
            [ _, 75, 71, 70,   _,  _,  _, 80,   _,  _,  _, 79,   _,  _, 69, 77],
            [ _,  _,  _, 74,   _, 69, 79,  _,   _, 68,  _, 72,   _,  _, 75,  _],
            [80,  _,  _, 69,  73, 76,  _,  _,  65,  _,  _,  _,   _,  _, 72,  _],

            [ _, 66,  _,  _,   _,  _,  _, 77,   _,  _, 76, 69,  72,  _,  _, 67],
            [ _, 77,  _,  _,  79,  _, 67,  _,   _, 78, 72,  _,  80,  _,  _,  _],
            [69, 72,  _,  _,  65,  _,  _,  _,  66,  _,  _,  _,  77, 73, 79,  _],
            [ _,  _, 76, 68,   _, 70, 80,  _,  77,  _,  _, 71,   _,  _,  _, 69],

            [ _, 67,  _,  _,  76,  _,  _,  _,  70,  _,  _, 68,  75,  _,  _, 80],
            [ _, 71,  _,  _,  80,  _, 69,  _,  78,  _,  _, 65,   _,  _, 66,  _],
            [75, 65, 79, 73,   _,  _, 77,  _,   _, 66,  _,  _,   _, 78,  _,  _],
            [ _, 78,  _,  _,   _, 75,  _, 66,   _,  _, 77, 67,  69,  _,  _, 76]]).

main :-
  problem(1, Rows),
  sudoku(Rows),
  printRowsAsASCII(Rows).
