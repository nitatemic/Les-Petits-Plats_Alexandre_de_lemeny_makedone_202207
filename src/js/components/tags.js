import { addAChoice, removeAChoice } from "../tools/data.js";

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
	icon.addEventListener("click", function(e) {
			removeTag(tag);
		}
		, false);
	tag.appendChild(tagSpan);
	tagsContainer.appendChild(tag);

	/* Remove the button from the ul */
	document.getElementById(`li-${value}`).remove();
}


export function removeTag(tag) {
	tag.remove();
	/* Get the id, replace - by : */
	const tagID = tag.id.replace("-", ":");
	console.log(tagID);
	switch (removeAChoice(tagID)) {

		case "Le type de choix n'est pas valide." :
			console.error("Impossible de supprimer le choix. Le type de choix n'est pas valide.");
			break;

		case "Ce choix n'est pas dans la liste." :
			console.error("Impossible de supprimer le choix. Ce choix n'est pas dans la liste.");
			break;

		case "Le choix a bien été retiré." :
			console.log("Le choix a bien été retiré.");
			break;
	}
}

export function restoreSession() {
	const userChoices = JSON.parse(sessionStorage.getItem("userChoices"));
	document.getElementById("tags-container").innerHTML = "";
	userChoices.forEach(function(choice) {
		createTag(choice.split(":")[0], choice.split(":")[1], true);
	});
}

export function clearSession() {
	sessionStorage.clear();
}

