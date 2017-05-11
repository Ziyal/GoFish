
function Card(val, suit){
  var cardNames = ["Joker", "Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

  this.val = val;
  this.suit = suit;
  if(val < 14){
    this.name = cardNames[val];
  }

  this.show = function(){
    console.log(this.name + " of " + this.suit);
  }

}

function Deck(){

  var deck = [];
  var discardPile = [];
  var suits = ["Clubs", "Spades", "Hearts", "Diamonds"]

  this.reset = function(){
    deck = [];
    for (var i = 0; i < suits.length; i++){
      for(var j = 1; j <= 13; j++){
        deck.push(new Card(j, suits[i]));
      }
    }
  }

  this.printDeck = function(){
    for(i = 0; i < deck.length; i++){
      console.log(deck[i].name + " of " + deck[i].suit);
    }
  }

  this.shuffle = function(){
    for(i = 0; i < deck.length - 1; i++){
      var tempCard = deck[i];
      var swapCardPos =   Math.floor(Math.random() * (deck.length - i) + i);
      deck[i] = deck[swapCardPos];
      deck[swapCardPos] = tempCard;
    }
  }

  this.deal = function(){
    return deck.pop();
  }

  this.receiveDiscard = function(card){
    discardPile.push(card);
  }
}

function Player(name){
  this.name = name;
  this.hand = [];
  this.matches = 0;

  this.draw = function(deck){
    this.hand.push(deck.deal());
  }

  this.discard = function(deck){
    deck.receiveDiscard(this.hand.pop());
  }

  this.showHand = function(){
    for(i = 0; i < this.hand.length; i++){
      this.hand[i].show();
    }
  }

  this.ask = function(card){
    var matchCards = [];
    for(var i = 0; i < this.hand.length; i++){
      if(this.hand[i].val === card.val){
        matchCards.push(this.hand.splice(i, 1)[0]);
        i--;
      }
    }
    return matchCards;
  }

  this.checkMatches = function(){
      for(var i = 0; i < this.hand.length; i++){
        var duplicates = [i];
        for(var j = i + 1; j < this.hand.length; j++){
          if(this.hand[i].val === this.hand[j].val){
            duplicates.push(j);
          }
        }
        if(duplicates.length === 4){
          this.matches++;
          for(var k = 0; k < duplicates.length; k++){
            console.log("Removing: " + this.hand[duplicates[k]-k].name)
            this.hand.splice(duplicates[k] - k, 1);
          }
        }
      }
    }
}
