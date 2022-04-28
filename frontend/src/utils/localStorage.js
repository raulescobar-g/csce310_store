// utility function that saves userData to local storage
export function saveToStorage(dataToSave, dataLabel) {
	localStorage.setItem(dataLabel, JSON.stringify(dataToSave));
}

// utility function that gets userData that we might have previously saved to local storage
export function getFromStorage(dataLabel) {
	const data = JSON.parse(localStorage.getItem(dataLabel));
	return data;
}
