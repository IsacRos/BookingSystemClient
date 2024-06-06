export function getRandomImage() {
    const randomIndex = (Math.floor(Math.random() * 12) + 1).toString();
    return `../assets/restaurantPhotos/${randomIndex}.jpg`
}

export function convertTimeString(date: Date) {
	let time = date.getHours().toString();
	time += ':';
	let minutes = date.getMinutes().toString();
	if(minutes.length === 1) minutes = '0' + minutes;
	return time + minutes + 'h';
}