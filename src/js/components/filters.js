/* Events listeners on filter */
import { recipes } from '../../data/recipes';

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
	const dropdowns =  [dropdownIngredients, dropdownAppareils, dropdownUstensiles];
	const dropdownFunctions = [addIngredients, addAppareils, addUstensiles];


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
		input.addEventListener('blur', () => {
				filtersIcons[index].classList.remove('fa-chevron-up');
				filtersIcons[index].classList.add('fa-chevron-down');
				filtersDiv[index].classList.remove('filterFocus');
				dropdowns[index].classList.remove('dropdownFocus');
		}
		, false);
		input.addEventListener('keyup', function(e) {
			let keyword = e.target.value;
			let ingredientsAvailable = [];
			/* If the user has typed something, filter the dropdown list */
			console.log(ingredientsAvailable);
		});
	});
	//TODO : Event listener on dropdown  (https://getbootstrap.com/docs/5.2/components/dropdowns/#events)

};

/* List all Ingredients */
export function listIngredients(result) {
	let ingredientsList = [];
	result.forEach(recipe => {
		recipe.ingredients.forEach((ingredient) => {
			ingredientsList.push(ingredient.ingredient);
		});
	});
	return addIngredients([...new Set(ingredientsList)].sort());
	}


export function addIngredients(listOfIngredients) {
	document.getElementById('list-ingredients').innerHTML= '';
	listOfIngredients.forEach((ingredient) => {
		let liDOM = document.createElement('li');
		let a = document.createElement('a');
		a.href = '#';
		a.innerHTML = ingredient;
		a.className = 'dropdown-item';
		liDOM.appendChild(a);
		document.getElementById('list-ingredients').appendChild(liDOM);
	})
	return listOfIngredients;
}


export function listAppareils(result) {
	let appareilsList = [];
		result.forEach(recipe => {
			appareilsList.push(recipe.appliance);
	});
	return addAppareils([...new Set(appareilsList)].sort());
}

export function addAppareils (listOfAppareils) {
	document.getElementById('list-appareils').innerHTML= '';
	listOfAppareils.forEach((appareil) => {
		let liDOM = document.createElement('li');
		let a = document.createElement('a');
		a.href = '#';
		a.innerHTML = appareil;
		a.className = 'dropdown-item';
		liDOM.appendChild(a);
		document.getElementById('list-appareils').appendChild(liDOM);
	})
	return listOfAppareils;
}


export function listUstensiles(result) {
	let ustensilesList = []
	result.forEach(recipe => {
		recipe.utensils.forEach((utensil) => {
			ustensilesList.push(utensil);
		});
	});
	return addUstensiles([...new Set(ustensilesList)].sort());
}

export function addUstensiles (listOfUstensiles) {
	document.getElementById('list-ustensiles').innerHTML= '';
	listOfUstensiles.forEach((ustensile) => {
		let liDOM = document.createElement('li');
		let a = document.createElement('a');
		a.href = '#';
		a.innerHTML = ustensile;
		a.className = 'dropdown-item';
		liDOM.appendChild(a);
		document.getElementById('list-ustensiles').appendChild(liDOM);
	})
	return listOfUstensiles;
}



export function filterByKeyword (keyword) {
	let result = [];
	if (keyword.length < 3) {
		keyword = '';
		result = recipes;
	} else {
		recipes.forEach(recipe => {
			if (recipe.name.toLowerCase().includes(keyword.toLowerCase())
				|| recipe.description.toLowerCase().includes(keyword.toLowerCase())
				|| recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(
					keyword.toLowerCase()))
			) {
				result.push(recipe);
			}
		});
	}
	return result;
}

