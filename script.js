let restBtn = document.getElementById("restartBtn");
let text = document.getElementById("playerText");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const p1 ="X";
const p2 ="O";
let Cplayer = p1;
let spaces = Array(9).fill(null);

const startGame = ()=>{
    boxes.forEach(box => box.addEventListener("click",boxClicked));
}
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function cheackwin(){
    for (const combo of winningCombos) {
    let [a,b,c]=combo;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
        return [a,b,c];
    }
    
}
return false;
} 
function checkDraw() {
    return spaces.every(space => space !== null);
}
const boxClicked = (event)=>{
    const id = event.target.id;
    
    if (!spaces[id]) {
        event.target.innerText=Cplayer;
        spaces[id] = Cplayer; 
    }  
    if (cheackwin()!==false) {
        text.innerText = `${Cplayer} has won`;
        let winningBlocks = cheackwin();
        winningBlocks.map( box =>boxes[box].style.color=winnerIndicator);
        
        
    }else if(checkDraw()){
        text.innerText = "Draw";
    }
    
    Cplayer = (Cplayer == p1)?p2:p1;
    
}
function restart(){
    boxes.forEach(box =>{
        box.innerText = "";
        box.style.color=''
    })
    spaces.fill(null);
    text.innerText ="Tic Tac Toe";
    
    Cplayer = p1;
}

restBtn.addEventListener("click",restart);




startGame();