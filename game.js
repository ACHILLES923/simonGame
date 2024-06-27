var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gameStarted = false;
var level = 0;

// Will call callback function only once at the start. Which is what we needed.
$(document).one("keydown", newSequence);  

// Attaching event listener to every box.
$(".btn").on("click", handler);


function newSequence()
{
    if(!gameStarted) gameStarted = true;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(130).fadeIn(130);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}


// function to play sound.
function playSound(name)
{
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}


// function to highlight user choices.
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function handler(event)
{
    var userChosenColor = event.target.id;
    animatePress(userChosenColor);
    if(gameStarted)
    {
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    }
}
 

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    { 
        if(gamePattern.length -1 === currentLevel)
        {
            setTimeout(newSequence, 1000);
        }
    }
    else 
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver()
{
    level = 0;
    gamePattern = [];
    gameStarted = false;
    $(document).one("keydown", newSequence); 
}





