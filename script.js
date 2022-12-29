console.log("JavaScript has loaded")

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
      question: 'What do you use to find the magnitude of the resultant',
      answers :[
          { text: 'Elimination', correct:false},
          { text: 'Pythagorean theorem', correct:true},
          { text: 'Quadratic Formula', correct:false},
          { text: 'Substitution', correct:false},
      ],
  },
  {
      question: 'An example of a Vector quantity is:',
      answers :[
          { text: 'height', correct:false},
          { text: 'length', correct:false},
          { text: 'Acceleration', correct:true},
          { text: 'mass', correct:false},
      ],
  },
  {
      question: 'The sum of two or more vector is:',
      answers :[
          { text: 'resultant', correct:true},
          { text: 'head-to-tail', correct:false},
          { text: 'sum', correct:false},
          { text: 'scalar', correct:false},
      ],
  },
  {
      question: 'What functions can be used to find the direction of a vector',
      answers :[
          { text: 'sin', correct:true},
          { text: 'csc', correct:false},
          { text: 'cos', correct:true},
          { text: 'tan', correct:true},
      ],
  },
  {
      question: 'A single force is usually resolved into two forces having an angle between them of',
      answers :[
          { text: '0', correct:false},
          { text: '180', correct:false},
          { text: '90', correct:true},
          { text: '360', correct:false},
      ],
  },
  {
      question: 'Forces acting on the same point at the same time are called',
      answers :[
          { text: 'parallel', correct:false},
          { text: 'medium', correct:false},
          { text: 'perpendicular', correct:false},
          { text: 'concurrent', correct:true},
      ],
  },
]

