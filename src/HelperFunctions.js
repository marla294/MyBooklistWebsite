export function capitalizeFirstLetter(S) {
	return S[0].toUpperCase() + S.slice(1);
}

export function capitalizeFirstLetterEachWord(S) {
	let subStrArray = S.split(" ");
	return subStrArray.map(word => word[0].toUpperCase() + word.slice(1) + " ");
}
