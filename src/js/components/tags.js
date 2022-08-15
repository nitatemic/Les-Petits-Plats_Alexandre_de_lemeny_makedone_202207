import { addAChoice, removeAChoice } from "../tools/data.js";
export function createTag(type, value) {
	addAChoice(`${type}:${value}`);
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
	tagSpan.addEventListener("click", function(e) {
			removeTag(e.target.parentElement);
		}
		, false);
	tagSpan.innerHTML = `${value}<i class='fa-regular fa-circle-xmark'></i>`;
	tag.appendChild(tagSpan);
	tagsContainer.appendChild(tag);
}


export function removeTag(tag) {
	tag.remove();
	/* Get the id, replace - by : */
	const tagID = tag.id.replace(/\-/g, ":");
	removeAChoice(tagID);
}
