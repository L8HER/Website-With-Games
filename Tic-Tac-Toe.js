let OrigBoard;
const Player1= 'O';
const Player2= 'X';
const AiPlayer= 'X';
let gameTurn=0;
let Ai;
let empty;
const winCombos=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
    
]
const cells=document.querySelectorAll('.cell'); 


startGame();
function startGame(){
    document.querySelector(".endgame").style.display="none";
    OrigBoard = Array.from(Array(9).keys());
    for(let i=0; i<cells.length; i++){
        cells[i].innerText=' ';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
    gameTurn=0;
    Ai=false;
    document.querySelector(".Ai").style.display="block";
}

function turnClick(square) {
    if(typeof OrigBoard[square.target.id] == 'number'){
    if(Ai==true){
        turn(square.target.id, Player1);
        Aiplayer();

        }
    else if(gameTurn%2==0){
        turn(square.target.id, Player1);
    }
   
    else{
        turn(square.target.id, Player2);
        document.querySelector(".Ai").style.display="none";
    }

}
}

function turn(squareId, player){
    OrigBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon=checkWin(OrigBoard, player);
    if(gameWon) {
        gameOver(gameWon);
    }
    else{
        gameTurn++;
    }
    

}

function checkWin(board, player){
    let plays = board.reduce((a,e,i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon =null;
    for(let [index,win] of winCombos.entries()){
        /*every element in win array is checked against the index of plays
        to see if its been played aka >-1, the elem is the parameter 
        of the function and plays.indexOf checks the index of elem
        and if that index has number in it, the reduce method should 
        have added number to spot that has been played. */
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player:player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=
        gameWon.player==Player1 ? "blue" : "red";
    }
    for(let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    playerWin(gameWon);
}

function Aibutton(){
    return Ai=true;
}

function Aiplayer(){
    if(emptySquare().length>0){
        turn(empty[Math.floor(Math.random()*empty.length)], AiPlayer);
    }
}

function emptySquare(){
   
    empty=OrigBoard.filter(s=>typeof s=='number');
    return empty;
}

function playerWin(gameWon){
    if(gameWon.player==Player1){
        document.querySelector(".endgame").style.display="block";
        document.querySelector(".endgame .text").innerText="Player 1 Win";
    }
    if(gameWon.player==Player2){
        document.querySelector(".endgame").style.display="block";
        document.querySelector(".endgame .text").innerText="Player 2 Win";
    }

    if(gameWon.player==AiPlayer){
        document.querySelector(".endgame").style.display="block";
        document.querySelector(".endgame .text").innerText="AI Win";
    }

}