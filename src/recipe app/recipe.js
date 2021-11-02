import FetchMeals from "./fetchRecipies";
import { Notify } from "notiflix";

const refs = {
  mealsSection: document.querySelector('.meals'),
  categoriesBtns: document.querySelectorAll('[data-name]'),
  input: document.querySelector('#input'),
  searchBtn: document.querySelector('#search'),
};
const fetchMeals = new FetchMeals;

const renderInfo = ({ strMeal, strMealThumb, strInstructions }) => {
  const markup = `<div class="modal-overlay">
                    <div class="modal">
                      <div class="modal-header">
                        <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                        <h4>${strMeal}</h4>
                        <img src="${strMealThumb}" alt="${strMeal}">
                      </div>
                      <div class="modal-body">
                        <p>${strInstructions}</p>
                      </div>
                    </div>
                  </div>`;
  
  document.body.insertAdjacentHTML('beforeend', markup);

  const closeBtnRef = document.querySelector('.modal-close');
  const modalRef = document.querySelector('.modal-overlay');

  closeBtnRef.addEventListener('click', () => {
    modalRef.classList.add('is-hidden');
    
  });
};

const toggleHeartBtn = () => {
  const btnsHeart = refs.mealsSection.querySelectorAll('button');
  btnsHeart.forEach(btn => btn.addEventListener('click', () => btn.classList.toggle('active')));
};

const renderMeal = (meal, random = false) => {
  const { strMealThumb, strMeal } = meal;
  const markup = `<article class="meal">
                    <div class="meal-header">
                      ${random ? '<h4>Random meal</h4>' : ''}
                      <img src="${strMealThumb}" alt="preview of a meal">
                    </div>
                    <div class="meal-body">
                      <h4>${strMeal}</h4>
                      <button type="button"><i class="fas fa-heart"></i></button>
                    </div>
                  </article>`;
  
  refs.mealsSection.insertAdjacentHTML('afterbegin', markup);
  toggleHeartBtn();
  
  const mealRef = refs.mealsSection.querySelector('.meal');
  
  mealRef.addEventListener('click', () => {
    renderInfo(meal);
  });
};

const loadRandomMeal = () => fetchMeals.byRandom().then(data => {
  renderMeal(data.meals[0], true);
});

loadRandomMeal();

refs.categoriesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.name;

    refs.mealsSection.innerHTML = '';
    
    fetchMeals.byCategory(category).then(data => {
      data.meals.forEach(meal => renderMeal(meal));
    });
  })
});

refs.searchBtn.addEventListener('click', () => {
  const name = refs.input.value;

  refs.mealsSection.innerHTML = '';

  fetchMeals.byName(name).then(data => {
    data.meals.forEach(meal => renderMeal(meal));
  }).catch(err => Notify.failure('Could not find anything'));
});