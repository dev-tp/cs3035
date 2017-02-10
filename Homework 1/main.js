function battle(player, challenge) {
  var message = 'You encountered a ' + challenge.name +
    '!\nWhat do you want do? [melee, defend, escape]';

  while (true) {
    var defenseMode = false;
    var response = prompt(message);

    // TODO Add a chance of dealing critical damage for both player and foe
    if (response == 'melee' || response == 'm') {
      challenge.hitPoints -= player.attackPoints;

      if (challenge.hitPoints < 0)
        challenge.hitPoints = 0;

      message = 'You hit the ' + challenge.name +
        '\n' + challenge.name + '\'s lifepoints: ' + challenge.hitPoints;

      alert(message);

      if (challenge.hitPoints <= 0) {
        message = 'You defeated the ' + challenge.name +
          '!\nYou earned a ' + challenge.prize.name + '!';

        alert(message);

        player.bag.push(challenge.prize);

        return false;
      }
    } else if (response == 'defend' || response == 'd') {
      defenseMode = true;
    } else {
      break;
    }

    // 10% chance of opponent missing
    if (Math.floor(Math.random() * 10) != 0 && !defenseMode) {
      player.hitPoints -= challenge.attackPoints;

      if (player.hitPoints <= 0) {
        alert('Game Over!');

        response = prompt('Do you want to play again? [yes/no]');

        if (response == 'yes' || response == 'y')
          window.onload();
        else
          return true;
      }

      alert('The ' + challenge.name + ' hit you!\n' + 'You have ' +
        player.hitPoints + ' lifepoints');
    } else if (defenseMode) {
      alert('You shield against the ' + challenge.name + '\'s attack!');
    } else {
      alert('The ' + challenge.name + ' missed!');
    }

    message = challenge.name + '\'s lifepoints: ' + challenge.hitPoints +
      '\nYour lifepoints: ' + player.hitPoints +
        '\nWhat do you want to do? [melee, defend, escape]';
  }

  return true;
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

  challenges.push({ name: 'Badass Skag', attackPoints: 15, hitPoints: 80, prize: null, location: null });
  challenges.push({ name: 'Loot Midget', attackPoints: 15, hitPoints: 100, prize: null, location: null });
  challenges.push({ name: 'Slagged Thresher', attackPoints: 10, hitPoints: 50, prize: null, location: null });

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
      alert('You made it! You reached the end of the level!');

      var response = prompt('Do you want to play again? [yes/no]');

      if (response == 'yes' || response == 'y')
        window.onload();

      // TODO Find a way to end the game

      return;
    } else if (map[position[0]][position[1]] == 'C') {
      if (battle(player, getChallengeAtPosition(challenges, position)))
        return;
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
