const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

searchInput.addEventListener('input', handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    searchResults.innerHTML = '';
    return;
  }

  fetch(API_URL + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResults(data.meals);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function displaySearchResults(meals) {
  if (!meals) {
    return;
  }

  const mealList = meals.map((meal) => {
    return `
      <li>
        ${meal.strMeal}
        <button onclick="addToFavorites('${meal.idMeal}')">Add to Favorites</button>
        <a href="meal_detail.html?id=${meal.idMeal}" target="_blank">View Details</a>
      </li>
    `;
  }).join('');

  searchResults.innerHTML = mealList;
}

function addToFavorites(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      favoriteMeals.push(meal);
      localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
      console.log(`Added meal with ID ${mealId} to favorites.`);
    })
    .catch((error) => {
      console.error('Error fetching meal details:', error);
    });
}