var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
//listener of key
$(document).keydown(function() {
  if (!started) {
    level = 0;
    nextSequence();
    started = true;
  }
});
// Listener of all the four buttons
$(".btn").click(function() {
  var clr = $(this).attr("id");
  handler(clr);
  animatePress(clr);
  playSound(clr);
});
//Pattern Generator
function nextSequence() {
  ++level;
  $("h1").text("Level " + level);
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}
//Checker
function checkAnswer(currentLevel){
  if(started===true && gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    setTimeout(nextSequence,1000);
  }
  else if(started===true && gamePattern[currentLevel]!==userClickedPattern[currentLevel]){
    started=false ;
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
    gamePattern=[];
  }
}
//Feeds user's inputs to an array
function handler(colour) {
  var userChosenColour = colour;
  userClickedPattern.push(userChosenColour);
  for(var i=0;i<userClickedPattern.length;i++){
    if(userClickedPattern[i]!==gamePattern[i]){
      started=false ;
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      var wrong=new Audio("sounds/wrong.mp3");
      wrong.play();
      gamePattern=[];
    }
  }
  if(userClickedPattern.length===level){
    checkAnswer(userClickedPattern.length-1);
  }
}
//Sound Player
function playSound(name) {
  var audio1 = new Audio("sounds/" + name + ".mp3");
  audio1.play();
}
//animating the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
