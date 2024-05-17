const Board = require('./Board');
const reader = require('readline-sync');
// const prompt = require('prompt-sync')();


let play = function(){

    let board = new Board();
    let userChoice = '';
    let wantsToExit = false;
    while((board.emptySpaceCount>0) && (!board.checkWinCase())){
        console.log(board.matrix);
        userChoice = reader.question("Please enter L(left), R(right), U(up), D(down), E(exit): ");
        switch(userChoice){
            case 'L', 'l':
                board.left();
                break;
            case 'R', 'r':
                board.right();
                break;
            case 'U', 'u':
                board.up();
                break;
            case 'D', 'd':
                board.down();
                break;
            case 'E', 'e':
                wantsToExit = true;
                break;
            default:
                console.log('Choose from L, R, U, D, E');
        }
        if(wantsToExit){
            break;
        }
    }
    
    if(board.checkWinCase()){
        console.log(board.matrix);
        console.log('Congrats, you won!')
    }else if(wantsToExit){
        console.log('Bye!');
    }
    else{
        console.log('You lost the game!')
    }

}

play();

