import { restoreSession } from '../components/tags';

export function configSession() {
	/* Create an empty array in the session storage, it will be used by filters to store user's choices */
	if(sessionStorage.getItem("userChoices") === undefined) {
		sessionStorage.setItem("userChoices", JSON.stringify([]))
	} else if (JSON.parse(sessionStorage.getItem("userChoices")).isArray === true) {
		restoreSession(); //TODO
	} else {
		sessionStorage.clear()
	}
}

/**
 * It adds a choice to the list of choices
 * @returns A string.
 * @param type
 * @param value
 */
export function addAChoice(type, value) {
	if (!Array.isArray(JSON.parse(sessionStorage.getItem("userChoices"))) ) {
		console.log("Le tableau n'est pas créé. Il sera créé.");
		sessionStorage.setItem("userChoices", JSON.stringify([]))
	}

	console.log(type + " " + value);
	/* Get the array of choices from the session storage */
		let userChoices = JSON.parse(sessionStorage.getItem("userChoices"));
		/* Check if the choice is already in the array */
		if (userChoices.includes(`${type}:${value}`)) {
			return "Ce choix est déjà dans la liste."
		}
		/* Add the choice to the array */
		userChoices.push(`${type}:${value}`);
		/* Update the session storage */
		sessionStorage.setItem("userChoices", JSON.stringify(userChoices));
		return "Le choix a bien été ajouté."
}

/**
 * It removes a choice from the user's list of choices
 * @param choice - the choice to remove from the array
 * @returns A string.
 */
export function removeAChoice(choice) {
	/* Extract the type of the choice. It's the word before : */
	let type = choice.split(":")[0];
	if (type !== "ingredient") {
		return "Le type de choix n'est pas valide."
	} else {
	/* Get the array of choices from the session storage */
		let userChoices = JSON.parse(sessionStorage.getItem("userChoices"));
		/* Check if the choice is already in the array */
		if (!userChoices.includes(choice)) {
			return "Ce choix n'est pas dans la liste."
		}
		/* Remove the choice from the array */
		userChoices.splice(userChoices.indexOf(choice), 1);
		/* Update the session storage */
		sessionStorage.setItem("userChoices", JSON.stringify(userChoices));
		return "Le choix a bien été retiré."
	}
}
