
var hero =
{
    top: 700,
    left: 550
}


var missiles = [];


document.onkeydown = function (event) {
    if (event.keyCode == 37) {
        hero.left -= 10;
        moveHero();
    }
    //up
    else if (event.keyCode == 38) {
        hero.top -= 10;
        moveHero();
    }
    else if (event.keyCode == 40) {
        hero.top += 10;
        moveHero();
    }
    else if (event.keyCode == 39) {
        hero.left += 10;
        moveHero();
    }
    else if (event.keyCode === 32) {
        missiles.push({
            top: hero.top,
            left: hero.left
        })
        drawMissile();
    }
}


function moveHero() {
    if (hero.left <= 50) {
        hero.left = 50;
    }
    if (hero.left >= 1150) {
        hero.left = 1150;
    }
    if (hero.top <= 50) {
        hero.top = 50;
    }
    if (hero.top >= 750) {
        hero.top = 750;
    }
    document.getElementById("hero").style.left = hero.left + "px";
    document.getElementById("hero").style.top = hero.top + "px";
}

function drawMissile() {
    document.getElementById("missiles").innerHTML = "";
    for (let i = 0; i < missiles.length; i++) {
        document.getElementById("missiles").innerHTML += `<div class="missile" style='left:${missiles[i].left}px;top:${missiles[i].top}px'></div>`
    }
}

function moveMissile() {
    for (var i = 0; i < missiles.length; i++) {
        missiles[i].top -= 8;
    }
}

var enemies = [
    //  {top:100 , left :200}
];

var proba = [200,300,400,500,600,700,800,900];
let numberOfEnemies = 16;


function initializeEnemies(counter)
{
    console.log(enemies);
    enemies = [];
    console.log(enemies);
    for(let i = 0;i < counter;i++)
    {
        if(i < 8)
        {
            enemies.push({top:100 , left:proba[i]})
        }
        else if(i < 16)
        {
            enemies.push({top:175 , left:proba[i - 8]})
        }
        else if(i < 24)
        {
            enemies.push({top:250 , left:proba[i - 16]})
        }   
    }
}

initializeEnemies(numberOfEnemies);

function drawEnemies() {

    document.getElementById("enemies").innerHTML = "";
    for (var i = 0; i < enemies.length; i++) {
        document.getElementById("enemies").innerHTML += `<div class="enemy" style='left:${enemies[i].left}px;top:${enemies[i].top}px'></div>`
    }
}


function moveEnemies() {

    
    for (var enemy = 0; enemy < enemies.length; enemy++) {

        if (enemies[enemy].top >= 750) {
            initializeEnemies(numberOfEnemies);
        }
        else {
            enemies[enemy].top += speedOfMoving;
        }
    }
}


shouldTheMovingStop = false;
let score = document.getElementById("score");
let scoreNumber = 0;
let speedOfMoving = 2;

function collisionDetection() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
        if (
            enemies[enemy].top == hero.top &&
            hero.left >= enemies[enemy].left &&
            hero.left <= enemies[enemy].left + 50
        ) {
            console.log(hero.top);
            console.log(hero.left);
            console.log(enemies[enemy]);
            enemies.splice(enemy, 1);
            document.getElementById("hero").style.display = "none";
            alert("you losed");
            shouldTheMovingStop = true;
        }
        for (var missile = 0; missile < missiles.length; missile++) {
            if (
                (missiles[missile].left >= enemies[enemy].left) &&
                (missiles[missile].left <= enemies[enemy].left + 50) &&
                (missiles[missile].top <= enemies[enemy].top + 50) &&
                missiles[missile].top >= enemies[enemy].top
            ) {
                //ako ja nema ova linija kod ce gi unistuva site eden zad drug
                missiles.splice(missile, 1);
                enemies.splice(enemy, 1);
                scoreNumber += 10;
                score.innerHTML = scoreNumber;
                switch(scoreNumber)
                {
                    case 20:
                        speedOfMoving = 5;
                        break;
                        case 40:
                            speedOfMoving = 6;
                            break;
                            case 60:
                                speedOfMoving = 7;
                                numberOfEnemies = 24;
                                break;
                                case 70:
                                speedOfMoving = 15;
                                break;
                }
            }
        }
    }
}

function gameLoop() {
    if (!shouldTheMovingStop) {
        setTimeout(gameLoop, 50);
        moveMissile();
        drawMissile();
        drawEnemies();
        moveEnemies();
        collisionDetection();
    }

}

gameLoop();


//segde na krajo ka jso ima container za drugi slik iprobaj background