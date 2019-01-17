'use strict'

var winConditions = document.getElementById('win-conditions');
var output = document.getElementById('output');
var playerPoints = document.getElementById('player-points');
var compPoints = document.getElementById('comp-points');
var btnPaper = document.getElementById('btn-paper');
var btnRock = document.getElementById('btn-rock');
var btnScissors = document.getElementById('btn-scissors');
var btnNewGame = document.getElementById('btn-new-game');

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
    btnPaper.disabled = false;
    btnRock.disabled = false;
    btnScissors.disabled = false;
});
btnPaper.addEventListener('click', function () {
    playerMove('papier');
    endOfMatch();
});

btnRock.addEventListener('click', function () {
    playerMove('kamień');
    endOfMatch();
});

btnScissors.addEventListener('click', function () {
    playerMove('nożyce');
    endOfMatch();
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
        btnPaper.disabled = true;
        btnRock.disabled = true;
        btnScissors.disabled = true;
        if (roundsDeclared == scorePlayer) {
            output.innerHTML = 'Wygrałeś mecz!';
            return;
        }
        if (roundsDeclared == scoreComputer) {
            output.innerHTML = 'Przegałeś mecz!';
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
    if ((btnPaper.disabled = true) || (btnRock.disabled = true) || (btnScissors.disabled = true)) {
        output.innerHTML += '<br>Gra się zakończyła, naciśnij przycisk "Nowa Gra"';
    }
}