// The input element where the user enters the search query.
const searchInput = document.getElementById('searchInput');

// The element where the search results will be displayed.
const searchResults = document.getElementById('searchResults');

// The base URL for fetching meal data from the themealdb.com API.
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

/**
Handles the search functionality for meals based on the user's input.
This function is responsible for handling the search functionality. It retrieves the user's input from the 'searchInput' element,
trims the input to remove any leading or trailing whitespace, and checks if the input is empty. If the input is empty, the search
results container ('searchResults') is cleared, and the function returns to avoid unnecessary API calls. If a search term exists, 
it fetches the meal data from the themealdb.com API using the search term as a parameter. The fetched data is then passed to the
'displaySearchResults' function to update the UI and show the search results. If there is an error during the API request, an error
message is logged to the console.
*/
var handleSearch = () => {
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


/**
Displays the search results on the UI.
This function takes an array of meal objects as input, representing the search results from the themealdb.com API. If the 'meals' array
is empty or undefined, the function returns early without making any changes to the UI. If there are search results, the function maps 
over the 'meals' array to generate an HTML list ('mealList') containing the meal names, heart buttons to add the meals to favorites, and
links to view meal details. The 'mealList' is then converted to a string using the 'join' method and inserted into the 'searchResults' 
element on the page, updating the UI with the search results.
@param {Array} meals - An array of meal objects representing the search results.
*/
var displaySearchResults = (meals) => {
  if (!meals) {
    return;
  }

  const mealList = meals.map((meal) => {
    return `
      <li>
        <span>${meal.strMeal}</span>
        <button class="fav-btn" onclick="addToFavorites('${meal.idMeal}')"><span class="fas fa-heart"></span></button>
        <a class="details" href="meal_detail.html?id=${meal.idMeal}" ><i class="fa fa-book" aria-hidden="true"></i></a>
      </li>
    `;
  }).join('');

  searchResults.innerHTML = mealList;
}

/**
Adds a meal to the favorites list.
This function takes a 'mealId' as input and fetches the meal details from the themealdb.com API using the provided meal ID. The fetched meal
object is then added to the 'favoriteMeals' array, representing the list of favorite meals. The updated 'favoriteMeals' array is stored in 
the local storage as a JSON string using the key 'favoriteMeals'. Additionally, a message is logged to the console confirming the addition 
of the meal with the specified ID to the favorites list. If there's an error during the API request, an error message is logged to the console.
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


// An event listener is added to the 'searchInput' element, listening for 'input' events and calling the 'handleSearch' function.
searchInput.addEventListener('input', handleSearch);