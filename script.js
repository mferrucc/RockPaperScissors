// Variables del estado del juego
let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
const TOTAL_ROUNDS = 5;

function playRound(playerChoice) {
    if (roundCount >= TOTAL_ROUNDS) return;

    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    
    // Evaluamos la ronda y sumamos los puntos
    if (playerChoice === computerChoice) {
        result = `Computer chose ${computerChoice} too! It's a tie!`;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        playerScore++;
        result = `Computer chose ${computerChoice}. You win! ${playerChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        result = `Computer chose ${computerChoice}. You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    // Incrementamos la ronda
    roundCount++;

    // --- ACTUALIZAMOS EL DOM EN CADA RONDA ---
    document.getElementById("resultDisplay").textContent = result;
    document.getElementById("roundDisplay").textContent = `Round: ${roundCount} / ${TOTAL_ROUNDS}`;
    document.getElementById("scoreDisplay").textContent = `Score: You ${playerScore} - ${computerScore} Computer`;

    // Verificación de fin de juego en la ronda 5
    if (roundCount === TOTAL_ROUNDS) {
        endGame();
    }
}

function endGame() {
    let finalMessage = "";

    if (playerScore > computerScore) {
        finalMessage = `🏆 GAME OVER! You won the match ${playerScore} to ${computerScore}!`;
    } else if (computerScore > playerScore) {
        finalMessage = `💻 GAME OVER! Computer won the match ${computerScore} to ${playerScore}!`;
    } else {
        finalMessage = `🤝 GAME OVER! It's a tie game (${playerScore} - ${computerScore})!`;
    }

    // Anuncio del ganador final
    document.getElementById("resultDisplay").textContent = finalMessage;

    // Deshabilitamos los botones de juego
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;

    // Mostramos el botón para volver a jugar
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) resetBtn.style.display = "inline-block";
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;

    // Reiniciamos los textos en el DOM
    document.getElementById("roundDisplay").textContent = `Round: 0 / ${TOTAL_ROUNDS}`;
    document.getElementById("scoreDisplay").textContent = `Score: You 0 - 0 Computer`;
    document.getElementById("resultDisplay").textContent = "Choose your weapon to start!";

    // Volvemos a habilitar los botones
    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissors").disabled = false;

    // Ocultamos el botón de reinicio
    document.getElementById("resetBtn").style.display = "none";
}

// Escuchadores de eventos
document.getElementById("rock").addEventListener("click", () => playRound("rock"));
document.getElementById("paper").addEventListener("click", () => playRound("paper"));
document.getElementById("scissors").addEventListener("click", () => playRound("scissors"));
document.getElementById("resetBtn").addEventListener("click", resetGame);