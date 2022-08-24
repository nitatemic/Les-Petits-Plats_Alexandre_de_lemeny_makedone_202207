import { recipes } from '../../data/recipes.js';
import { filterByKeyword, listAppareils, listIngredients, listUstensiles } from './filters.js';
import { searchByTag } from './tags.js';


function returnDOM(recipe) {
	let div = document.createElement('div');
	div.className = 'col';
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
					    ${recipe.ingredients.map(ingredient => `<li><p><span class="fw-bold">${ingredient.ingredient} </span> ${ingredient.quantity ? ': ' + ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</p></li>`)
	.join('')}
		        </ul>
		        <!-- /List of ingredients -->
		        <p class="recipe-description w-50">${recipe.description}</p>
		      </div>
		    </div>
		  </div>
		`;
	return div;
}

export async function initFunction() {
	console.log("INIT")
	if (sessionStorage.getItem('userChoices') === null) {
		console.log("No session");
		sessionStorage.setItem('userChoices', JSON.stringify([]));
	}
	const list = await searchByTag(recipes)
	listIngredients(list);
	listAppareils(list);
	listUstensiles(list);
	document.getElementById('card-container').innerHTML = ''; // Clear the container
	list.forEach(recipe => {
		document.getElementById('card-container').append(returnDOM(recipe));
	})
}

document.getElementById('searchbar').addEventListener('keyup', async function (e) {
	let keyword = e.target.value;
	const result = await searchByTag(recipes);
	document.getElementById('card-container').innerHTML = ''; // Clear the container
	const list = filterByKeyword(keyword, result);

	list.forEach(recipe => {
		document.getElementById('card-container').appendChild(returnDOM(recipe));
	});
});

export async function forceSearch() {
	let keyword = document.getElementById('searchbar').value;
	const result = await searchByTag(recipes)
	document.getElementById('card-container').innerHTML = ''; // Clear the container
	const list = filterByKeyword(keyword, result);
	list.forEach(recipe => {
		document.getElementById('card-container').appendChild(returnDOM(recipe));
	});
}
