var playNumber;
let origBoard=Array(9);
let tempBoard=Array(81);
let checkBoard=[1,2,3,4,5,6,7,8,9];
let tempCheckBoard=[];
let numberindex=[[],[],[],[],[],[],[],[],[]];
let counter=0;
let indexcounter=0;


const cell=document.querySelectorAll(".Sucells");
const numpad=document.querySelectorAll(".Numpad");

startGame();

function Restart(){
    location.reload();
}

function startGame(){
    
    console.clear();

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

if(23-cluecount>0){
for(var t=0; t<22-cluecount; t++){
    
    var row=randomNumberRows();
    var column=randomNumberRows();
    if(typeof(board[row][column])==='number'){
        t--;
    }
    board[row][column]=randomNumber();
    cell[row*9+column].innerText=board[row][column];  
    tempBoard[row*9+column]=board[row][column];
}
}


let numbercount=0;
for(var o=0; o<tempBoard.length; o++){
 
    if(typeof(tempBoard[o])==='number'){
         numbercount++;
    }
    
}

RowCheckDups(board);
ColCheckDups(board,cell);
console.log("cluecount is " + numbercount);
for(var t=0; t<9; t++){
    for(var s=0; s<9; s++){
        if(origBoard[s][t]===1){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='orange';
        }
        if(origBoard[s][t]===2){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='blue';
        }
        if(origBoard[s][t]===3){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='red';
        }
        if(origBoard[s][t]===4){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='green';
        }
        if(origBoard[s][t]===5){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='yellow';
        }
        if(origBoard[s][t]===6){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='grey';
        }
        if(origBoard[s][t]===7){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='purple';
        }
        if(origBoard[s][t]===8){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='pink';
        }
        if(origBoard[s][t]===9){
            id=s*9+t;
            document.getElementById(id).style.backgroundColor='teal';
        }
    }
}




}


function Solver(board){















    

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
for(var l=0; l<9; l++) {
    for(var e=0; e<9; e++){
        if(typeof(board[l][e])==='number'){
            value=board[l][e];
            numberindex[l].push(e);
        }
    }
}
for (var i=0; i<9; i++){
    valuesAlreadySeen=[99];
    tempCheckBoard=[1,2,3,4,5,6,7,8,9];
    for (var j=0; j<9; j++){
        if(tempCheckBoard.indexOf(value)!==-1){    
        tempCheckBoard.splice(tempCheckBoard.indexOf(value),1);
        }

        for(var o=0; o<numberindex[i].length; o++){
            let usednumberindex=numberindex[i][o];
            let usednumber=board[i][usednumberindex];
            tempCheckBoard.splice(tempCheckBoard.indexOf(usednumber),1);
        }


        if(valuesAlreadySeen.indexOf(value)!==-1&&typeof(board[i][j])==='number'){
            board[i][j]=tempCheckBoard[Math.floor(Math.random()*tempCheckBoard.length)];
            cell[i*9+j].innerText=board[i][j];
            tempCheckBoard.splice(tempCheckBoard.indexOf(board[i][j]),1);
        }
       
            valuesAlreadySeen.push(value);
            valuesAlreadySeen.push(board[j][i]);
            tempCheckBoard=[1,2,3,4,5,6,7,8,9];
        
    }
}
//console.log(numberindex);
return numberindex;
}

function ColCheckDups(board,cell){
replaceBoard(board,cell);

}


function replaceBoard(board,cell){
let usedrow=[];
let repeat=0;
let index=[];
    for(var i=0; i<9; i++){
    usedrow=insertRows(board,i);
    for(var j=0; j<9; j++){
    
        tempCheckBoard=[1,2,3,4,5,6,7,8,9];

        
        for(var o=0; o<9; o++){
            if(typeof(usedrow[o])==='number'){
                if(tempCheckBoard.indexOf(usedrow[o])!==-1){
                tempCheckBoard.splice(tempCheckBoard.indexOf(usedrow[o]),1);
                }
            }
        }
        //console.log(usedrow);
       index=checkRepeat(usedrow,j);
       let dupindex=index[0];
       if(typeof(dupindex)==='number'){
        spliceTempboard(board,tempCheckBoard,numberindex,dupindex);
        console.log(tempCheckBoard);
        console.log("dups at " + dupindex + " "+i+"values was "+ board[dupindex][i]);
           board[dupindex][i]=tempCheckBoard[Math.floor(Math.random()*tempCheckBoard.length)];
           cell[dupindex*9+i].innerText=board[dupindex][i]; 

           }
       }
    }
    
}



function checkRepeat(array,number){
    let repeat=0;
    let index=[];
    for(var i=0; i<array.length; i++){
        if(typeof(array[i])==='number'){
        if(array[i]==number){
            repeat++;
        }
    }
        if(repeat>1){
            index.push(i);
            repeat=0;
        }
            
    }
    return index;
}



function insertRows(board,rownumber){
    let rowindex=[];
    for(var i=0; i<9; i++){
        rowindex.push(board[i][rownumber]);
    }
    return rowindex;
}

function spliceTempboard(board,tempCheckBoard,numberindex,rows){

    for(var i=0; i<numberindex[rows].length; i++){
        let index=board[rows][numberindex[rows][i]]
        if(tempCheckBoard.indexOf(index)!==-1){
        tempCheckBoard.splice(tempCheckBoard.indexOf(index),1);
    }
}
    return tempCheckBoard;
}






