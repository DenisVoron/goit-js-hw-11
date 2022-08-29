const galleryItemTemplate = (
    {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    }
) => {
    `<div class="photo-card">
       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b>${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${downloads}</b>
        </p>
       </div>
    </div>`
}

export default galleryItemTemplate;