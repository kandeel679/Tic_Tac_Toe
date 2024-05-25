let restBtn = document.getElementById("restartBtn");
let text = document.getElementById("playerText");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const p1 = "X";
const p2 = "O";
let Cplayer = p1;
let spaces = Array(9).fill('');

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
};

function checkWin() {
    for (const combo of winningCombos) {
        let [a, b, c] = combo;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c] && spaces[a]!=='') {
            obj = [
                spaces[a],
                [a,b,c]
            ]
            return obj ;
        }
    }
    return false;
}

function checkDraw() {
    return spaces.every(space => space !== '');
}

const boxClicked = (event) => {
    const id = event.target.id;

    if (spaces[id] === '') {
        spaces[id] = Cplayer;
        event.target.innerText = Cplayer;

        if (checkWin()) {
            text.innerText = `${Cplayer} has won!`;
            let [wp,winningBlocks] = checkWin();
            console.log(wp,winningBlocks);
            winningBlocks.forEach(box => boxes[box].style.color = winnerIndicator);
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else if (checkDraw()) {
            text.innerText = "Draw!";
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else {
            Cplayer = Cplayer === p1 ? p2 : p1;
            if (Cplayer === p2) {
                CompMove();
            }
        }
    }
}

const CompMove = () => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < spaces.length; i++) {
        if (spaces[i] === '') {
            spaces[i] = p2;
            let score = MinMax(spaces, 0, false);
            spaces[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    setTimeout(() => {
        spaces[move] = p2;
        boxes[move].innerText = p2;

        let winResult = checkWin();
        if (winResult) {
            text.innerText = `${p2} has won!`;
            let [wp, winningBlocks] = winResult;
            winningBlocks.forEach(box => boxes[box].style.color = winnerIndicator);
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else if (checkDraw()) {
            text.innerText = "Draw!";
            boxes.forEach(box => box.removeEventListener("click", boxClicked));
        } else {
            Cplayer = p1;
        }
    }, 200); 
}


const MinMax = (newSpaces, depth, isMaximizing) => {
    let winResult = checkWin();
    if (winResult) {
        return winResult[0] === p2 ? 10 - depth : depth - 10;
    }
    if (checkDraw()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newSpaces.length; i++) {
            if (newSpaces[i] === '') {
                newSpaces[i] = p2;
                let score = MinMax(newSpaces, depth + 1, false);
                newSpaces[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newSpaces.length; i++) {
            if (newSpaces[i] === '') {
                newSpaces[i] = p1;
                let score = MinMax(newSpaces, depth + 1, true);
                newSpaces[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function restart() {
    spaces.fill('');
    boxes.forEach(box => {
        box.innerText = '';
        box.style.color = '';
    });
    text.innerText = "Tic Tac Toe";
    Cplayer = p1;
    startGame();
}

restBtn.addEventListener("click", restart);
startGame();
