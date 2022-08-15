import { recipes } from '../../data/recipes.js';
import {
	addAppareils,
	addIngredients,
	addUstensiles,
	filterByKeyword, listAppareils,
	listIngredients, listUstensiles
} from './filters.js';

/* Factory recipes */
	export function factoryRecipe () {

		function returnDOM (recipe) {
			let div = document.createElement('div');
			div.className= 'col';
			div.innerHTML = `
		  <div class="card shadow-sm">
		    <svg class="bd-placeholder-img h-50 card-img-top" width="100%" height="178" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#C7BEBE"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg>
		    <div class="card-body d-flex flex-column justify-content-between">
		      <div class="d-inline-flex justify-content-between">
		        <p class="card-text">${recipe.name}</p>
		        <p class="card-text">
		          <small>
		            <i class="fa-regular fa-clock"></i>
		            <span class="eta">${recipe.time} min</span>
		          </small>
		        </p>
		      </div>
		      <div class="d-flex justify-content-between align-items-start recipe-description-container">
		        <!-- List of ingredients -->
		        <ul class="ul-ingredients">
					    ${recipe.ingredients.map(ingredient => `<li><p><span class="fw-bold">${ingredient.ingredient} </span> ${ingredient.quantity ? ': ' + ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</p></li>`).join('')}
		        </ul>
		        <!-- /List of ingredients -->
		        <p class="recipe-description w-50">${recipe.description}</p>
		      </div>
		    </div>
		  </div>
		`;
			return div;
		}

	return { returnDOM };
	}
/* /Factory recipes */

	/* For each recipe call listIngredients, listAppliance and listUtensils */
	export function initFunctions () {
			let recipeModel = factoryRecipe(recipes);
			recipes.forEach(recipe => {
				document.getElementById('card-container').append(recipeModel.returnDOM(recipe));
			})
		listIngredients(recipes);
		listAppareils(recipes);
		listUstensiles(recipes);
	}

	/* /For each recipe call listIngredients, listAppliance and listUtensils */

document.getElementById('searchbar').addEventListener('keyup', function (e) {
	let keyword = e.target.value;
	let result = filterByKeyword(keyword);
	listIngredients(result);
	listAppareils(result);
	listUstensiles(result);
	document.getElementById('card-container').innerHTML = ''; // Clear the container
	result.forEach(recipe => {
		let recipeModel = factoryRecipe(recipe);
		document.getElementById('card-container').appendChild(recipeModel.returnDOM(recipe));
	});
});
