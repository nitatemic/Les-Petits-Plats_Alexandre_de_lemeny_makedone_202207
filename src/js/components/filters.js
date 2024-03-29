/* Events listeners on filter */
import { createTag } from "./tags.js";
import { forceSearch } from './recipes.js';

export const filterEvents = () => {

	/* Getting the elements from the DOM. */
	const filterIngredients = document.getElementById('filter-ingredients');
	const filterAppareils = document.getElementById('filter-appareils');
	const filterUstensiles = document.getElementById('filter-ustensiles');

	const inputIngredients = document.getElementById('input-ingredients');
	const inputAppareils = document.getElementById('input-appareils');
	const inputUstensiles = document.getElementById('input-ustensiles');

	const buttonIngredients = document.getElementById('button-ingredients');
	const buttonAppareils = document.getElementById('button-appareils');
	const buttonUstensiles = document.getElementById('button-ustensiles');

	const iconIngredients = document.getElementById('icon-ingredients');
	const iconAppareils = document.getElementById('icon-appareils');
	const iconUstensiles = document.getElementById('icon-ustensiles');

	const dropdownIngredients = document.getElementById('list-ingredients');
	const dropdownAppareils = document.getElementById('list-appareils');
	const dropdownUstensiles = document.getElementById('list-ustensiles');


	const filtersDiv = [filterIngredients, filterAppareils, filterUstensiles];
	const filtersInputs = [inputIngredients, inputAppareils, inputUstensiles];
	const filtersButtons = [buttonIngredients, buttonAppareils, buttonUstensiles];
	const filtersIcons = [iconIngredients, iconAppareils, iconUstensiles];
	const dropdowns = [dropdownIngredients, dropdownAppareils, dropdownUstensiles];

	filtersButtons.forEach((button, index) => {
		button.addEventListener('click', () => {
			if (filtersIcons[index].classList.contains('fa-chevron-down')) {
				filtersIcons[index].classList.remove('fa-chevron-down');
				filtersIcons[index].classList.add('fa-chevron-up');
				filtersDiv[index].classList.add('filterFocus');
				dropdowns[index].classList.add('dropdownFocus');
			} else {
				filtersIcons[index].classList.remove('fa-chevron-up');
				filtersIcons[index].classList.add('fa-chevron-down');
				filtersDiv[index].classList.remove('filterFocus');
				dropdowns[index].classList.remove('dropdownFocus');
			}
		});
	});

	filtersInputs.forEach((input, index) => {
		input.addEventListener('focus', () => {
				filtersDiv[index].classList.add('filterFocus');
				filtersIcons[index].classList.remove('fa-chevron-down');
				filtersIcons[index].classList.add('fa-chevron-up');
				filtersDiv[index].classList.add('filterFocus');
				dropdowns[index].classList.add('dropdownFocus');
			}
			, false);
		input.addEventListener('keyup', (e) => {
			/* If esc key is pressed, close the dropdown, remove the focus and clear the input */
			if (e.keyCode === 27) {
				filtersIcons[index].classList.remove('fa-chevron-up');
				filtersIcons[index].classList.add('fa-chevron-down');
				filtersDiv[index].classList.remove('filterFocus');
				dropdowns[index].classList.remove('dropdownFocus');
				input.blur();
			} else {
				let keyword = e.target.value;
				searchInFilters(input.id, keyword)
			}
		});
	});

	dropdowns.forEach((dropdown, index) => {
		dropdown.addEventListener('show.bs.dropdown', (e) => {
			filtersDiv[index].classList.add('filterFocus');
			filtersIcons[index].classList.remove('fa-chevron-down');
			filtersIcons[index].classList.add('fa-chevron-up');
			filtersDiv[index].classList.add('filterFocus');
		});
		dropdown.addEventListener('hide.bs.dropdown', (e) => {
			filtersIcons[index].classList.remove('fa-chevron-up');
			filtersIcons[index].classList.add('fa-chevron-down');
			filtersDiv[index].classList.remove('filterFocus');
		});
	});

	//TODO : Event listener on dropdown  (https://getbootstrap.com/docs/5.2/components/dropdowns/#events)

};

/**
 * It takes the list of recipes, extracts the list of ingredients, removes duplicates, sorts the list,
 * and then adds the list to the state
 * @param result - the array of recipes returned from the API call
 * @returns An array of ingredients.
 */
export function listIngredients(result) {
	let ingredientsList = [];
	result.forEach(recipe => {
		recipe.ingredients.forEach((ingredient) => {
			ingredientsList.push(ingredient.ingredient);
		});
	});
	/* Get local storage */
	let userChoices = JSON.parse(sessionStorage.getItem('userChoices'));
	if (userChoices !== null && userChoices.length > 0) {
		/* Filter userChoices to keep only the ingredients */
		userChoices = userChoices.filter(choice => choice.split(":")[0] === 'ingredient');

		/* For each ingredient in the userChoices, remove it from the ingredientsList */
		userChoices.forEach(choice => {
			ingredientsList = ingredientsList.filter(ingredient => ingredient !== choice.split(":")[1]);
		});
	}

	return addIngredients([...new Set(ingredientsList)].sort());
}


/**
 * It takes a list of ingredients, clears the list of ingredients in the DOM, and then adds the new
 * list of ingredients to the DOM
 * @param listOfIngredients - an array of strings
 * @returns The list of ingredients.
 */
export function addIngredients(listOfIngredients) {
	document.getElementById('list-ingredients').innerHTML = '';
	listOfIngredients.forEach((ingredient) => {
		let liDOM = document.createElement('li');
		liDOM.id = `li-${ingredient}`;
		let a = document.createElement('a');
		a.addEventListener('click', () => {
			createTag('ingredient', ingredient);
			forceSearch();
		});
		a.innerHTML = ingredient;
		a.className = 'dropdown-item';
		liDOM.appendChild(a);
		document.getElementById('list-ingredients').appendChild(liDOM);
	})
	return listOfIngredients;
}


/**
 * It takes the list of recipes, extracts the list of appliances, removes duplicates, sorts the list,
 * and then adds the list to the state
 * @param result - the result of the API call
 * @returns an array of unique appareils.
 */
export function listAppareils(result) {
	let appareilsList = [];
	result.forEach(recipe => {
		appareilsList.push(recipe.appliance);
	});

	/* Get local storage */
	let userChoices = JSON.parse(sessionStorage.getItem('userChoices'));
	if (userChoices !== null && userChoices.length > 0) {
		/* Filter userChoices to keep only the ingredients */
		userChoices = userChoices.filter(choice => choice.split(":")[0] === 'appareil');
		/* For each ingredient in the userChoices, remove it from the ingredientsList */
		userChoices.forEach(choice => {
			appareilsList = appareilsList.filter(appareil => appareil !== choice.split(":")[1]);
		});
	}
	return addAppareils([...new Set(appareilsList)].sort());
}

/**
 * It takes a list of appareils, creates a DOM element for each appareil, and appends it to the list of
 * appareils
 * @param listOfAppareils - an array of strings
 * @returns The list of appareils
 */
export function addAppareils(listOfAppareils) {
	document.getElementById('list-appareils').innerHTML = '';
	listOfAppareils.forEach((appareil) => {
		let liDOM = document.createElement('li');
		let a = document.createElement('a');
		liDOM.id = `li-${appareil}`;
		a.addEventListener('click', () => {
			createTag('appareil', appareil);
			forceSearch();
		});
		a.innerHTML = appareil;
		a.className = 'dropdown-item';
		liDOM.appendChild(a);
		document.getElementById('list-appareils').appendChild(liDOM);
	})
	return listOfAppareils;
}


/**
 * It takes an array of recipes, and returns an array of unique utensils
 * @param result - the result of the API call
 * @returns An array of unique utensils sorted alphabetically.
 */
export function listUstensiles(result) {
	let ustensilesList = []
	result.forEach(recipe => {
		recipe.utensils.forEach((utensil) => {
			ustensilesList.push(utensil);
		});
	});
	/* Get local storage */
	let userChoices = JSON.parse(sessionStorage.getItem('userChoices'));
	if (userChoices !== null && userChoices.length > 0) {
		/* Filter userChoices to keep only the ingredients */
		userChoices = userChoices.filter(choice => choice.split(":")[0] === 'ustensile');
		/* For each ingredient in the userChoices, remove it from the ingredientsList */
		userChoices.forEach(choice => {
			ustensilesList = ustensilesList.filter(ustensile => ustensile !== choice.split(":")[1]);
		});
	}

	return addUstensiles([...new Set(ustensilesList)].sort());
}

/**
 * It takes a list of ustensiles, and adds them to the DOM
 * @param listOfUstensiles - an array of strings
 * @returns The list of ustensiles
 */
export function addUstensiles(listOfUstensiles) {
	document.getElementById('list-ustensiles').innerHTML = '';
	listOfUstensiles.forEach((ustensile) => {
		let liDOM = document.createElement('li');
		liDOM.id = `li-${ustensile}`;
		let a = document.createElement('a');
		a.addEventListener('click', () => {
			createTag('ustensile', ustensile);
			forceSearch();
		});
		a.innerHTML = ustensile;
		a.className = 'dropdown-item';
		liDOM.appendChild(a);
		document.getElementById('list-ustensiles').appendChild(liDOM);
	})
	return listOfUstensiles;
}


/**
 * It filters the recipes array by the keyword, and returns the filtered array
 * @param keyword - the keyword to filter by
 * @param list
 * @returns An array of recipes that match the keyword.
 */
export function filterByKeyword(keyword, list) {
	let result = [];

	if (keyword.length < 3) {
		keyword = '';
		listIngredients(list);
		listAppareils(list);
		listUstensiles(list);
		result = list;
	} else {
		list.forEach(recipe => {
			if (recipe.name.toLowerCase().includes(keyword.toLowerCase())
				|| recipe.description.toLowerCase().includes(keyword.toLowerCase())
				|| recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(
					keyword.toLowerCase()))
			) {
				result.push(recipe);
			}
		});
	}
	listIngredients(result);
	listAppareils(result);
	listUstensiles(result);
	return result;
}

export async function searchInFilters(type, keyword) {
	switch (type) {
		case 'input-ingredients':
			//Cacher les li qui ne correspondent pas à la recherche
			let listIngredients = document.getElementById('list-ingredients');
			let listIngredientsChildren = listIngredients.children;
			for (let i = 0; i < listIngredientsChildren.length; i++) {
				let ingredient = listIngredientsChildren[i].firstChild;
				if (!ingredient.innerText.toLowerCase().includes(keyword.toLowerCase())) {
					listIngredientsChildren[i].style.display = 'none';
				} else {
					listIngredientsChildren[i].style.display = 'block';
				}
			}
			break;

		case 'input-appareils':
			//Cacher les li qui ne correspondent pas à la recherche
			let listAppareils = document.getElementById('list-appareils');
			let listAppareilsChildren = listAppareils.children;
			for (let i = 0; i < listAppareilsChildren.length; i++) {
				let appareils = listAppareilsChildren[i].firstChild;
				if (!appareils.innerText.toLowerCase().includes(keyword.toLowerCase())) {
					listAppareilsChildren[i].style.display = 'none';
				} else {
					listAppareilsChildren[i].style.display = 'block';
				}
			}
			break;

		case 'input-ustensiles':
			//Cacher les li qui ne correspondent pas à la recherche
			let listUstensiles = document.getElementById('list-ustensiles');
			let listUstensilesChildren = listUstensiles.children;
			for (let i = 0; i < listUstensilesChildren.length; i++) {
				let ustensiles = listUstensilesChildren[i].firstChild;
				if (!ustensiles.innerText.toLowerCase().includes(keyword.toLowerCase())) {
					listUstensilesChildren[i].style.display = 'none';
				} else {
					listUstensilesChildren[i].style.display = 'block';
				}
			}
			break;
	}
}
