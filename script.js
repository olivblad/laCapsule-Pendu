let solution = "";

//Add Event Listener to our Button when clicked : will fire our initializeGame function
//& make our GuesserContainer visible
const btnGuess = document.getElementById("btn-guess");
btnGuess.addEventListener("click", () => {
  initializeGame();
  if (solution.length === 0) {
    alert("Please enter a word ... so far it's an empty string");
  } else {
    //Hide player 1 container 'guessContainer'
    const parent = btnGuess.parentNode;
    parent.style.display = "none";
    //Display player 2 container 'guesserContainer'
    const guesserContainer = document.getElementsByClassName(
      "guesserContainer"
    )[0];
    guesserContainer.style.display = "flex";
    //Log our solution if clue is needed...
    console.log(solution);
  }
});

//Function to store the word to be guessed and display the hidden version "_ _ ..."
const initializeGame = () => {
  const hiddenWord = document.getElementById("hiddenWord");
  const keyword = document.getElementById("guessWord").value;
  solution = keyword;
  keyword.split("").forEach((letter) => {
    hiddenWord.textContent = hiddenWord.textContent + "_";
  });
};

//Add Event Listener to GuesserContainer when 'Try' btn is clicked
const guessingBtn = document.getElementById("btn-guessing");
guessingBtn.addEventListener("click", () => {
  takeAChance();
});

//Function fired when 'Try' btn is clicked
const takeAChance = () => {
  const hiddenword = document.getElementById("hiddenWord");
  const tabHidden = hiddenword.textContent.split("");
  const inputLetter = document.getElementById("guessingArea").value;
  const keyword = solution.toLowerCase().split("");
  let included = false;
  //Assess if your letter is included in the hidden word
  //if so : update the hidden part and reveal the letter in it
  keyword.forEach((letter, index) => {
    if (inputLetter.toLowerCase() === letter) {
      included = true;
      tabHidden[index] = inputLetter.toUpperCase();
      console.log(tabHidden);
      hiddenword.textContent = tabHidden.join("");
    }
  });
  //if not : score is decreasing
  if (included == false) {
    console.log("not included");
    const scoreElt = document.getElementById("score");
    let score = parseInt(scoreElt.textContent);
    score--;
    scoreElt.textContent = score;
  }
  //check the status of the game (score = 0 ? word is discovered ?)
  checkGameStatus();
};

//Function to assess the game's status
const checkGameStatus = () => {
  const score = parseInt(document.getElementById("score").textContent);
  const hiddenWord = document.getElementById("hiddenWord");
  score === 0 ? youLose() : null;
  hiddenWord.textContent.toLowerCase() === solution ? youWin() : null;
};

const youLose = () => {
  const guesserContainer = document.getElementsByClassName(
    "guesserContainer"
  )[0];
  guesserContainer.style.display = "none";
  const status = document.getElementsByClassName("statusContainer")[0];
  console.log(status);
  const gameContainer = document.getElementsByClassName("gameContainer")[0];
  gameContainer.style.display = "none";
  const div = document.createElement("div");
  div.className = "final";
  status.appendChild(div);
  const h1 = document.createElement("h1");
  h1.className = "lose";
  h1.textContent = "You Lose";
  div.appendChild(h1);
  const img = document.createElement("img");
  img.className = "finalImg";
  img.src = "./losing.jpg";
  div.appendChild(img);

  console.log("you lose");
};

const youWin = () => {
  const guesserContainer = document.getElementsByClassName(
    "guesserContainer"
  )[0];
  guesserContainer.style.display = "none";
  const gameContainer = document.getElementsByClassName("gameContainer")[0];
  gameContainer.style.display = "none";
  const status = document.getElementsByClassName("statusContainer")[0];
  const div = document.createElement("div");
  div.className = "final";
  status.appendChild(div);
  const h1 = document.createElement("h1");
  h1.className = "win";
  h1.textContent = "You Win, Congrats";
  div.appendChild(h1);
  const img = document.createElement("img");
  img.className = "finalImg";
  img.src = "./winning.jpg";
  div.appendChild(img);

  console.log("you win, bravo");
};
