import { recipes } from '../../data/recipes.js';

/* Factory recipes */
	export function factoryRecipe () {

		function returnDOM (recipe) {
			return `
		<div class="col">
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
		</div>
		`;
		}

	return { returnDOM };
	}
/* /Factory recipes */

/* List all Ingredients */
export function listAllIngredients (recipes) {
	let ingredientsList = [];
	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredient => {
			ingredientsList.push(ingredient.ingredient);
		});
	});
	/* Remove duplicates */
	return [...new Set(ingredientsList)].sort(); //FIXME
	/* /Remove duplicates */
}

/* ---- List all Appliance ----- */
export function listAllAppliance (recipes) {
	let applianceList = [];
	recipes.forEach(recipe => {
		applianceList.push(recipe.appliance);
	}
	);

	/* Remove duplicates */
	return [...new Set(applianceList)].sort(); //FIXME
	/* /Remove duplicates */
}

/* List all Utensils */
export function listAllUtensils (recipes) {
	let utensilsList = [];
	recipes.forEach(recipe => {
		utensilsList.push(recipe.utensils);
	}
	);

	/* Remove duplicates */
	return [...new Set(utensilsList)].sort(); //FIXME
	/* /Remove duplicates */
}

	/* For each recipe call listIngredients, listAppliance and listUtensils */
	export function testFunctions () {
			let recipeModel = factoryRecipe(recipes);
			recipes.forEach(recipe => {
				document.getElementById('card-container').innerHTML += recipeModel.returnDOM(recipe);
			})
	}

	/* /For each recipe call listIngredients, listAppliance and listUtensils */


document.getElementById('searchbar').addEventListener('keyup', function (e) {
	let keyword = e.target.value;
	if (keyword.length < 3) {
		keyword = '';
	}
	let result = [];
	recipes.forEach(recipe => {
		if (recipe.name.toLowerCase().includes(keyword.toLowerCase()) ||
			recipe.description.toLowerCase().includes(keyword.toLowerCase()) ||
			recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(keyword.toLowerCase()))
		) {
			result.push(recipe);
		}
	});
	document.getElementById('card-container').innerHTML = '';
	console.log(listAllIngredients(result));
	result.forEach(recipe => {
		let recipeModel = factoryRecipe(recipe);
		document.getElementById('card-container').innerHTML += recipeModel.returnDOM(recipe);
	});
});
