'use strict'

var winConditions = document.getElementById('win-conditions');
var output = document.getElementById('output');
var playerPoints = document.getElementById('player-points');
var compPoints = document.getElementById('comp-points');
var btnPaper = document.getElementById('btn-paper');
var btnRock = document.getElementById('btn-rock');
var btnScissors = document.getElementById('btn-scissors');
var btnNewGame = document.getElementById('btn-new-game');

// var isGameBlocked = false;
// var roundsDeclared = 0;
// var roundCurrent = 0;
var appMove = '';
var player = '';
// var scorePlayer = 0;
// var scoreComputer = 0;

var params = {
    isGameBlocked: false,
    roundsDeclared: 0,
    // roundCurrent = 0,
    scorePlayer: 0,
    scoreComputer: 0
};

btnNewGame.addEventListener('click', function () {
    params.roundsDeclared = prompt('Do ilu zwycięstw chcesz grać?');
    winConditions.innerHTML = 'Gramy do <span style="color:green; font-size: 30px;">' + params.roundsDeclared + '</style></span> zwycięstw.';
    output.innerHTML = 'Niech<br> zacznie się<br> pojedynek!';
    params.scorePlayer = 0;
    params.scoreComputer = 0;
    playerPoints.innerHTML = '0';
    compPoints.innerHTML = '0';
    enableGameButtons();
    params.isGameBlocked = false;
});
// btnPaper.addEventListener('click', function () {
//     if (isGameBlocked) {
//         endOfMatch();

//         return;
//     }
//     playerMove('papier');
// });

// btnRock.addEventListener('click', function () {
//     if (isGameBlocked) {
//         endOfMatch();

//         return;
//     }
//     playerMove('kamień');
// });

// btnScissors.addEventListener('click', function () {
//     if (isGameBlocked) {
//         endOfMatch();

//         return;
//     }
//     playerMove('nożyce');
// });

var playerPickButton = document.querySelectorAll('.player-move');

for (var i = 0; i < playerPickButton.length; i++) {
    playerPickButton[i].addEventListener('click', function () {
        if (params.isGameBlocked) {
            endOfMatch();

            return;
        }
        var dataMove = this.getAttribute('data-move');
        playerMove(dataMove);
    })
}

const drawNumber = function () {
    appMove = Math.ceil(Math.random() * 3);
    switch (appMove) {
        case 1:
            return 'papier';
            // break;
        case 2:
            return 'kamień';
            // break;
        case 3:
            return 'nożyce';
            // break;
    }
}

const compareChoice = function (player, appMove) {
    if (player === appMove) {
        return 'REMIS';
    }
    if (player === 'papier') {
        if (appMove === 'nożyce') {
            params.scoreComputer++;
            compPoints.innerHTML = params.scoreComputer;
            return 'Przegrana';
        } else {
            params.scorePlayer++;
            playerPoints.innerHTML = params.scorePlayer;
            return 'Wygrałeś';
        }
    }
    if (player === 'nożyce') {
        if (appMove === 'kamień') {
            params.scoreComputer++;
            compPoints.innerHTML = params.scoreComputer;
            return 'Przegrana';
        } else {
            params.scorePlayer++;
            playerPoints.innerHTML = params.scorePlayer;
            return 'Wygrałeś';
        }
    }
    if (player === 'kamień') {
        if (appMove === 'papier') {
            params.scoreComputer++;
            compPoints.innerHTML = params.scoreComputer;
            return 'Przegrana';
        } else {
            params.scorePlayer++;
            playerPoints.innerHTML = params.scorePlayer;
            return 'Wygrałeś';
        }
    }
}

const checkStatus = function () {
    if (params.roundsDeclared == params.scorePlayer || params.roundsDeclared == params.scoreComputer) {
        disableGameButtons();
        params.isGameBlocked = true;
        if (params.roundsDeclared == params.scorePlayer) {
            output.innerHTML = 'Wygrałeś mecz!';
            return;
        }
        if (params.roundsDeclared == params.scoreComputer) {
            output.innerHTML = 'Przegrałeś mecz!';
            return;
        }
    }
}

const playerMove = function (player) {

    var appMove = drawNumber();
    var compare = compareChoice(player, appMove);
    output.innerHTML = 'Wybór gracza: ' + player;
    output.innerHTML += '<br>Wybór komputera: ' + appMove;
    output.innerHTML += '<br>Rezultat: ' + compare;
    checkStatus();

}

function endOfMatch() {
    if (params.isGameBlocked) {
        output.innerHTML += '<br>Gra się zakończyła, naciśnij przycisk "Nowa Gra"';
    }
}

function enableGameButtons() {
    btnPaper.classList.remove('btn-disabled');
    btnRock.classList.remove('btn-disabled');
    btnScissors.classList.remove('btn-disabled');
}

function disableGameButtons() {
    // btnPaper.disabled = true;
    // btnRock.disabled = true;
    // btnScissors.disabled = true;

    btnPaper.classList.add('btn-disabled');
    btnRock.classList.add('btn-disabled');
    btnScissors.classList.add('btn-disabled');
}