import questions from './questions';

const refs = {
  question: document.querySelector('.quiz-question'),
  aText: document.getElementById('a_text'),  
  bText: document.getElementById('b_text'),
  cText: document.getElementById('c_text'),
  dText: document.getElementById('d_text'),
  button: document.querySelector('.button'),
  container: document.querySelector('.quiz-container'),
  input: document.querySelectorAll('input'),
}
let currentQuestion = 0;
let score = 0;

const loadQuiz = () => {
  const currentQuiz = questions[currentQuestion];
  const { question, a, b, c, d } = currentQuiz;
  
  deselectAnswers();

  refs.question.innerText = question;
  refs.aText.innerText = a;
  refs.bText.innerText = b;
  refs.cText.innerText = c;
  refs.dText.innerText = d;
};

const getAnswer = () => {
  let answer = undefined;

  refs.input.forEach(el => {  
    if (el.checked) answer = el.id;
  });

  return answer;
};

const deselectAnswers = () => {
  refs.input.forEach((el) => {
    el.checked = false;
  });
};

loadQuiz();

refs.button.addEventListener('click', () => {
  const answer = getAnswer();
  
  if (answer) {
    if (answer === questions[currentQuestion].correct) score += 1;

    currentQuestion += 1;

    if (currentQuestion < questions.length) {
      loadQuiz();
    } else {
      refs.container.innerHTML = `<h2 class="quiz-question">Congratulations!
                                      You have answered correctly on
                                      ${score} out of ${questions.length}
                                      questions.</h2>
                                      <button type="button"
                                      class="button" onclick="location.reload()">
                                      Reload</button>`;
    }
  }
});

