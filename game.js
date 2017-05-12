function Game(){
  this.player = new Player("Player");
  this.cpu = new Player("CPU");
  this.myDeck = new Deck();
  this.myDeck.reset();
  this.myDeck.shuffle();

  for (var i = 0; i < 5; i++){
    this.player.draw(this.myDeck);
    this.cpu.draw(this.myDeck);
  }
}

function displayHand(pH){
  $("#playerHand").empty();

  for(i = 0; i < pH.length; i++){
    var newHTML = "";
    newHTML += "<div class='card' alt='" + i + "'>";
    newHTML += "<img src='images/" + pH[i].val + pH[i].suit + ".png'>";
    newHTML += "</div>";
    $("#playerHand").append(newHTML)
  };
}

function displayScore(player, cpu){
  $("#scores").empty();
  $("#scores").append("<p class='scoreText'>" + player.name + " score: " + player.matches + "</p>");
  $("#scores").append("<p class='scoreText'>" + cpu.name + " score: " + cpu.matches + "</p>");
}

$(document).ready(function(){
  var game = new Game();
  var pH = game.player.hand;
  var cpuH = game.cpu.hand;
  var turn = 1;

  displayHand(pH);
  displayScore(game.player, game.cpu);

  $(document).on("click", ".card", function(){

    if(turn === 1){
      var cardPos = $(this).attr("alt");
      var lookingFor = pH[cardPos];
      var matchCards = game.cpu.ask(lookingFor);
      if(matchCards.length < 1){
        $("#messages").text("Go Fish.");
        game.player.draw(game.myDeck);
        game.player.checkMatches();
        turn = 2;
        cpuTurn();
      }
      else{
        for(var i = 0; i < matchCards.length; i++){
          $('#messages').text("CPU had " + matchCards.length + " card: " + matchCards[0].name + " of " + matchCards[0].suit);
          pH.push(matchCards[i]);
          game.player.checkMatches();
        }
      }
      $("#messages").text(checkWin());
      displayHand(pH);
      displayScore(game.player, game.cpu);
    }
  });

  function cpuTurn(){
    while(turn === 2){
      var randPicker = cpuH[Math.floor(Math.random() * cpuH.length)];
      var matchCards = game.player.ask(randPicker);
      if(matchCards.length < 1){
        $("#messages").text("CPU asked for " + randPicker.name + " of " + randPicker.suit + " and went Go Fish");
        game.cpu.draw(game.myDeck);
        game.cpu.checkMatches();
        turn = 1;
      }
      else{
        for(var i = 0; i < matchCards.length; i++){
          cpuH.push(matchCards[i]);
          game.cpu.checkMatches();
        }
      }
      $("#messages").text(checkWin());
    }
  }

    function checkWin() {
      if(game.player.hand.length === 0 || game.cpu.hand.length === 0){
        turn = 3;
        var winText = "";
        if(game.player.matches > game.cpu.matches) {
          winText = "Hooray, you won!";
        }
        else if (game.player.matches < game.cpu.matches) {
          winText = "Sorry, you lost";
        }
        else if (game.player.matches === game.cpu.matches){
          wintText = "You tied!";
        }
        return winText;
      } 
    }
});