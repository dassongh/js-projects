import questions from './questions';

const refs = {
  question: document.querySelector('.quiz-question'),
  aText: document.getElementById('a_text'),  
  bText: document.getElementById('b_text'),
  cText: document.getElementById('c_text'),
  dText: document.getElementById('d_text'),  
}
let currentQuestion = 0;

loadQuiz();

function loadQuiz() {
  const currentQuiz = questions[currentQuestion];
  const { question, a, b, c, d } = currentQuiz;

  refs.question.innerText = question;
  refs.aText.innerText = a;
  refs.bText.innerText = b;
  refs.cText.innerText = c;
  refs.dText.innerText = d;
}
