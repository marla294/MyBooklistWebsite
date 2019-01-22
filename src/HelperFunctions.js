export function capitalizeFirstLetter(S) {
	return S[0].toUpperCase() + S.slice(1);
}

export function capitalizeFirstLetterEachWord(S) {
	if (S) {
		let subStrArray = S.toLowerCase().split(" ");

		return subStrArray
			.map(word => {
				if (word.length > 0)
					return word[0].toUpperCase() + word.slice(1) + " ";
				return "";
			})
			.join("");
	} else {
		return "";
	}
}
