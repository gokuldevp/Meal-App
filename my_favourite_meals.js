// Display favorite meals
function displayFavoriteMeals() {
  favoriteMealsList.innerHTML = favoriteMeals.map((meal) => {
    return `
      <li>
        ${meal.strMeal}
        <button onclick="removeFromFavorites('${meal.idMeal}')">Remove from Favorites</button>
      </li>
    `;
  }).join('');
}

// Initial display of favorite meals
displayFavoriteMeals();

// Remove a meal from favorites
function removeFromFavorites(mealId) {
  const updatedFavorites = favoriteMeals.filter((meal) => meal.idMeal !== mealId);
  localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
  favoriteMeals.splice(0, favoriteMeals.length, ...updatedFavorites);
  displayFavoriteMeals();
}

// Add a meal to favorites
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
