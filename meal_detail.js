const mealDetailsContainer = document.getElementById('mealDetails');
// const mealId = document.g

const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
console.log(mealId);

if (mealId) {
  fetch(API_URL + mealId)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      displayMealDetails(meal);
    })
    .catch((error) => {
      console.error('Error fetching meal details:', error);
    });
}

function displayMealDetails(meal) {
  const mealDetailHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <p>${meal.strInstructions}</p>
    <!-- Add any additional information you want to display -->
  `;

  mealDetailsContainer.innerHTML = mealDetailHTML;
}

