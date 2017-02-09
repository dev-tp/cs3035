readline = require 'readline'


checkIfCardIsInBetween = (hand) ->
  lastCard = hand.pop() % 13

  [hand[0], hand[1]] = [hand[1], hand[0]] if hand[0] % 13 > hand[1] % 13

  hand[0] % 13 <= lastCard and lastCard <= hand[1] % 13


displayCard = (suits, ranks, value) ->
  suit = suits[Math.floor value / 13]
  rank = ranks[value % 13]
  console.log "#{rank} of #{suit}"


emptyDeck = (deck) -> deck.length <= 1


generateDealerHand = (deck) -> (deck.pop() for [1..3])


repopulate = (deck) ->
  deck.push i for i in [0..51]
  shuffle deck


shuffle = (deck) ->
  for i in [0...deck.length]
    r = Math.floor Math.random() * deck.length
    [deck[i], deck[r]] = [deck[r], deck[i]] if i != r


dealerHand = null
deck = []
houseMoney = 500
userMoney = 200

suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

ranks = ['Ace']
ranks.push i for i in [2..10]
ranks.push s for s in ['Jack', 'Queen', 'King']
rank = ranks[rank]

repopulate deck

stdin = readline.createInterface process.stdin, process.stdout

stdin.question 'Welcome! Enter 1 to play, 0 to quit: ', (line) ->
  process.exit() if line == '0'
  console.log "Your money: $#{userMoney}"
  console.log "House money: $#{houseMoney}"

  dealerHand = generateDealerHand deck
  console.log "\nThe cards are:"
  displayCard suits, ranks, dealerHand[0]
  displayCard suits, ranks, dealerHand[1]
  process.stdout.write 'How much would you like to bet? $'

stdin.on('line', (bet) ->
  console.log "\nThe card was:"
  displayCard suits, ranks, dealerHand[2]

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
  displayCard suits, ranks, dealerHand[0]
  displayCard suits, ranks, dealerHand[1]
  process.stdout.write 'How much would you like to bet? $'
).on('close', -> process.exit 0)
