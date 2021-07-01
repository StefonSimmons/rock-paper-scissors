const choices = document.querySelectorAll('.choice')
const choicesSection = document.querySelector(".choices-section")
const chosenSection = document.querySelector(".chosen-section")
const myChosenContent = document.querySelector(".my-chosen-content")
const houseContent = document.querySelector(".house-chosen-content")
const score = document.querySelector(".score")
const playAgainMsg = document.querySelector(".play-again-msg")
const playAgainBtn = document.querySelector(".play-again-btn")
const ruleModalBtn = document.querySelector(".rule-modal-btn")
const ruleModal = document.querySelector(".rule-modal")
const closeModal = document.querySelector(".close-modal")

const selectionTemplate = (choice) => {
  const selection = `
  <div class="${choice}-choice-color chosen">
    <div class="inner">
      <img
        src="./images/icon-${choice}.svg"
        alt="${choice}"
      />
    </div>
  </div>
`
  return selection
}

const appendChoices = (choiceNode) => {
  const myChoice = choiceNode.value
  const houseChoice = choices[Math.floor(Math.random() * choices.length)].value
  
  myChosenContent.insertAdjacentHTML('beforeend', selectionTemplate(myChoice));
  houseContent.insertAdjacentHTML('beforeend', selectionTemplate(houseChoice));
  return [myChoice, houseChoice]
}

const checkPicks = (picks) => {
  const [myChoice, houseChoice] = picks
  if (myChoice === "paper" && houseChoice === "rock") {
    score.textContent = parseInt(score.textContent) + 1
    playAgainMsg.textContent = "You Win"
  } else if (myChoice === "rock" && houseChoice === "paper") {
    score.textContent = parseInt(score.textContent) - 1
    playAgainMsg.textContent = "You Lose"
  } else if (myChoice === "scissors" && houseChoice === "paper") {
    score.textContent = parseInt(score.textContent) + 1
    playAgainMsg.textContent = "You Win"
  } else if (myChoice === "paper" && houseChoice === "scissors") {
    score.textContent = parseInt(score.textContent) - 1
    playAgainMsg.textContent = "You Lose"
  } else if (myChoice === "rock" && houseChoice === "scissors") {
    score.textContent = parseInt(score.textContent) + 1
    playAgainMsg.textContent = "You Win"
  } else if (myChoice === "scissors" && houseChoice === "rock") {
    score.textContent = parseInt(score.textContent) - 1
    playAgainMsg.textContent = "You Lose"
  } else {
    playAgainMsg.textContent = "Tie!"
  }
}

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    choicesSection.style.display = 'none'
    chosenSection.style.display = 'flex'
    const selections = appendChoices(choice)
    checkPicks(selections)
  })
})

playAgainBtn.addEventListener('click', () => {
  choicesSection.style.display = 'flex'
  chosenSection.style.display = 'none'
  const picks = document.querySelectorAll('.chosen')
  picks.forEach( pick => pick.remove())
})

ruleModalBtn.addEventListener('click', () => {
  ruleModal.style.display = "flex"
})

closeModal.addEventListener('click', () => {
  ruleModal.style.display = "none"
})

