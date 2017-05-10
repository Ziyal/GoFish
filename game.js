
function Game(){
  this.player = new Player("Player 1");
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
    newHTML += "<h2>" + pH[i].name + " of " + pH[i].suit + "</h2>";
    newHTML += "</div>";
    $("#playerHand").append(newHTML)
  };
}

function displayScore(player, cpu){
  console.log("appendstuff")
  $("#scores").empty();
  $("#scores").append("<p>" + player.name + " score: " + player.matches + "</p>");
  $("#scores").append("<p>" + cpu.name + " score: " + cpu.matches + "</p>");
}



$(document).ready(function(){
  var game = new Game();
  var pH = game.player.hand;
  var cpuH = game.cpu.hand;
  var turn = 1;
  game.cpu.showHand();

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
          pH.push(matchCards[i]);
          game.player.checkMatches();
        }
      }
      displayHand(pH);
      displayScore(game.player, game.cpu);
  // remember to remove our cheating
      console.log(" ")
      console.log(" ")
      console.log("**********************************************");
      game.cpu.showHand();
    }
  });

  function cpuTurn(){
    while(turn === 2){
      var matchCards = game.player.ask(cpuH[Math.floor(Math.random() * cpuH.length)]);
      if(matchCards.length < 1){
        $("#messages").text("CPU can Go Fish.");
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
    }
  }




});
