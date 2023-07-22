/**
Displays the favorite meals on the UI.
This function is responsible for updating the UI to display the list of favorite meals. It takes the favoriteMeals array and generates 
HTML elements for each meal, including the meal name, a remove button, and a link to the meal's detail page. The generated HTML is then
inserted into the 'favoriteMealsList' element on the page. The remove button is linked to the 'removeFromFavorites' function, passing 
the corresponding meal ID as a parameter to enable removal of the meal from the favorites list.
*/
var displayFavoriteMeals = () => {
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

/**
Removes a meal from the favorites list.
This function takes a meal ID as input and removes the corresponding meal from the favoriteMeals array. The updated favoriteMeals array, 
excluding the specified meal, is then stored in the local storage as a JSON string using the key 'favoriteMeals'. The original favorite
Meals array is cleared and replaced with the updatedFavorites array using the splice method. After the removal, the displayFavoriteMeals
function is called to update the UI and reflect the changes in the favorites list.
@param {string} mealId - The ID of the meal to be removed from favorites.
*/
var removeFromFavorites = (mealId) => {
  const updatedFavorites = favoriteMeals.filter((meal) => meal.idMeal !== mealId);
  localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
  favoriteMeals.splice(0, favoriteMeals.length, ...updatedFavorites);
  displayFavoriteMeals();
}

/**
Adds a meal to the favorites list.
This function takes a meal ID as input, fetches the meal details from the themealdb.com API, and then adds the meal to the favoriteMeals array.
The updated favoriteMeals array is stored in the local storage as a JSON stringusing the key 'favoriteMeals'. Additionally, a message is logged
to the console confirming the addition of the meal to the favorites list. If there's an error during the API request, an error message is logged
to the console.
@param {string} mealId - The ID of the meal to be added to favorites.
*/
var addToFavorites = (mealId) => {
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
