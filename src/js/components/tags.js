import { addAChoice, removeAChoice } from "../tools/data.js";
import { listAppareils, listIngredients, listUstensiles } from './filters';
import { forceSearch } from './recipes';

export function createTag(type, value, restoreSession) {
	if (!restoreSession) {
		switch (addAChoice(type, value)) {

			case "Ce choix est déjà dans la liste." :
				console.error("Ce choix est déjà dans la liste.");
				return "Ce choix est déjà dans la liste.";

			case "Le choix a bien été ajouté." :
				console.log("Le choix a bien été ajouté.");
				break;

			default :
				console.error("Erreur inconnue.");
		}
	}

	const tagsContainer = document.getElementById("tags-container")
	const tag = document.createElement("span");
	tag.className = "tag";
	tag.id = `${type}-${value}`;
	switch (type) {

		case "ingredient":
			tag.classList.add("tag-ingredient");
			break;

		case "appareil":
			tag.classList.add("tag-appareil");
			break;

		case "ustensile":
			tag.classList.add("tag-ustensile");
			break;
	}

	const tagSpan = document.createElement("span");
	tagSpan.className = "close-tag";
	tagSpan.innerHTML = `${value} <i class='fa-regular fa-circle-xmark'></i>`;
	let icon = tagSpan.querySelector("i");
	icon.addEventListener("click", function () {
			removeTag(tag);
			/* Re search the recipes */
			forceSearch();
		}
		, false);
	tag.appendChild(tagSpan);
	tagsContainer.appendChild(tag);
}


export function removeTag(tag) {
	/* Get the id, replace - by : */
	const tagID = tag.id.replace("-", ":");
	console.log(tagID);
	switch (removeAChoice(tagID)) {


		case "Ce choix n'est pas dans la liste." :
			console.error("Impossible de supprimer le choix. Ce choix n'est pas dans la liste.");
			break;

		case "Le choix a bien été retiré." :
			console.log("Le choix a bien été retiré.");
			break;
	}
	tag.remove();
}

export function restoreSession() {
	const userChoices = JSON.parse(sessionStorage.getItem("userChoices"));
	document.getElementById("tags-container").innerHTML = "";
	userChoices.forEach(function (choice) {
		const type = choice.split(":")[0];
		const value = choice.split(":")[1];
		if (document.getElementById(`${type}-${value}`) === null) {
			createTag(choice.split(":")[0], choice.split(":")[1], true);
		}
	});
}

export function clearSession() {
	sessionStorage.clear();
}

export async function searchByTag(results) {

	/* Get the session storage */
	const userChoices = JSON.parse(sessionStorage.getItem("userChoices"));
	if (userChoices.length === 0) {
		return results;
	}

	let listResults = results
	let newResults = [];
	listResults.forEach(result => {

		let getAHit = userChoices.every((choice) => {
			let isFound;

			switch (choice.split(":")[0]) {

				/* Si le type du tag est un ingrédient */
				case "ingredient":
					isFound = result.ingredients.find(ingredient => {
						if (ingredient.ingredient === choice.split(":")[1]) {
							return true;
						}
					})
					break;

				case "appareil":
					isFound = (result.appliance === choice.split(":")[1]);
					break;

				case "ustensile":
					isFound = (result.utensils.includes(choice.split(":")[1]));
					break;
			}
			return isFound;
		})
		if (getAHit === true) {
			newResults.push(result);
		}
	})

	console.log(newResults);
	await listIngredients(newResults);
	await listAppareils(newResults);
	await listUstensiles(newResults);
	await restoreSession()
	return newResults;
}
