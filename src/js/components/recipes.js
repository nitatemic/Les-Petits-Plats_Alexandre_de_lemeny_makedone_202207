import { recipes } from '../../data/recipes.js';

export function testRecipes () {
	console.log(recipes);
}

/* Factory recipes */
	export function factoryRecipe () {

		/* List of all the ingredients (without unit) */
		function listIngredients (recipe) {
			let ingredientsList = [];
			recipe.ingredients.forEach(ingredient => {
				ingredientsList.push(ingredient.ingredient);
			});
			return ingredientsList;
		}
		/* /List of all the ingredients (without unit) */

		/* List of all the appliance */
		function listAppliance (recipe) {
			return [recipe.appliance];
		}
		/* /List of all the appliance */

		/* List of all the utensils */
		function listUtensils (recipe) {
			return recipe.utensils
		}
		/* /List of all the utensils */
	return { listIngredients, listAppliance, listUtensils };
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

/* List all Appliance */
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
		recipes.forEach(recipe => {
			let recipeModel = factoryRecipe(recipe);
			console.log(recipeModel.listIngredients(recipe));
			console.log(recipeModel.listAppliance(recipe));
			console.log(recipeModel.listUtensils(recipe));
		});
		console.log(listAllIngredients(recipes));
	}
