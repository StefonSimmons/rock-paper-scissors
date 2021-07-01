const choices = document.querySelectorAll('.choice')
const choicesSection = document.querySelector(".choices-section")
const chosenSection = document.querySelector(".chosen-section")
const myChosenContent = document.querySelector(".my-chosen-content")
const houseContent = document.querySelector(".house-chosen-content")

const selectionTemplate = (choice) => {
  const selection = `
  <div class="${choice}-choice-color chosen">
    <div class="inner">
      <img
        src="./images/icon-${choice}.svg"
        alt="${choice}"
        class="${choice}-btn"
      />
    </div>
  </div>
`
  return selection
}

const getChoice = (choiceNode) => {
  const myChoice = choiceNode.value
  const houseChoice = choices[Math.floor(Math.random() * choices.length)].value
  
  myChosenContent.insertAdjacentHTML('beforeend', selectionTemplate(myChoice));
  houseContent.insertAdjacentHTML('beforeend', selectionTemplate(houseChoice));

}

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    choicesSection.style.display = 'none'
    chosenSection.style.display = 'flex'
    getChoice(choice)
  })
})

