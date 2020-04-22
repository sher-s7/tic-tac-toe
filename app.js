const gameBoard = (() => {
    const board = document.getElementsByClassName('tile');
})

const Player = (piece) => {
    const addPiece = (tile) =>  tile.innerHTML = piece;
    return {addPiece}
}

const displayController = (() => {

})

