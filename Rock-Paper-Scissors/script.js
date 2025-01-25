let userScore = 0;
let compScore = 0;
let drawScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const autoplayButton = document.querySelector(".auto-play");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const drawScorePara = document.querySelector("#draw-score");
const moves = document.querySelector(".js-moves");



const genCompChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return choices[randIdx];
};

const drawGame = () => {
    drawScore++;
    drawScorePara.innerText = drawScore;
    msg.innerText = `Game was draw .Play again.`;
    msg.style.backgroundColor = "#081b31";

};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win ! ,Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost . ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;

        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        moves.
            innerHTML = ` <img class="move-icon" src="images/${userChoice}.png" alt="">
        <img class="move-icon" src="images/${compChoice}.png" alt="">`;

        showWinner(userWin, userChoice, compChoice);
    }


};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (isAutoplay) return;
        const userChoice = choice.getAttribute("id");
        console.log("Button was clicked", userChoice);
        playGame(userChoice);
    });
});


let isAutoplay = false;
let intervalId;
function autoplay() {
    if (!isAutoplay) {
        autoplayButton.style.backgroundColor = "red";
        intervalId = setInterval(function () {
            const playerMove = genCompChoice();
            playGame(playerMove);
        }, 500)
        isAutoplay = true;
    }

    else {
        autoplayButton.style.backgroundColor = "rgb(226, 154, 10)";
        clearInterval(intervalId);
        isAutoplay = false;
    }
}


const reset = () => {
    userScore = 0;
    compScore = 0;
    drawScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    drawScorePara.innerText = drawScore;
    msg.innerText = "Game reset! Make your move.";
    msg.style.backgroundColor = "#081b31";
    moves.innerHTML = "";
};