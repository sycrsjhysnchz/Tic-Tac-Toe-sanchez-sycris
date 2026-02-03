class TicTacToe {
    constructor() {
        // Select DOM elements [cite: 86]
        this.cells = document.querySelectorAll(".cell");
        this.statusText = document.getElementById("status");
        this.resetButton = document.getElementById("reset");

        // Game state [cite: 86]
        this.currentPlayer = "X";
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.isGameActive = true;

        // All possible winning positions [cite: 86]
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.init(); // Start the game [cite: 91]
    }

    // Initialize Event Listeners [cite: 97]
    init() {
        this.statusText.textContent = `Player ${this.currentPlayer}'s turn`;
        this.cells.forEach(cell => {
            cell.addEventListener("click", (e) => this.handleClick(e));
        });
        this.resetButton.addEventListener("click", () => this.resetGame());
    }

    // Handle Player Click [cite: 112, 113]
    handleClick(event) {
        const index = event.target.dataset.index;

        // Ignore if cell is filled or game is over [cite: 115, 116]
        if (this.board[index] !== "" || !this.isGameActive) {
            return;
        }

        // Update board and UI [cite: 119, 120, 121]
        this.board[index] = this.currentPlayer;
        event.target.textContent = this.currentPlayer;
        
        this.checkWinner();
    }

    // Check Winner or Draw [cite: 131, 132]
    checkWinner() {
        let roundWon = false;

        for (let combo of this.winningCombinations) {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            this.statusText.textContent = `Player ${this.currentPlayer} wins!`;
            this.isGameActive = false;
            return;
        }

        // Check for draw [cite: 146, 148]
        if (!this.board.includes("")) {
            this.statusText.textContent = "It's a draw!";
            this.isGameActive = false;
            return;
        }

        this.switchPlayer();
    }

    // Switch Player [cite: 158, 159]
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusText.textContent = `Player ${this.currentPlayer}'s turn`;
    }

    // Reset Game [cite: 170, 171]
    resetGame() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.isGameActive = true;
        this.currentPlayer = "X";
        this.statusText.textContent = "Player X's turn";
        this.cells.forEach(cell => cell.textContent = "");
    }
}

// Instantiate the game [cite: 182]
new TicTacToe();