function battle(player, challenge) {
  console.log('You encountered a %s!', challenge.name);
  console.log('What do you want to do? [melee, defend, escape]');

  var warning = 'You encountered a ' + challenge.name +
    '!\nWhat do you want do? [melee, defend, escape]';

  while (true) {
    var response = prompt(warning);

    if (response == 'melee') {
      challenge.hitPoints -= player.attackPoints;

      console.log('You hit the %s!', challenge.name);
      console.log('[%s\'s lifepoints]: %d', challenge.name, challenge.hitPoints);

      if (challenge.hitPoints <= 0) {
        console.log('You defeated the %s!', challenge.name);
        console.log('You earned a %s!', challenge.prize.name);

        player.bag.push(challenge.prize);

        return true;
      }

    } else if (response == 'escape') {
      break;
    }

    console.log('The %s is about to attack!', challenge.name);

    warning = 'The ' + challenge.name +
      ' is about to attack!\nWhat do you want to do? [melee, defend, escape]';

    // Implement what opponent does here
  }

  return false;
}

function getChallengeAtPosition(challenges, position) {
  var x = position[0];
  var y = position[1];

  for (var i = 0; i < challenges.length; i++) {
    var location = challenges[i].location;
    if (location[0] == x && location[1] == y)
      return challenges[i];
  }

  return null; // Programme should never reach this point
}

function init(player, map, availablePositions, challenges) {
  for (var i = 0; i < 8; i++) {
    var row = [];
    for (var j = 0; j < 8; j++)
      row.push('-');
    map.push(row);
  }

  var walls = [
    [1, 6],
    [1, 3, 4, 5, 6],
    [3],
    [0, 1, 5, 6],
    [3, 4, 5, 6],
    [1, 3, 5, 6],
    [1, 5, 6],
    [1, 3, 4, 5]
  ];

  for (var i = 0; i < walls.length; i++)
    for (var j = 0; j < walls[i].length; j++)
      map[i][walls[i][j]] = 'W';

  for (var i = 0; i < 8; i++)
    for (var j = 0; j < 8; j++)
      if (map[i][j] == '-')
        availablePositions.push([i, j]);

  shuffle(availablePositions);

  // Add player to map
  var availablePosition = availablePositions.pop();

  map[availablePosition[0]][availablePosition[1]] = player.name.charAt(0);
  player.startingPosition = availablePosition;
  player.position = availablePosition;

  // TODO Add an array of attacks for each kind of enemy; add a chance of missing the attack as well.
  challenges.push({ name: 'Badass Skag', hitPoints: 80, prize: null, location: null });
  challenges.push({ name: 'Loot Midget', hitPoints: 100, prize: null, location: null });
  challenges.push({ name: 'Slagged Thresher', hitPoints: 50, prize: null, location: null });

  var prizes = [];

  prizes.push({ name: 'Dahl SandHawk', value: 2500 });
  prizes.push({ name: 'Hyperion Interfacer', value: 2600 });
  prizes.push({ name: 'Maliwan HellFire', value: 1000 });

  shuffle(prizes);

  // Add at least three challenges to the map
  for (var i = 0; i < 3; i++) {
    availablePosition = availablePositions.pop();

    map[availablePosition[0]][availablePosition[1]] = 'C';

    challenges[i].location = availablePosition;
    challenges[i].prize = prizes[i];
  }

  // Let's not forget to add a goal
  availablePosition = availablePositions.pop();
  map[availablePosition[0]][availablePosition[1]] = 'G';
}

function isValidMove(map, position) {
  var x = position[0];
  var y = position[1];

  return (-1 < x && x < 8) && (-1 < y && y < 8) && map[x][y] != 'W';
}

function movePlayer(map, challenges, player, direction) {
  var position = player.position.slice();

  if (direction == 'up')
    position[0]--;
  else if (direction == 'down')
    position[0]++;
  else if (direction == 'left')
    position[1]--;
  else
    position[1]++;

  if (isValidMove(map, position)) {
    if (map[position[0]][position[1]] == 'G') {
      map[player.position[0]][player.position[1]] = ' ';
      map[position[0]][position[1]] = player.name.charAt(0);

      printMap(map);
      console.log('You made it! You reached the end of the level!');

      return;
    } else if (map[position[0]][position[1]] == 'C') {
      battle(player, getChallengeAtPosition(challenges, position));

      // battle() will return a boolean value; if battle returns true,
      // the challenge tile be left blank and the challenge's prize will
      // be collected. Otherwise, it will the tile will be left alone,
      // meaning the player decided to escape.

      // return;
    }

    player.previousPosition = player.position.slice();
    player.position = position.slice();

    map[player.previousPosition[0]][player.previousPosition[1]] = ' ';
    map[player.startingPosition[0]][player.startingPosition[1]] = 'S';

    map[position[0]][position[1]] = player.name.charAt(0);
  }

  printMap(map);
  console.log();
}

function printMap(map) {
  for (var i = 0; i < 8; i++)
    console.log(map[i].join(' '));
}

function shuffle(list) {
  for (var i = 0; i < list.length; i++) {
    var r = Math.floor(Math.random() * list.length);
    if (i != r)
      list[i] = [list[r], list[r] = list[i]][0];
  }
}

window.onload = function() {
  var availablePositions = [];
  var challenges = [];
  var map = [];
  var player = {
    attackPoints: 20,
    bag: [],
    hitPoints: 100,
    movedPositions: [],
    name: 'Player',
    position: null,
    previousPosition: null,
    startingPosition: null
  };

  document.body.addEventListener('keyup', function(event) {
    if (event.key == 'w' || event.key == 'ArrowUp')
      movePlayer(map, challenges, player, 'up');
    else if (event.key == 's' || event.key == 'ArrowDown')
      movePlayer(map, challenges, player, 'down');
    else if (event.key == 'a' || event.key == 'ArrowLeft')
      movePlayer(map, challenges, player, 'left');
    else if (event.key == 'd' || event.key == 'ArrowRight')
      movePlayer(map, challenges, player, 'right');
  });

  init(player, map, availablePositions, challenges);
  printMap(map);
};
