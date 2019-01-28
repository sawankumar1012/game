var buttonColours=["red","green","blue","yellow"];
var gamePattern = [];
var userClickPattern=[];
var started= false;
var level= 0;
$("#start").click(function(){
 if( !started){
 	$("#level-title").text("level"+level);
 	nextSequence();
 	started=true;
 	$(this).css("visibility","hidden");
 }
})

   
function nextSequence(){
	userClickPattern=[];
	level++;
	 $("#level-title").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
      playSound(randomChoosenColour);

    }


 function playSound(colour){
    	var audio = new Audio("./sounds/"+colour+".mp3");
audio.play();
    }

$(".btn1").click(function(){
	var userChooseColour=$(this).attr("id");
	userClickPattern.push(userChooseColour);
    playSound(userChooseColour);
    animatePress(userChooseColour);
    checkAnswer(userClickPattern.length-1);
});

function animatePress(colour){
	$("#"+colour).addClass("pressed");
	setTimeout(function(){
		$("#"+colour).removeClass("pressed");
	},100);
}

function checkAnswer(index)
{if(gamePattern[index]===userClickPattern[index]){
	if(gamePattern.length===userClickPattern.length)
	{
		setTimeout(function(){
			nextSequence();

		},500);
	}
}else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over!!");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver(){
	$("#start").css("visibility","visible");
	level = 0;
  gamePattern = [];
  started = false;
}