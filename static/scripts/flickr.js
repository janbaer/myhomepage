async function loadImages(apiKey, userId) {
  const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&format=json&per_page=500&page=1&user_id=${userId}&nojsoncallback=1&extras=date_taken`;
  const response = await fetch(url);
  const { photos } = await response.json();

  const images = [];
  for (const { farm, server, id, secret, title, datetaken } of photos.photo) {
    const thumbnailUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    const imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
    images.push({ title, datetaken, thumbnailUrl, imageUrl })
  }

  return images;
}

async function appendElements(rootElement, apiKey, userId) {
  const images = await loadImages(apiKey, userId);

  for (const { imageUrl, thumbnailUrl, title, datetaken } of images) {
    const divElement =  document.createElement('div');
    divElement.innerHTML = `<a data-fancybox="gallery" href="${imageUrl}"><img src="${thumbnailUrl}" title="${title} (${datetaken})"></a>`;
    rootElement.appendChild(divElement);
  }
}

export function createGallery(apiKey, userId) {
  const galleryElement = document.getElementsByClassName('gallery')[0];
  appendElements(galleryElement, apiKey, userId);
}
