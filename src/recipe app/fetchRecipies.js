const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export default class FetchMeals {
  async byName(name) {
    const response = await fetch(`${BASE_URL}search.php?s=${name}`);
    return await response.json();
  }

  async byCategory(category) {
    const response = await fetch(`${BASE_URL}filter.php?c=${category}`);
    return await response.json();
  }

  async byRandom() {
    const response = await fetch(`${BASE_URL}random.php`);
    return await response.json();
  }
}
