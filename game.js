let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ['red','blue','green','yellow'];
let randomChosenColour;
let level = 0;
nextSequence = () => {
    randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('h1').text('Level ' + level);
}

$('.btn').click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

playSound = (name) => {
    var sonido = new Audio('sounds/' + name + '.mp3');
    sonido.play();
}

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");
     }, 100)
}

    $(document).keydown(function () { 
        if(level === 0) {
        $('h1').text('Level ' + level);
        nextSequence();
        }
        
    }
);

checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern =[];
        }
    } else {
        $('h1').text('Game Over,Press any key to Start!');
        $('body').addClass('game-over');
        var error = 'wrong';
        playSound(error);

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

startOver = () => {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}




