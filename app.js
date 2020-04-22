let new_game_button = document.getElementById('new-game');
let player1;
let player2;
let currentPlayer;
let congrats_msg = document.getElementById('message');
let gameEnd = false;

const winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


const gameBoard = (() => {
    const board = () => document.getElementsByClassName('tile');
    const resetBoard = () => {
        for (tile of board()) {
            tile.innerHTML = '';
            gameEnd = false;
            currentPlayer = null;
        }
    }
    return { board, resetBoard }
})();

const Player = (piece) => {
    const addPiece = (tile) => tile.innerHTML = piece;
    return { addPiece }
}

new_game_button.addEventListener('click', () => {
    new_game_button.style.display = 'none';
    player1 = Player('X');
    player2 = Player('O');
    currentPlayer = player1;

});

const game = (() => {
    const addPiece = (tile) => {
        currentPlayer.addPiece(tile);
        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
    }

    const won = (piece) => {
        for (combo of winning_combos) {
            if (gameBoard.board()[combo[0]].innerHTML == piece && gameBoard.board()[combo[1]].innerHTML == piece &&
                gameBoard.board()[combo[2]].innerHTML == piece) {
                return true;
            }
        }
        return false;
    }

    const tied = () => {
        for(tile of gameBoard.board()){
            if(!tile.innerHTML){
                return false;
            }
        }
        return true;
    }

    return {
        addPiece,
        won,
        tied,
    }
})();



for (tile of gameBoard.board()) {
    tile.addEventListener('click', (e) => {
        if(!gameEnd){
            if (!e.target.innerHTML.includes('X') && !e.target.innerHTML.includes('O')) {
                game.addPiece(e.target)
            }
        }else{
            gameBoard.resetBoard();
            new_game_button.style.display = 'block';
            congrats_msg.innerHTML = ''
        }

        if(game.won('X') || game.won('O') || game.tied()){
            gameEnd = true;
            player1 = null;
            player2 = null;
            if(game.won('X')){
                congrats_msg.innerHTML = `Player X has won`;
            }else if(game.won('O')){
            congrats_msg.innerHTML = `Player O has won`;
            }else if(game.tied()){
                congrats_msg.innerHTML = 'A tie'
            }
        }
    });

}