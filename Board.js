class Board {
    
    constructor() {
        this.randomNums = [2,4];
        this.emptySpaceCount = 16;
        this.matrix = [
            [' ',' ',' ',' '],
            [' ',' ',' ',' '],
            [' ',' ',' ',' '],
            [' ',' ',' ',' ']
        ];
        this.placingNumInRandomPlaceOnBoard(1);
        this.placingNumInRandomPlaceOnBoard(1);
    }

    toString() {
        return this.matrix;
    }


    down(){
        let board = this.matrix;
        let changedPositions = false;
        let addedRowsAndColumns = new Map();
        for(let row = board.length-2; row>=0; row--){
            for(let column = 0; column < board.length; column++){
                if(board[row][column] !== ' '){
                    if(board[row+1][column] === ' '){
                        if(addedRowsAndColumns.get(column) === row){
                            (addedRowsAndColumns.set(column, (row+1)));
                        }
                        this.swap(board, row+1, row, column, column);
                        changedPositions = true;
                    }else if(board[row+1][column] === board[row][column] && (addedRowsAndColumns.get(column) !== row) 
                        && addedRowsAndColumns.get(column) !== (row-1)){
                        this.calculations(board, row, column, row+1, column);
                        addedRowsAndColumns.set(column, row+1);
                    }
                }
            }
            
            if(changedPositions && ((row+2) < (board.length))){
                row += 2;
                changedPositions = false;
            }
        }
        this.placingNumInRandomPlaceOnBoard();
    }


    up(){
        let board = this.matrix;
        let changedPositions = false;
        let addedRowsAndColumns = new Map();
        for(let row = 1; row< board.length; row++){
            for(let column = 0; column < board.length; column++){
                if(board[row][column] !== ' '){
                    if(board[row-1][column] === ' '){
                        if(addedRowsAndColumns.get(column) === row){
                            (addedRowsAndColumns.set(column, (row-1)));
                        }
                        this.swap(board, row-1, row, column, column);
                        changedPositions = true;
                    }else if(board[row-1][column] === board[row][column] && (addedRowsAndColumns.get(column) !== row) 
                        && (addedRowsAndColumns.get(column) !== row)){
                        this.calculations(board, row, column, row-1, column);
                        addedRowsAndColumns.set(column, row-1);
                    }
                }
            }
            if(changedPositions && (row-2) >= 0){
                row -= 2;
                changedPositions = false;
            }
        }
        this.placingNumInRandomPlaceOnBoard();
    }


    left(){
        let board = this.matrix;
        let changedPositions = false;
        for(let row = 0; row<board.length; row++){
            let addedColumns = [];
            for(let column = 1; column<board.length; column++){
                if(board[row][column] !== ' '){
                    if(board[row][column-1] === ' '){
                        this.swap(board, row, row, column-1, column);
                        if(addedColumns.includes(column)){
                            addedColumns.splice(addedColumns.indexOf(column), 1, (column-1));
                        }
                        changedPositions = true;
                    }else if(board[row][column-1] === board[row][column] && (!addedColumns.includes(column))){
                        this.calculations(board, row, column, row, column-1);
                        addedColumns.push(column);
                    }
                }
                if(changedPositions && ((column-2) >= (0))){
                    column -= 2;
                    changedPositions = false;
                }
            }
        }
        this.placingNumInRandomPlaceOnBoard();

    }


    swap(board, changableRow, row, changableColumn, column) {
        let temp = board[row][column];
        board[changableRow][changableColumn] = temp;
        board[row][column] = ' ';
    }

    right(){
        let board = this.matrix;
        let changedPositions = false;
        for(let row = 0; row<board.length; row++){
            let addedColumns = [];
            for(let column = board.length-2; column >= 0; column--){
                if(board[row][column] !== ' '){
                    if(board[row][column+1] === ' '){
                        if(addedColumns.includes(column)){
                            addedColumns.splice(addedColumns.indexOf(column), 1, (column+1));
                        }
                        this.swap(board, row, row, column+1, column);
                        changedPositions = true;
                    }else if(board[row][column+1] === board[row][column] && (!addedColumns.includes(column))){
                        this.calculations(board, row, column, row, column+1);
                        addedColumns.push(column);
                    }
                }
                if(changedPositions && ((column+2) < board.length)){
                    column += 2;
                    changedPositions = false;
                }
            }
        }
        this.placingNumInRandomPlaceOnBoard();
    }




    calculations(board, row, column, changableRow, changableColumn) {
        board[changableRow][changableColumn] = String(parseInt(board[changableRow][changableColumn]) + parseInt(board[row][column]));
        board[row][column] = ' ';
    }
    


    placingNumInRandomPlaceOnBoard(num){
        let emptySpace = this.emptySpace();
        let place = this.randomSpace(emptySpace);
        return num === undefined ? this.matrix[place[0]][place[1]] = String(this.randomNum()) : this.matrix[place[0]][place[1]] = String(num);
    }

    
    emptySpace(){
        let emptySpaces = new Map();
        for(let row = 0; row < 4; row++){
            let columns = this.matrix[row];
            let emptyColumns = columns.map((column, index) => (column === ' ' ? index : -1)).filter(index => index !== -1);
            if(emptyColumns.length !== 0)
                emptySpaces.set(row, emptyColumns);
        }
        return emptySpaces;
    }    


    
    randomNum(){
        return this.randomNums[Math.round(Math.random())]
    }

    
    randomSpace(emptyPlaces){
        let keys = [...emptyPlaces.keys()]
        let row = keys[Math.round(Math.random() * (keys.length-1))];
        let column = Math.round(Math.random() * (emptyPlaces.get(row).length-1));
        column = column===(-1)? 0: column;
        let emptySpaceForThisInteration = 16
        for (let key = 0; key < keys.length; key++) {
            for (let value = 0; value < emptyPlaces.get(keys[key]).length; value++) {
                emptySpaceForThisInteration--;
            }
        }
        this.emptySpaceCount = 15 - emptySpaceForThisInteration;
        return [row, emptyPlaces.get(row)[column]];
    }

    checkWinCase(){
        for(let i = 0; i < this.matrix.length; i++){
            if(this.matrix[i].includes('2048')){
                return true;
            }
        }
        return false;
    }

    print(){

        for (let row = 0; row < this.matrix.length; row++) {
            for (let column = 0; column < this.matrix.length; column++) {
                console.log(`${i} | ${this.matrix[row][column]} | `)
            }
            
        }

    }


}

module.exports = Board;




let board = new Board();

// // board.matrix.forEach(element => {
// //     console.log(element);
// // });


board.matrix = [
    ['4','2','2','2'],
    ['8','8','4','8'],
    ['2','1',' ','4'],
    ['1','1','1','4']
];

// board.matrix.forEach(element => {
//     console.log(element);
// });
// console.log('\n')
 debugger;
//  board.up();
board.placingNumInRandomPlaceOnBoard();

console.log(board.checkWinCase());
board.matrix.forEach(element => {
    console.log(element);
});

