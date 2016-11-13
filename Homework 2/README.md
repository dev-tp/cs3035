Modify the table programme in chapter 6 of Eloquent JavaScript by

1. Adding a new constructor named `CenteredTextCell` that creates a cell where all the lines in the cell are centre-justified. That is, the draw method of this type of cell draws centred text (if there is an uneven number of padding spaces, put the extra one on either side). Test it by drawing a table with at least 2 row and 2 columns with centred text. (5pts)

2. Add a `BorderedCell` constructor that makes cells with a border. That is, the top of the cell has dashes (use single dash, don't use underscore) across it, as well as the bottom. For the sides, use a `|`. Test it by drawing a table with at least 2 row and 2 columns with bordered text. (5pts)

3. Write a function that makes a row number and the main data array and transforms all the text for all the cells in that row to uppercase. You must use `Array.prototype.map`. (5pts)

4. Write a function that takes a column number and the main data array and transforms all the text for all the cells in that column to uppercase. You must use `Array.prototype.map`. (5pts)

5. Write a function that takes a `Person`, define in chapter 5 of Eloquent JavaScript (used for the author's ancestry; make sure you include all the properties and define them exactly like they are defined in chapter 5), and converts it to a `BorderedCell` by taking all the information in the person and writing each one on a new line (along with the property name) to be displayed in the cell. Create a 3x3 matrix of 9 fictional (they can repeat). Using `Array.property.map`, write a function that takes a matrix of `Person`s and converts it to a matrix of `BorderedCell`s. User this function to transform your 3x3 array. Print out a table with this information using the table code. (10pts)

6. Using the function from #3 and #4, transform the first row of the above table to uppercase, and the last column, and redraw. __Note: If you don't do this step, you will not get credit for #3 and #4 because this is our way of making sure the functions work properly.__

Example output:

    Problem 1
    Bucco di Beppo $$$$
        Denny's     $

    Problem 2
    ---------------- ------
    |Bucco di Beppo| |$$$$|
    ---------------- ------
    ---------------- ------
    |Denny's       | |$   |
    ---------------- ------

    Problem 5
    ---------------------------- --------------------------- -------------------------
    |Name: Emma de Milliano    | |Name: Caralus Haverbeke  | |Name: Cad Have         |
    |Sex: f                    | |Sex: m                   | |Sex: m                 |
    |Born: 1876                | |Born: 1832               | |Born: 1900             |
    |Died: 1956                | |Died: 1905               | |Died: 1905             |
    |Father: Petrus de Milliano| |Father: Carel Haverbeke  | |Father: Carel Haverbeke|
    |Mother: Sophia van Damme  | |Mother: Maria van Brussel| |Mother: Carel Haverbeke|
    ---------------------------- --------------------------- -------------------------
    ---------------------------- --------------------------- -------------------------
    |Name: Emma de Milliano    | |Name: Caralus Haverbeke  | |Name: Cad Have         |
    |Sex: f                    | |Sex: m                   | |Sex: m                 |
    |Born: 1876                | |Born: 1832               | |Born: 1900             |
    |Died: 1956                | |Died: 1905               | |Died: 1905             |
    |Father: Petrus de Milliano| |Father: Carel Haverbeke  | |Father: Carel Haverbeke|
    |Mother: Sophia van Damme  | |Mother: Maria van Brussel| |Mother: Carel Haverbeke|
    ---------------------------- --------------------------- -------------------------
    ---------------------------- --------------------------- -------------------------
    |Name: Emma de Milliano    | |Name: Caralus Haverbeke  | |Name: Cad Have         |
    |Sex: f                    | |Sex: m                   | |Sex: m                 |
    |Born: 1876                | |Born: 1832               | |Born: 1900             |
    |Died: 1956                | |Died: 1905               | |Died: 1905             |
    |Father: Petrus de Milliano| |Father: Carel Haverbeke  | |Father: Carel Haverbeke|
    |Mother: Sophia van Damme  | |Mother: Maria van Brussel| |Mother: Carel Haverbeke|
    ---------------------------- --------------------------- -------------------------

    Problem 6 - demo of functions of problems 3 and 4
    ---------------------------- --------------------------- -------------------------
    |NAME: EMMA DE MILLIANO    | |NAME: CARALUS HAVERBEKE  | |NAME: CAD HAVE         |
    |SEX: F                    | |SEX: M                   | |SEX: M                 |
    |BORN: 1876                | |BORN: 1832               | |BORN: 1900             |
    |DIED: 1956                | |DIED: 1905               | |DIED: 1905             |
    |FATHER: PETRUS DE MILLIANO| |FATHER: CAREL HAVERBEKE  | |FATHER: CAREL HAVERBEKE|
    |MOTHER: SOPHIA VAN DAMME  | |MOTHER: MARIA VAN BRUSSEL| |MOTHER: CAREL HAVERBEKE|
    ---------------------------- --------------------------- -------------------------
    ---------------------------- --------------------------- -------------------------
    |Name: Emma de Milliano    | |Name: Caralus Haverbeke  | |NAME: CAD HAVE         |
    |Sex: f                    | |Sex: m                   | |SEX: M                 |
    |Born: 1876                | |Born: 1832               | |BORN: 1900             |
    |Died: 1956                | |Died: 1905               | |DIED: 1905             |
    |Father: Petrus de Milliano| |Father: Carel Haverbeke  | |FATHER: CAREL HAVERBEKE|
    |Mother: Sophia van Damme  | |Mother: Maria van Brussel| |MOTHER: CAREL HAVERBEKE|
    ---------------------------- --------------------------- -------------------------
    ---------------------------- --------------------------- -------------------------
    |Name: Emma de Milliano    | |Name: Caralus Haverbeke  | |NAME: CAD HAVE         |
    |Sex: f                    | |Sex: m                   | |SEX: M                 |
    |Born: 1876                | |Born: 1832               | |BORN: 1900             |
    |Died: 1956                | |Died: 1905               | |DIED: 1905             |
    |Father: Petrus de Milliano| |Father: Carel Haverbeke  | |FATHER: CAREL HAVERBEKE|
    |Mother: Sophia van Damme  | |Mother: Maria van Brussel| |MOTHER: CAREL HAVERBEKE|
    ---------------------------- --------------------------- -------------------------

You are limited to using high order functions for the lab; otherwise, you will receive no credit.