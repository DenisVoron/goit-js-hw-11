import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import galleryItemTpl from "./templates/gallery_templates";
import PixApiService from "./fetch_service/api_service";
import LoadMoreBtn from "./components/load-more-btn";
//console.log(LoadMoreBtn);

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    //loadMoreBtn: document.querySelector('.load-more'),
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const pixApiService = new PixApiService();

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onFormSubmit(e) {
    e.preventDefault();

    pixApiService.searchQuery = e.target.elements.searchQuery.value;

    console.log(pixApiService);

    loadMoreBtn.show();
    loadMoreBtn.disable();

    pixApiService.resetPage();
    clearGallery();
    fetchGallery()
}

/*function onLoadMore() {
    loadMoreBtn.disable();

    pixApiService.fetchPhoto().then(img => {
        appendGalleryImg(img);
        loadMoreBtn.enable();
    });
}*/

function fetchGallery() {

    loadMoreBtn.disable();
    pixApiService.fetchPhoto().then(img => {
        appendGalleryImg(img);

        if (img.length === 0) {
            Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        }

        loadMoreBtn.enable();
    });
};


function appendGalleryImg(img) {
    //refs.gallery.insertAdjacentHTML('beforeend', galleryItemTpl(img));
    console.log(img);
    //render(img);
    simplelightbox(img);
}

let gallery = new SimpleLightbox('.gallery');
console.log(gallery);

gallery.on('show.simplelightbox', function simplelightbox(img) {
    render(img);
});

const render = (img) => {

    const galleryImg = img
        .map(({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        }) => galleryItemTpl({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        }))
        .join('');


    refs.gallery.insertAdjacentHTML('beforeend', galleryImg);
};

function clearGallery() {
    refs.gallery.innerHTML = '';
}