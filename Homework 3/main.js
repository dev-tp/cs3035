function Challenge(name, attackPoints, hitPoints) {
  this.attackPoints = attackPoints;
  this.hitPoints = hitPoints;
  this.name = name;
}

function battle(player, challenge) {
  var message = 'You encountered a ' + challenge.name +
    '!\nWhat do you want do? [melee, defend, escape]';

  while (true) {
    var defenseMode = false;
    var chance = Math.floor(Math.random() * 10);
    var response = prompt(message);

    if (response == 'melee' || response == 'm') {
      if (chance == 0 || chance == 1) {
        challenge.hitPoints -= player.attackPoints * 2;
        alert('Critical!');
      } else {
        challenge.hitPoints -= player.attackPoints;
      }

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

    if ((chance != 0 || chance != 1) && !defenseMode) {
      chance = Math.floor(Math.random() * 10);

      if (chance == 0 || chance == 1) {
        player.hitPoints -= challenge.attackPoints * 2;
        alert('Critical!');
      } else {
        player.hitPoints -= challenge.attackPoints;
      }

      if (player.hitPoints < 0) {
        alert('Game Over!');
        location.reload();
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

  var availablePosition = availablePositions.pop();

  map[availablePosition[0]][availablePosition[1]] = 'P';
  player.startingPosition = availablePosition;
  player.position = availablePosition;

  challenges.push(new Challenge('Badass Skag', 15, 80));
  challenges.push(new Challenge('Loot Midget', 15, 100));
  challenges.push(new Challenge('Slagged Thresher', 10, 50));

  var prizes = [];

  prizes.push({ name: 'Dahl SandHawk', value: 2500 });
  prizes.push({ name: 'Hyperion Interfacer', value: 2600 });
  prizes.push({ name: 'Maliwan HellFire', value: 1000 });

  shuffle(prizes);

  for (var i = 0; i < 3; i++) {
    availablePosition = availablePositions.pop();

    map[availablePosition[0]][availablePosition[1]] = 'C';

    challenges[i].location = availablePosition;
    challenges[i].prize = prizes[i];
  }

  availablePosition = availablePositions.pop();
  map[availablePosition[0]][availablePosition[1]] = 'G';
}

function isValidMove(map, position) {
  var x = position[0];
  var y = position[1];

  return (-1 < x && x < 8) && (-1 < y && y < 8) && map[x][y] != 'W';
}

function movePlayer(map, tiles, challenges, player, direction) {
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
      map[position[0]][position[1]] = 'P';

      printMap(map, tiles);
      alert('You made it! You reached the end of the level!');
      location.reload();

    } else if (map[position[0]][position[1]] == 'B' || map[position[0]][position[1]] == 'C') {
      map[position[0]][position[1]] = 'B';

      printMap(map, tiles);

      if (battle(player, getChallengeAtPosition(challenges, position)))
        return;
    }

    player.previousPosition = player.position.slice();
    player.position = position.slice();

    map[player.previousPosition[0]][player.previousPosition[1]] = ' ';
    map[player.startingPosition[0]][player.startingPosition[1]] = 'S';

    map[position[0]][position[1]] = 'P';

    printMap(map, tiles);
  }
}

function printMap(map, tiles) {
  var count = 0;

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (map[i][j] == 'B')
        tiles[count].style.background = '#ff7907';
      else if (map[i][j] == 'G')
        tiles[count].style.background = '#0ff';
      else if (map[i][j] == 'P')
        tiles[count].style.background = '#237bad';
      else if (map[i][j] == 'S')
        tiles[count].style.background = '#00f';
      else if (map[i][j] == 'W')
        tiles[count].style.background = '#000';
      else if (map[i][j] == ' ')
        tiles[count].style.background = '#87cefa';
      count++;
    }
  }
}

function shuffle(list) {
  for (var i = 0; i < list.length; i++) {
    var r = Math.floor(Math.random() * list.length);
    if (i != r)
      list[i] = [list[r], list[r] = list[i]][0];
  }
}

$(document).ready(function() {
  var availablePositions = [];
  var challenges = [];
  var map = [];
  var player = {
    attackPoints: 20,
    bag: [],
    hitPoints: 100,
    movedPositions: []
  };
  var tiles = $('.tile');

  $(document).on('keydown', function(event) {
    if (event.key == 'w' || event.key == 'ArrowUp')
      movePlayer(map, tiles, challenges, player, 'up');
    else if (event.key == 's' || event.key == 'ArrowDown')
      movePlayer(map, tiles, challenges, player, 'down');
    else if (event.key == 'a' || event.key == 'ArrowLeft')
      movePlayer(map, tiles, challenges, player, 'left');
    else if (event.key == 'd' || event.key == 'ArrowRight')
      movePlayer(map, tiles, challenges, player, 'right');
  });

  $('#up').click(function() {
    movePlayer(map, tiles, challenges, player, 'up');
  });

  $('#down').click(function() {
    movePlayer(map, tiles, challenges, player, 'down');
  });

  $('#left').click(function() {
    movePlayer(map, tiles, challenges, player, 'left');
  });

  $('#right').click(function() {
    movePlayer(map, tiles, challenges, player, 'right');
  });

  init(player, map, availablePositions, challenges);
  printMap(map, tiles);
});
