repeat = (symbol, numberOfTimes, result) ->
  result = '' if result == undefined
  result += symbol for [0...numberOfTimes]
  result


staircase = (n) ->
  if n > 50
    console.log 'Not available'
    return

  for i in [0...n]
    step = '#' + repeat('*', i)
    displacement = n - step.length;
    console.log repeat(' ', displacement) + step


problemTwo = (a, n) ->
  count = 0

  for i in [0...a.length]
    for j in [0...a.length]
      count += 1 if a[i] < a[j] and (a[i] + a[j]) % n == 0

  console.log count


problemThree = (a, n) ->
  hashmap = {}
  count = 0

  for i in [0...a.length]
    difference = n - a[i]
    # if (difference in hashmap) in JavaScript
    count += 1 if difference of hashmap
    hashmap[a[i]] = i

  console.log count


landscapePlus = (lakeSize, moutainSize, desertSize, forestSize, fenceSize) ->

  flat = (flatSize) -> repeat('_', flatSize)

  desert = repeat('*', desertSize)
  fence = repeat('X', fenceSize)
  forest = repeat('Y', forestSize)
  lake = repeat('~', lakeSize)
  montain = repeat('\'', moutainSize, '/') + '\\'

  desert + flat(4) + fence + flat(3) + forest + flat(5) + lake + montain


staircase 5
staircase 51

problemTwo([1, 3, 2, 6, 1, 2], 3)

problemThree([2, 7, 11, 15], 9)

console.log landscapePlus(4, 3, 4, 7, 6)
