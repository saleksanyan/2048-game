import Board from './Board.js';
import User from './User.js';

import { question } from 'readline-sync';
// const prompt = require('prompt-sync')();


let play = function(){

    let board = new Board();
    let userChoice = '';
    let wantsToExit = false;
    let userName = question("Hi there! What's your name? ");
    let user = new User(userName);
    
    while((board.getEmptySpaceCount() > 0) && (!board.checkWinCase())){
        console.log(board.getBoard());
        userChoice = question(`${user.getName()}, please enter L(left), R(right), U(up), D(down), E(exit): `);
        switch(userChoice){
            case 'L', 'l':
                board.left(user);
                break;
            case 'R', 'r':
                board.right(user);
                break;
            case 'U', 'u':
                board.up(user);
                break;
            case 'D', 'd':
                board.down(user);
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
        console.log(`Your score: ${user.getScore()}`);
    }
    
    if(board.checkWinCase()){
        console.log(board.getBoard());
        console.log(`Congrats ${user.getNmae()}, you won!`)
    }else if(wantsToExit){
        console.log(`Bye, ${user.getNmae()},!`);
    }
    else{
        console.log(`${user.getNmae()}, lost the game, HAHAHAHAA!`)
    }

}


play();

