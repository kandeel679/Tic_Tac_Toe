let restBtn = document.getElementById("restartBtn");
let text = document.getElementById("playerText");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const p1 = "X";
const p2 = "O";
let Cplayer = p1;
let spaces = Array(9).fill('');


const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));

}

const compMove = () => {
    let rand = ((Math.random()) * 100) % 9
    return rand
}
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function cheackwin() {
    for (const combo of winningCombos) {
        let [a, b, c] = combo;
        if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c] && spaces[a] == ("X" || "O")) {
            return [a, b, c];
        }
    }
    return false;
}

function checkDraw() {
    return spaces.every(space => space !== null);
}

const boxClicked = (event) => {
    const id = event.target.id;

    if (spaces[id] !== '') {
        event.target.innerText = Cplayer;
        spaces[id] = Cplayer;

        // Check for win or draw after player's move
        if (cheackwin() !== false) {
            text.innerText = `${Cplayer} has won`;
            let winningBlocks = cheackwin();
            winningBlocks.map(box => boxes[box].style.color = winnerIndicator);
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else if (checkDraw()) {
            text.innerText = "Draw";
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else {
            CompMove()

        }
    }
}

const MinMax = (board) => {
    return 1
}


const CompMove = () => {
    Cplayer = (Cplayer === p1) ? p2 : p1;

    if (Cplayer === p2) {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (spaces[i][j] === '') {
                    console.log();
                    spaces[i][j] = p2; // Simulate placing the computer's move
                    const score = MinMax(spaces, 0, false); // Call MinMax algorithm to find the best move
                    spaces[i][j] = ''; // Undo the move
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }


            }
        }
        spaces[bestMove] = Cplayer;

        if (cheackwin() !== false) {
            text.innerText = `${Cplayer} has won`;
            let winningBlocks = cheackwin();
            winningBlocks.map(box => boxes[box].style.color = winnerIndicator);
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else if (checkDraw()) {
            text.innerText = "Draw";
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        }
        Cplayer = (Cplayer === p1) ? p2 : p1;

    }
}
function restart() {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.color = ''
    })
    spaces.fill('');
    text.innerText = "Tic Tac Toe";
    Cplayer = p1;
    startGame()
}



restBtn.addEventListener("click", restart);
startGame();
