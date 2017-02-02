# Lab Two

## 1. Staircase

Write a function that takes in an integer `n` and prints out a staircase to the console like this [for `n = 4`]:

       #
      #*
     #**
    #***

It should be able to handle any `n` up to 50. If `n` is greater than 50, the function should print the string, `Not available`. (2pts)

## 2. a[i] < a[j] && (a[i] + a[j]) % n == 0

Read the following on [arrays](http://www.w3schools.com/js/js_arrays.asp). Write a function that takes an array of  integers, and a positive integer, `n`. The function finds the number of pairs `(i, j)` in the array where `i < j` and `i + j` is evenly divisible by `n`. Call the function with a sample array and a number, and `console.log()` the result. (3pts)

**Sample Input:**

    problemTwo([1, 3, 2, 6, 1, 2], 3);

**Sample Output:**

    5

> **Note:** Bruteforce is okay.

## 3. Sum Two

Given an array `a` and an integer `n`, and count all the pairs of in the array that add up to `n`. Bruteforce is acceptable, but for 2 points extra credit, come up with an algorithm that finds this in O(n). For the extra credit, explain, in your own words, why it works. (3pts)

## 4. Landscape Plus

Create a landscape function as we did in class, except that it has lakes `~~~~`, mountains `/'''\`, deserts `****`, forests `YYYYYYY`, and fences `XXXXXX`. Your landscape function should take the following parameters: `lakeSize`, `mountainSize`, `desertSize`, `forestSize`, and `fenceSize`. The inner functions [see slides] should take the appropriate parameters passed into the main function. These functions should be called within the main function to produce the resulting string. Make up some parameters in your script, call the function with them, and print the string to console separately. (3pts)
