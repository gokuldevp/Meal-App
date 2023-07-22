// Get the container element where the meal details will be displayed
const mealDetailsContainer = document.getElementById('mealDetails');

// Retrieve the meal ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

// The URL of the themealdb.com API endpoint for fetching meal details
const API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
console.log(mealId);

// If a valid meal ID exists, fetch the meal details from the API
if (mealId) {
  fetch(API_URL + mealId)
    .then((response) => response.json())
    .then((data) => {
      // Extract the meal object from the API response
      const meal = data.meals[0];
      // Display the meal details on the UI
      displayMealDetails(meal);
    })
    .catch((error) => {
      console.error('Error fetching meal details:', error);
    });
}

/**
Displays meal details on the UI.
This function is responsible for updating the UI to display the details of a specific meal. It takes a 'meal' object as input, containing
information such as the meal name, image, and instructions. The function generates HTML elements to represent the meal details, including
the meal name, image, and instructions. The generated HTML is then inserted into the 'mealDetailsContainer' element on the page to display
the meal details.
@param {object} meal - The meal object containing details like name, image, and instructions.
*/
var displayMealDetails = (meal) => {
  const mealDetailHTML = `
  <br>
  <div class="container d-flex justify-content-center">
    <div class="card">
      <!-- Card body -->
      <div class="card-body">
        <div class="row">
          <!-- Segment 1: Name -->
          <div class="col-12 text-center">
            <h2 class="card-title">${meal.strMeal}</h2>
          </div>
        </div>
        <div class="row">
          <!-- Segment 2: Image -->
          <div class="col-12 text-center">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
          </div>
        </div>
        <div class="row">
          <!-- Segment 3: Details -->
          <div class="col-12 text-center">
          <br>
            <p class="card-text">${meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  mealDetailsContainer.innerHTML = mealDetailHTML;
}

