
const buttonColor = ["red","blue","green","yellow"]; 

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let start = 0;
let currentLevel = 0;

function nextSeq(){
    let  randomNum = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColor[randomNum];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
}

function animatePress(currentColor){
    $("#"+currentColor).toggleClass("pressed");   
    setTimeout(function(){
        $("#"+currentColor).toggleClass("pressed");
    },100);
}


function playSound(color){
    let audSource = "sounds/"+color+".mp3";
    let buttonAud = new Audio(audSource);
    buttonAud.play();
}


$(".btn").on("click",function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    currentLevel++;
    console.log("currentLevel =" +currentLevel);
    if (currentLevel == level){
        if(checkAns(currentLevel) === true){
            //console.log("Correct Pattern");
            setTimeout(function(){
                currentLevel = 0;
                userClickedPattern = [];
                nextSeq();
            },1000);
            
        }else{
            //console.log("Game Over! Restart the Game");
            $("h1").text("Game Over!"); 
            $("body").toggleClass("game-over");
            playSound("wrong");

            userClickedPattern = [];
            gamePattern = [];
            currentLevel = 0;
            level = 0;
            start = 0;
            setTimeout(function(){
                $("body").toggleClass("game-over");
                $("h1").text("Game Over!\nPress A to Restart the Game");
            },1000);
        }
    }else if (currentLevel > 0){
        if (currentLevel < level){
            if(gamePattern[currentLevel-1] !== userClickedPattern[currentLevel-1]){
                $("h1").text("Game Over!"); 
                $("body").toggleClass("game-over");
                playSound("wrong");
    
                userClickedPattern = [];
                gamePattern = [];
                currentLevel = 0;
                level = 0;
                start = 0;
                setTimeout(function(){
                    $("body").toggleClass("game-over");
                    $("h1").text("Game Over!\nPress A to Restart the Game");
                },1000);
            }
        }
    }
    
});

$(document).on("keydown",function(){
    if (start == 0){
        nextSeq();
        start++;
    }
});

function checkAns(currentLevel){
    return compareArrays(gamePattern,userClickedPattern);
}

const compareArrays = (a, b) => {
    if (a.length !== b.length) return false;
    else {
      // Comparing each element of your array
        for (var i = 0; i < a.length; i++) {
            console.log(a[i],b[i]);
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
};

