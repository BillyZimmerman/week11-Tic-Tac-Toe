const xClass = 'x'
const circleClass = 'circle'
const winningCombinations= [
    // CREATING ALL THE WINNING COMBINATIONS WITH ARRAYS
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
        // SELECTING ALL THE CELL ELEMENTS
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
    // CREATING THE RESTART BUTTON 
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()
    // CREATING THE RESTART GAME FUNCTION 
restartButton.addEventListener('click', startGame)
        // CREATING A START GAME FUNCTION
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        // REMOVING THE X AND CIRCLE CLASS AT THE START OF A NEW GAME
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
            // CREATING A CLICK EVENT THAT ONLY HAPPENS ONCE A TURN
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
        // CREATING THE END GAME FUNCTION
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {    
            // WHO EVERS TURN IT IT THAT WINS WILL POPULATE THE TEXT 'O's Wins!' or 'X's Wins'
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
            // ADDING THE SHOW CLASS
    winningMessageElement.classList.add('show')
}
        // CREATING THE DRAW FUNCTION ONCE EACH CELL IS FILLED AND THERE IS NO WINNER
function isDraw() {
        // USING A DESTRUCTURE METHOD 
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
    // CREATING THE FUNCTION THAT TAKES TURNS 
function swapTurns() {
    circleTurn = !circleTurn
}
    // CREATING THE CLASSLIST FOR O AND X SO IT WILL SHOW THE X OR O IF ITS THEIR TURN
function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if (circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}
        // CREATING THE FUNCTION THAT WILL CHECK FOR A WINNER
        // EACH WINNING COMBONATION WILL BE LOOPED OVER TO CHECK FOR WINNER
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
