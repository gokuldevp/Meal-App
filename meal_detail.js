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

