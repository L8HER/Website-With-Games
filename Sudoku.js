var playNumber;
let origBoard=Array(9);
let tempBoard=Array(81);
let checkBoard=[1,2,3,4,5,6,7,8,9];
let tempCheckBoard=[];
let numberindex=[[],[],[],[],[],[],[],[],[]];


const cell=document.querySelectorAll(".Sucells");
const numpad=document.querySelectorAll(".Numpad");

startGame();

function Restart(){
    location.reload();
}

function startGame(){
    
    console.clear();
    /*for(var i=0; i<cell.length; i++){
       let dup=Math.floor(Math.random()*(9-1)+1);
        origBoard[i]=(dup);
        if (origBoard.indexOf(dup)==-1){
            cell[i].innerText=origBoard[i];
            cell[i].addEventListener('click', Answer);
        }
        else{
            dup=Math.floor(Math.random()*(9-1)+1);
            origBoard[i]=(dup);
        }

    }*/
    for(var i=0; i<cell.length; i++){
        cell[i].innerText=" ";
    }
    createBoard(origBoard);
   
    for(var i=0; i<numpad.length; i++){
        numpad[i].addEventListener('click',Inputnumber);
    }
}

function Inputnumber(num){
    numID=String(num.target.id);
    for(var i=1; i<=numpad.length; i++){
        let backgroundnum=String(100*i);
        document.getElementById(backgroundnum).style.backgroundColor='';
    }
    document.getElementById(numID).style.backgroundColor='grey';
    playNumber=num.target.id/100
    let cellarr=Object.keys(cell);
    
}

function Answer(num){
    if(playNumber>0){
        cell[num.target.id].innerText=playNumber;
    }
}

function createBoard(board){

    var cluecount=0;
for(var i=0; i<9; i++){
    board[i]=Array(9);
}
for(var j=0; j<22; j++){
    var row=randomNumberRows();
    var column=randomNumberRows();
    board[row][column]=randomNumber();
    cell[row*9+column].innerText=board[row][column];  
    tempBoard[row*9+column]=board[row][column];
}

for(var k=0; k<tempBoard.length; k++){
    if (typeof(tempBoard[k])==='number'){
        cluecount++;
    }
}

console.log("cluecount is " + cluecount);

for(var t=0; t<26-cluecount; t++){
    var row=randomNumberRows();
    var column=randomNumberRows();
    board[row][column]=randomNumber();
    cell[row*9+column].innerText=board[row][column];  
    tempBoard[row*9+column]=board[row][column];
}


let numbercount=0;
for(var o=0; o<tempBoard.length; o++){
 
    if(typeof(tempBoard[o])==='number'){
         numbercount++;
    }
    
}
for(var y=0; y<3; y++){
RowCheckDups(board);
ColCheckDups(board);
}
}


function Solver(board){
    
    createBoard(board);
    /*for(var i=0; i<5; i++){
    if(typeof(tempBoard[i])!='number'){
        tempBoard[i]=randomNumber();

    }
    }*/

}
function randomNumber(){
    let num=Math.floor(Math.random()*(9-1)+1);
    return num;
}
function randomNumberRows(){
    let num=Math.floor(Math.random()*(9));
    return num;
}


function RowCheckDups(board){
var value;
let valuesAlreadySeen=[99];
for (var i=0; i<9; i++){
    valuesAlreadySeen=[99];
    tempCheckBoard=[1,2,3,4,5,6,7,8,9];
    if(i>0){
    //console.log("next \n");
    }
    for (var j=0; j<9; j++){
        if(typeof(board[i][j])==='number'){
            value=board[i][j];
            numberindex[i].push(j);
        }

        



        if(tempCheckBoard.indexOf(value)!==-1){    
        tempCheckBoard.splice(tempCheckBoard.indexOf(value),1);
        }



        if(valuesAlreadySeen.indexOf(value)!==-1&&typeof(board[i][j])==='number'){
            board[i][j]=tempCheckBoard[Math.floor(Math.random()*tempCheckBoard.length)];
            cell[i*9+j].innerText=board[i][j];
            tempCheckBoard.splice(tempCheckBoard.indexOf(board[i][j]),1);
        }
        if(valuesAlreadySeen.indexOf(value)===-1&&typeof(value)==='number'){
            valuesAlreadySeen.push(value);
        }
    }
}
//console.log(numberindex);
return numberindex;
}

function ColCheckDups(board){
    var value;
    let valuesAlreadySeen=[99];
    for (var i=0; i<9; i++){
        valuesAlreadySeen=[99];
        tempCheckBoard=[1,2,3,4,5,6,7,8,9];
        for (var j=0; j<9; j++){
            if(typeof(board[j][i])==='number'){
                value=board[j][i];
            }
           
            for(var o=0; o<numberindex[j].length; o++){
                if(tempCheckBoard.indexOf(board[numberindex[j],numberindex[j][o]])!==-1){
                    tempCheckBoard.splice(board[numberindex[j],numberindex[j][o]],1);
                }
            }

            if(tempCheckBoard.indexOf(value)!==-1){    
            tempCheckBoard.splice(tempCheckBoard.indexOf(value),1);
            }
           
            if(valuesAlreadySeen.indexOf(value)!==-1&&typeof(board[j][i])==='number'){
                board[j][i]=tempCheckBoard[Math.floor(Math.random()*tempCheckBoard.length)];
                cell[j*9+i].innerText=board[j][i];
                tempCheckBoard.splice(tempCheckBoard.indexOf(board[j][i]),1);
            }
                valuesAlreadySeen.push(value);
                valuesAlreadySeen.push(board[j][i]);

        }
    }

}
















