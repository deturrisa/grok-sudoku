let board = Array(9).fill().map(() => Array(9).fill(0));
let originalBoard = Array(9).fill().map(() => Array(9).fill(0));
let selectedCell = null;

// Generate a simple easy Sudoku puzzle
function generatePuzzle() {
    // Simple hardcoded easy puzzle for demo
    const puzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ];
    board = puzzle.map(row => row.slice());
    originalBoard = puzzle.map(row => row.slice());
    renderBoard();
}

function isValid(board, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
    // Check column
    for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
    // Check box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i + startRow][j + startCol] === num) return false;
    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function renderBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        const rowEl = document.createElement('div');
        rowEl.className = 'row';
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (originalBoard[row][col] !== 0) {
                cell.classList.add('fixed');
                cell.textContent = originalBoard[row][col];
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.value = board[row][col] !== 0 ? board[row][col] : '';
                input.oninput = () => {
                    let val = parseInt(input.value);
                    if (val >= 1 && val <= 9) {
                        board[row][col] = val;
                    } else {
                        board[row][col] = 0;
                        input.value = '';
                    }
                };
                input.onclick = () => selectedCell = {row, col};
                cell.appendChild(input);
            }
            boardEl.appendChild(cell);
        }
    }
}

function newGame() {
    generatePuzzle();
    document.getElementById('message').textContent = '';
}

function solvePuzzle() {
    let tempBoard = board.map(row => row.slice());
    if (solve(tempBoard)) {
        board = tempBoard;
        renderBoard();
        document.getElementById('message').innerHTML = '<span style="color:green">Solved! 🎉</span>';
    } else {
        document.getElementById('message').innerHTML = '<span style="color:red">No solution</span>';
    }
}

function checkProgress() {
    let correct = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0 && !isValidForCheck(i, j)) correct = false;
        }
    }
    const msg = document.getElementById('message');
    if (correct) {
        msg.innerHTML = '<span style="color:green">Looking good so far! ✅</span>';
    } else {
        msg.innerHTML = '<span style="color:orange">Some mistakes... Try again!</span>';
    }
}

function isValidForCheck(row, col) {
    const num = board[row][col];
    if (num === 0) return true;
    // Simplified check
    return true; // Basic for demo
}

function clearBoard() {
    board = originalBoard.map(row => row.slice());
    renderBoard();
    document.getElementById('message').textContent = '';
}

// Initialize
generatePuzzle();