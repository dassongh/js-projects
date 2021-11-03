import FetchMeals from "./fetchRecipies";
import { Notify } from "notiflix";

const refs = {
  mealsSection: document.querySelector('.meals'),
  categoriesBtns: document.querySelectorAll('[data-name]'),
  input: document.querySelector('#input'),
  searchBtn: document.querySelector('#search'),
  info: document.querySelector('.info'),
};
const fetchMeals = new FetchMeals;

const renderInfo = meal => {
  const ingrArray = [];

  for (let i = 1; i <= 20; i += 1) {
    if (meal['strIngredient' + i]) {
      ingrArray.push(`${meal['strIngredient' + i]} / ${meal['strMeasure' + i]}`);
    } else {
      break;
    }
  }

  const markup = ` <div class="modal-overlay">
                  <div class="modal">
                      <div class="modal-header">
                      <button type="button" class="modal-close"><i class="fas fa-times"></i></button>
                    <h4>${meal.strMeal}</h4>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                  </div>
                      <div class="modal-body">
                        <p>${meal.strInstructions}</p>
                        <h5>Ingredients</h5>
                        <ul>
                        ${ingrArray.map(el => `<li>${el}</li>`).join('')}
                        </ul>
                      </div>
                    </div>
                  </div>`
  refs.info.insertAdjacentHTML('beforeend', markup);
}

const renderMeal = (meal, random = false) => {
  const { strMealThumb, strMeal, idMeal } = meal;
  const markup = `<article class="meal">
                    <div class="meal-header">
                      ${random ? '<h4>Random meal</h4>' : ''}
                      <img src="${strMealThumb}" alt="preview of a meal">
                    </div>
                    <div class="meal-body">
                      <h4>${strMeal}</h4>
                      <button type="button" class="open"><i class="fas fa-expand-arrows-alt"></i></button>
                    </div>
                  </article>
                 `;
  
  refs.mealsSection.insertAdjacentHTML('afterbegin', markup);
  
  const openBtnRef = document.querySelector('.open');
  
  openBtnRef.addEventListener('click', () => {
    fetchMeals.byId(idMeal).then(data => {
      renderInfo(data.meals[0]);

      const closeBtnRef = document.querySelector('.modal-close');
      const modalRef = document.querySelector('.modal-overlay');

      closeBtnRef.addEventListener('click', () => {
        refs.info.innerHTML = '';
      });

      modalRef.addEventListener('click', (e) => {
        if (e.currentTarget === e.target) refs.info.innerHTML = '';
        console.log('clock')
      })
    })
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
  });
});

refs.searchBtn.addEventListener('click', () => {
  const name = refs.input.value;

  refs.mealsSection.innerHTML = '';

  fetchMeals.byName(name).then(data => {
    data.meals.forEach(meal => renderMeal(meal));
  }).catch(err => Notify.failure('Could not find anything'));
});