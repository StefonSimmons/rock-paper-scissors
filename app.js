const choices = document.querySelectorAll('.choice')
const choicesSection = document.querySelector(".choices-section")
const chosenSection = document.querySelector(".chosen-section")
const myChosenContent = document.querySelector(".my-chosen-content")
const houseChosenContent = document.querySelector(".house-chosen-content")
const score = document.querySelector(".score")
const playAgainContent = document.querySelector('.play-again-content')
const playAgainMsg = document.querySelector(".play-again-msg")
const playAgainBtn = document.querySelector(".play-again-btn")
const ruleModalBtn = document.querySelector(".rule-modal-btn")
const devModalBtn = document.querySelector(".developer-modal-btn")
const modalBG = document.querySelector(".dark-bg-modal")
const ruleModal = document.querySelector(".rule-modal")
const devModal = document.querySelector(".developer-modal")
const closeModals = document.querySelectorAll(".close-modal")

// HELPER TEMPLATE FOR CHOICE BUTTONS
const selectionTemplate = (choice) => {
  loadShot()
  const selection = `
  <button class="${choice}-choice-color chosen" value=${choice}>
    <div class="inner-choice${choice === "loading" ? "-loading" : ''}">
      ${choice === "loading"
      ? 'rock'
      :
      `
        <img
        src="./images/icon-${choice}.svg"
        alt="${choice}"
        />
      `
    }
    </div>
  </button>
`
  return selection
}

// setInterval AND LOADING 'ROCK', 'PAPER', 'SCISSORS
function loadShot() {
  let time = 0
  const readyArr = ['paper', 'scissors']
  const count = setInterval(() => {
    const innerChoiceLoading = document.querySelectorAll('.inner-choice-loading')
    innerChoiceLoading.forEach((loader) => loader.textContent = readyArr[time])
    time += 1
    if (time === 3) {
      clearInterval(count)
    }
  }, 1000);
}

// ADD PICKS TO DOM
const appendChoices = (choice) => {
  const myChoice = choice.value
  const houseChoice = choices[Math.floor(Math.random() * choices.length)].value

  myChosenContent.insertAdjacentHTML('beforeend', selectionTemplate('loading'));
  houseChosenContent.insertAdjacentHTML('beforeend', selectionTemplate('loading'));

  setTimeout(() => { // pausing for dramatic effect
    document.querySelectorAll('.loading-choice-color').forEach(c => c.remove())
    houseChosenContent.insertAdjacentHTML('beforeend', selectionTemplate(houseChoice));
    myChosenContent.insertAdjacentHTML('beforeend', selectionTemplate(myChoice));
  }, 3000)

  return [myChoice, houseChoice]
}

// SCORE PICK HELPER
const playerWon = () => {
  score.textContent = parseInt(score.textContent) + 1
  playAgainMsg.textContent = "You Win"
  myChosenContent.children[1].classList.add('winner')
}
// SCORE PICK HELPER
const houseWon = () => {
  score.textContent = parseInt(score.textContent) - 1
  playAgainMsg.textContent = "You Lose"
  myChosenContent.children[1].classList.add('not-winner')
}

// CHOOSE WINNER & CHANGE SCOREBOARD
const scorePicks = (picks) => {
  const [myChoice, houseChoice] = picks
  if (myChoice === "paper" && houseChoice === "rock") {
    playerWon()
  } else if (myChoice === "rock" && houseChoice === "paper") {
    houseWon()
  } else if (myChoice === "scissors" && houseChoice === "paper") {
    playerWon()
  } else if (myChoice === "paper" && houseChoice === "scissors") {
    houseWon()
  } else if (myChoice === "rock" && houseChoice === "scissors") {
    playerWon()
  } else if (myChoice === "scissors" && houseChoice === "rock") {
    houseWon()
  } else {
    playAgainMsg.textContent = "Tie!"
  }
}



// EVENT LISTENER FOR EACH CHOICE
choices.forEach(choice => {
  choice.addEventListener('click', () => {
    choicesSection.style.display = 'none'
    chosenSection.style.display = 'flex'

    const selections = appendChoices(choice)

    setTimeout(() => { // pause for dramatic effect
      playAgainContent.style.visibility = "visible"
      scorePicks(selections)
    }, 3000)
  })
})


// OTHER EVENT LISTENERS
playAgainBtn.addEventListener('click', () => {
  choicesSection.style.display = 'flex'
  chosenSection.style.display = 'none'
  const picks = document.querySelectorAll('.chosen')
  picks.forEach(pick => pick.remove())
  playAgainContent.style.visibility = "hidden"
})

ruleModalBtn.addEventListener('click', () => {
  modalBG.style.display = "flex"
  ruleModal.style.display = "flex"
})

devModalBtn.addEventListener('click', () => {
  modalBG.style.display = "flex"
  devModal.style.display = "flex"
})

// add event to both close-modal divs
closeModals.forEach(closeModal => {
  closeModal.addEventListener('click', () => {
    modalBG.style.display = "none"
    ruleModal.style.display = "none"
    devModal.style.display = "none"
  })
})

