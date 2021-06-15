const boxes = document.querySelectorAll(".box");
 const player = document.querySelector(".current-player");
 const winningplayer = document.querySelector(".winning-player");
 const resetbtn = document.querySelector("button");

let current_player = 'X';
let playingboard = ['', '', '', '', '', '', '', '', ''];
let isgameactive = true;
const playerx = 'playerx';
const playero = 'playero';
const tie = 'tie';

const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

boxes.forEach((box , index) => {
    // box.innerText = current_player;
    box.addEventListener("click", () => {
        clicked(box, index);
    })
});

function isvalidclick(box) {
    if(box.innerText === 'X' || box.innerText == 'O') {
        alert("Invalid Move");
        return false;
    }  else {
        return true;
    }
}

function clicked(box, index) {
    if(isvalidclick(box) && isgameactive) {
        if(current_player === 'X') {
            const sound = new Audio('sounds/Waterdrop.mp3');
            sound.play();
        } else {
            const sound = new Audio('sounds/Rain Drop Sms Tone.mp3');
            sound.play();
        }
        box.innerText=current_player;
        box.classList.add(`player${current_player}`);
        updateboard(index);
        handleResultValidation();
        changeplayer();
    }
    
}
function updateboard(index) {
    playingboard[index] = current_player;
    console.log(playingboard);
}

function changeplayer() {
    player.classList.remove(`player${current_player}`);
    current_player = current_player === 'X' ? 'O' : 'X';
    player.innerText = current_player;
    player.classList.add(`player${current_player}`);

}
function handleResultValidation() {
        let won = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = playingboard[winCondition[0]];
            const b = playingboard[winCondition[1]];
            const c = playingboard[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                won = true;
                break;
            }
        }

        if(won) {
            announcewinner(current_player === 'X' ? playerx : playero);
            isgameactive = false;
            return;
        }
        if (!playingboard.includes(''))
        announcewinner(tie);
    }

// announcing the player
function announcewinner(type) {
        switch(type){
            case playerx:
            winningplayer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case playero:
            winningplayer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case tie:
            winningplayer.innerText = 'Tie';
        }
        winningplayer.classList.remove('hide');
    }

// reset all
resetbtn.addEventListener("click", () => {
    playingboard = ['', '', '', '', '', '', '', '', ''];
        isgameactive = true;
        winningplayer.classList.add('hide');
    if (current_player === 'O') {
            changeplayer();
        }
    boxes.forEach(box => {
      box.innerText = "";
      box.classList.remove('playerX');
      box.classList.remove('playerO');
    
      
    });
});
