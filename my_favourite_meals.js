// Display favorite meals
function displayFavoriteMeals() {
  favoriteMealsList.innerHTML = favoriteMeals.map((meal) => {
    return `
      <li>
        <span>${meal.strMeal}</span>
        <button class="fav-btn" id="remove-btn" onclick="removeFromFavorites('${meal.idMeal}')"><span class="fas fa-trash"></span></button>
        <a class="details" href="meal_detail.html?id=${meal.idMeal}" ><i class="fa fa-book" aria-hidden="true"></i></a>
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
