/* Events listeners on filter */
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

	const filtersDiv = [filterIngredients, filterAppareils, filterUstensiles];
	const filtersInputs = [inputIngredients, inputAppareils, inputUstensiles];
	const filtersButtons = [buttonIngredients, buttonAppareils, buttonUstensiles];
	const filtersIcons = [iconIngredients, iconAppareils, iconUstensiles];

	filtersButtons.forEach((button, index) => {
		button.addEventListener('click', () => {
			if (filtersIcons[index].classList.contains('fa-chevron-down')) {
				filtersIcons[index].classList.remove('fa-chevron-down');
				filtersIcons[index].classList.add('fa-chevron-up');
				filtersDiv[index].classList.add('filterFocus');
			} else {
				filtersIcons[index].classList.remove('fa-chevron-up');
				filtersIcons[index].classList.add('fa-chevron-down');
				filtersDiv[index].classList.remove('filterFocus');
			}
		});
	});

	filtersInputs.forEach((input, index) => {
		input.addEventListener('focus', () => {
			filtersDiv[index].classList.add('filterFocus');
				filtersIcons[index].classList.remove('fa-chevron-down');
				filtersIcons[index].classList.add('fa-chevron-up');
		}
		, false);
		input.addEventListener('blur', () => {
			filtersDiv[index].classList.remove('filterFocus');
				filtersIcons[index].classList.remove('fa-chevron-up');
				filtersIcons[index].classList.add('fa-chevron-down');
		}
		, false);
	});

	//TODO : Event listener on dropdown  (https://getbootstrap.com/docs/5.2/components/dropdowns/#events)
};

