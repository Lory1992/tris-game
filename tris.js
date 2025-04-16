const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let againstBot = false;

// Eventi per i pulsanti
document.getElementById("botBtn").addEventListener("click", () => {
    againstBot = true;
    console.log("Modalità: contro il bot");
    resetGame();
    document.getElementById("winner").textContent = "Modalità: contro il bot!";
});

document.getElementById("playerBtn").addEventListener("click", () => {
    againstBot = false;
    console.log("Modalità: due giocatori");
    resetGame();
    document.getElementById("winner").textContent = "Modalità: due giocatori!";
});

// Funzione per resettare il gioco
function resetGame() {
    console.log("Reset della griglia...");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto"; // Rendi cliccabili le celle
    });
    currentPlayer = "X";
    document.getElementById("winner").textContent = "";
}

// Funzione per verificare se c'è un vincitore
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const grid = Array.from(cells).map(cell => cell.textContent);
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
            console.log(`Vittoria! Combinazione vincente: ${combo}`);
            document.getElementById("winner").textContent = `Il vincitore è ${grid[a]}!`;
            cells.forEach(cell => cell.style.pointerEvents = "none"); // Disabilita tutte le celle
            return true;
        }
    }
    return false;
}

// Funzione per la mossa del bot
function botMove() {
    console.log("Il bot sta pensando...");
    let emptyCells = Array.from(cells).filter(cell => cell.textContent === "");
    console.log(`Celle vuote: ${emptyCells.length}`);
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        console.log(`Il bot sceglie la cella: ${randomCell.id}`);
        randomCell.textContent = "O"; // Il bot gioca come "O"
        randomCell.style.pointerEvents = "none";
        if (!checkWinner()) {
            currentPlayer = "X"; // Torna al giocatore umano
        }
    }
}

// Eventi per le celle
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent === "" && document.getElementById("winner").textContent === "") {
            console.log(`Cliccata la cella: ${cell.id}`);
            cell.textContent = currentPlayer;
            cell.style.pointerEvents = "none"; // Evita ricliccamenti
            if (!checkWinner()) {
                if (againstBot && currentPlayer === "X") {
                    currentPlayer = "O";
                    setTimeout(botMove, 500); // Il bot gioca con un breve ritardo
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }
    });
});
