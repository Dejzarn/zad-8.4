'use strict'

var winConditions = document.getElementById('win-conditions');
var output = document.getElementById('output');
var playerPoints = document.getElementById('player-points');
var compPoints = document.getElementById('comp-points');
var btnPaper = document.getElementById('btn-paper');
var btnRock = document.getElementById('btn-rock');
var btnScissors = document.getElementById('btn-scissors');
var btnNewGame = document.getElementById('btn-new-game');

var isGameBlocked = false;
var roundsDeclared = 0;
var roundCurrent = 0;
var appMove = '';
var player = '';
var scorePlayer = 0;
var scoreComputer = 0;

btnNewGame.addEventListener('click', function () {
    roundsDeclared = prompt('Do ilu zwycięstw chcesz grać?');
    winConditions.innerHTML = 'Gramy do <span style="color:green; font-size: 30px;">' + roundsDeclared + '</style></span> zwycięstw.';
    output.innerHTML = 'Niech<br> zacznie się<br> pojedynek!';
    scorePlayer = 0;
    scoreComputer = 0;
    playerPoints.innerHTML = '0';
    compPoints.innerHTML = '0';
    enableGameButtons();
    isGameBlocked = false;
});
btnPaper.addEventListener('click', function () {
    if (isGameBlocked) {
        endOfMatch();

        return;
    }
    playerMove('papier');
});

btnRock.addEventListener('click', function () {
    if (isGameBlocked) {
        endOfMatch();

        return;
    }
    playerMove('kamień');
});

btnScissors.addEventListener('click', function () {
    if (isGameBlocked) {
        endOfMatch();

        return;
    }
    playerMove('nożyce');
});

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
            scoreComputer++;
            compPoints.innerHTML = scoreComputer;
            return 'Przegrana';
        } else {
            scorePlayer++;
            playerPoints.innerHTML = scorePlayer;
            return 'Wygrałeś';
        }
    }
    if (player === 'nożyce') {
        if (appMove === 'kamień') {
            scoreComputer++;
            compPoints.innerHTML = scoreComputer;
            return 'Przegrana';
        } else {
            scorePlayer++;
            playerPoints.innerHTML = scorePlayer;
            return 'Wygrałeś';
        }
    }
    if (player === 'kamień') {
        if (appMove === 'papier') {
            scoreComputer++;
            compPoints.innerHTML = scoreComputer;
            return 'Przegrana';
        } else {
            scorePlayer++;
            playerPoints.innerHTML = scorePlayer;
            return 'Wygrałeś';
        }
    }
}

const checkStatus = function () {
    if (roundsDeclared == scorePlayer || roundsDeclared == scoreComputer) {
        disableGameButtons();
        isGameBlocked = true;
        if (roundsDeclared == scorePlayer) {
            output.innerHTML = 'Wygrałeś mecz!';
            return;
        }
        if (roundsDeclared == scoreComputer) {
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
    if (isGameBlocked) {
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