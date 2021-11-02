import FetchMeals from "./fetchRecipies";
import { Notify } from "notiflix";

const refs = {
  mealsSection: document.querySelector('.meals'),
  categoriesBtns: document.querySelectorAll('[data-name]'),
  input: document.querySelector('#input'),
  searchBtn: document.querySelector('#search'),
}
const fetchMeals = new FetchMeals;

const renderMeal = ({ strMealThumb, strMeal }) => {
  const markup = `<article class="meal">
                    <div class="meal-header">
                      <h4>Random meal</h4>
                      <img src="${strMealThumb}" alt="preview of a meal">
                    </div>
                    <div class="meal-body">
                      <h4>${strMeal}</h4>
                      <button type="button"><i class="fas fa-heart"></i></button>
                    </div>
                  </article>`;
  
  refs.mealsSection.insertAdjacentHTML('afterbegin', markup);
};

const renderMeals = meals => {
  const markup = meals.map(({ strMealThumb, strMeal }) => {
    return `<article class="meal">
              <div class="meal-header">
                <img src="${strMealThumb}" alt="preview of a meal">
              </div>
              <div class="meal-body">
                <h4>${strMeal}</h4>
                <button type="button"><i class="fas fa-heart"></i></button>
              </div>
            </article>`
  }).join('');

  refs.mealsSection.insertAdjacentHTML('beforeend', markup);
}

const toggleHeartBtn = () => {
  const btnsHeart = refs.mealsSection.querySelectorAll('button');
  btnsHeart.forEach(btn => btn.addEventListener('click', () => btn.classList.toggle('active')));
}

const loadRandomMeal = () => fetchMeals.byRandom().then(data => {
  renderMeal(data.meals[0], true);
  toggleHeartBtn();
});

loadRandomMeal();

refs.categoriesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.name;

    refs.mealsSection.innerHTML = '';
    
    fetchMeals.byCategory(category).then(data => {
      renderMeals(data.meals);
      toggleHeartBtn();
    });
  })
});

refs.searchBtn.addEventListener('click', () => {
  const name = refs.input.value;

  refs.mealsSection.innerHTML = '';

  fetchMeals.byName(name).then(data => {
    renderMeals(data.meals);
    toggleHeartBtn();
  }).catch(err => Notify.failure('Could not find anything'));
});