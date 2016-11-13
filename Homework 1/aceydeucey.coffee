readline = require 'readline'


checkIfCardIsInBetween = (hand) ->
  lastCard = hand.pop() % 13

  [hand[0], hand[1]] = [hand[1], hand[0]] if hand[0] % 13 > hand[1] % 13

  if hand[0] % 13 <= lastCard and lastCard <= hand[1] % 13 then true else false


displayCard = (value) ->
  suit = Math.floor value / 13
  rank = value % 13

  suit = if suit == 0 then 'Clubs' else if suit == 1 then 'Diamonds' else if suit == 2 then 'Hearts' else 'Spades'
  rank = if rank == 0 then 'Ace' else if rank == 10 then 'Jack' else if rank == 11 then 'Queen' else if rank == 12 then 'King' else rank + 1

  console.log "#{suit} of #{rank}"


emptyDeck = (deck) -> if deck.length <= 1 then true else false


generateDealerHand = (deck) -> (deck.pop() for [1..3])


repopulate = (deck) ->
  for i in [0..51]
    deck.push i
  shuffle deck


shuffle = (deck) ->
  for i in [0...deck.length]
    r = Math.floor Math.random() * deck.length
    [deck[i], deck[r]] = [deck[r], deck[i]] if i != r


dealerHand = null
deck = []
houseMoney = 500
userMoney = 200

repopulate deck

stdin = readline.createInterface process.stdin, process.stdout

stdin.question 'Welcome! Enter 1 to play, 0 to quit: ', (line) ->
  process.exit() if line == '0'
  console.log "Your money: $#{userMoney}"
  console.log "House money: $#{houseMoney}"

  dealerHand = generateDealerHand deck
  console.log "\nThe cards are:"
  displayCard dealerHand[0]
  displayCard dealerHand[1]
  process.stdout.write 'How much would you like to bet? $'

stdin.on('line', (bet) ->
  console.log "\nThe card was:"
  displayCard dealerHand[2]

  if checkIfCardIsInBetween dealerHand
    houseMoney -= parseInt bet
    userMoney += parseInt bet
  else
    houseMoney += parseInt bet
    userMoney -= parseInt bet

  if userMoney <= 0
    console.log 'You lost the game :('
    process.exit()
  else if houseMoney <= 0
    console.log 'You won the game! :D'
    process.exit()

  repopulate deck if emptyDeck deck

  console.log "Your money: $#{userMoney}"
  console.log "House money: $#{houseMoney}"

  dealerHand = generateDealerHand deck
  console.log "\nThe cards are:"
  displayCard dealerHand[0]
  displayCard dealerHand[1]
  process.stdout.write 'How much would you like to bet? $'
).on('close', -> process.exit 0)
