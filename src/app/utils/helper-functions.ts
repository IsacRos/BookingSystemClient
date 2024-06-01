export function getRandomImage() {
    const randomIndex = (Math.floor(Math.random() * 12) + 1).toString();
    return `../assets/restaurantPhotos/${randomIndex}.jpg`
  }