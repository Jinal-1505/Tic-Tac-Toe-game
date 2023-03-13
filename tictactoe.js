/*• Create A Tic Tac Toe(X and O) Game
• Get Input from user from console for 2 playsr
• Simulate a tic tac toe game between them
• Create Array of 3X3 to store values of the game
• Rules:  
    • Player 1 Will Always start with X. Ask the user to enter the coordinate to put x in. For example top-left should be 00 top-middle should be 01
    • After one player enters the value display the entire grid.
    • Next player 2 will play. Follow same procedure that you have followed for player 1 but he/she will be adding O instead of x
    • Follow normal rules of X and O i.e if any players makes consecutive X's or O's in row or column they win
    • Display the name of the player that won
• EXTRA(If you feel Confident 

) : Maintain history of how many times a player has won the game.
in javascript*/


// Create array of 3x3
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const grid = [[null, null, null], [null, null, null], [null, null, null]];
const players = ['X', 'O'];
let currentPlayerIndex = 0;
const playerWins = { X: 0, O: 0 };

function displayGrid() {
    console.log(` ${grid[0][0] || ' '} | ${grid[0][1] || ' '} | ${grid[0][2] || ' '}`);
    console.log('---+---+---');
    console.log(` ${grid[1][0] || ' '} | ${grid[1][1] || ' '} | ${grid[1][2] || ' '}`);
    console.log('---+---+---');
    console.log(` ${grid[2][0] || ' '} | ${grid[2][1] || ' '} | ${grid[2][2] || ' '}`);
}

function checkForWin() {
    // check rows
    for (let row = 0; row < 3; row++) {
        if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2] && grid[row][0] !== null) {
            return true;
        }
    }

    // check columns
    for (let col = 0; col < 3; col++) {
        if (grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col] && grid[0][col] !== null) {
            return true;
        }
    }

    // check diagonals
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== null) {
        return true;
    }

    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== null) {
        return true;
    }

    return false;
}

function playTurn() {
    const currentPlayer = players[currentPlayerIndex];
    console.log(`It's Player ${currentPlayer}'s turn`);

    rl.question('Enter row: ', (row) => {
        rl.question('Enter column: ', (col) => {
            if (grid[row][col] !== null) {
                console.log('That cell is already occupied. Please try again.');
                playTurn();
            } else {
                grid[row][col] = currentPlayer;
                displayGrid();

                if (checkForWin()) {
                    console.log(`Player ${currentPlayer} wins!`);
                    playerWins[currentPlayer]++;
                    console.log(`Player X has won ${playerWins.X} times`);
                    console.log(`Player O has won ${playerWins.O} times`);
                } else if (grid.flat().every(cell => cell !== null)) {
                    console.log('It\'s a tie!');
                } else {
                    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                    playTurn();
                }
            }
        });
    });
}

displayGrid();
playTurn();
