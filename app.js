const choices = document.querySelectorAll('.choice')
const choicesSection = document.querySelector(".choices-section")
const chosenSection = document.querySelector(".chosen-section")
const myChosenContent = document.querySelector(".my-chosen-content")
const houseContent = document.querySelector(".house-chosen-content")
const score = document.querySelector(".score")

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
  } else if (myChoice === "rock" && houseChoice === "paper") {
    score.textContent = parseInt(score.textContent) - 1
  } else if (myChoice === "scissors" && houseChoice === "paper") {
    score.textContent = parseInt(score.textContent) + 1
  } else if (myChoice === "paper" && houseChoice === "scissors") {
    score.textContent = parseInt(score.textContent) - 1
  } else if (myChoice === "rock" && houseChoice === "scissors") {
    score.textContent = parseInt(score.textContent) + 1
  } else if (myChoice === "scissors" && houseChoice === "rock") {
    score.textContent = parseInt(score.textContent) - 1
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

