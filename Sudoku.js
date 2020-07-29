let origBoard;
var playNumber;

const cell=document.querySelectorAll(".Sucells");
const numpad=document.querySelectorAll(".Numpad");

startGame();

function startGame(){
    for(var i=0; i<cell.length; i++){
        cell[i].innerText=' ';
    }
    for(var i=0; i<numpad.length; i++){
        numpad[i].addEventListener('click',Inputnumber);
    }
}

function Inputnumber(num){
    numID=String(num.target.id);
    document.getElementById(numID).style.backgroundColor='grey';
    var b=num/100;
    cell[1].innerText=num.target.id/100;
}