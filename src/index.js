import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import galleryItemTpl from "./templates/gallery_templates";
import PixApiService from "./fetch_service/api_service";
import LoadMoreBtn from "./components/load-more-btn";

let amountHits = 0;

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
    amountHits = 0;
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
        appendGalleryImg(img.data.hits);
        //console.log(img);

        if (img.data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }

        loadMoreBtn.enable();
    });
};


function disableBtnAmountHits() {

    //const amountHits = pixApiService.addAmountHits();
    //console.log(amountHits);

    pixApiService.fetchPhoto().then(img => {
        console.log(img);
        //console.log(img.data.total);
        console.log(img.data.totalHits);
        console.log(img.data.hits.length);

        amountHits += img.data.hits.length;
        console.log(amountHits);
        if (amountHits === img.data.totalHits || amountHits === 0) {
            loadMoreBtn.hide();
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    }).catch(error => {
        console.log(error);
        if (error) {
            loadMoreBtn.hide();
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    })


    /*pixApiService.addAmountHits().then(amountHits => {
        console.log(amountHits);
    });*/
}

const gallery = new SimpleLightbox('.gallery a', {
    scrollZoom: false,
    captionsData: 'alt',
    captionDelay: 250,
});


function appendGalleryImg(img) {

    //pixApiService.addAmountHits();
    //refs.gallery.insertAdjacentHTML('beforeend', galleryItemTpl(img));
    console.log(img);
    console.log(img)
    render(img);
    gallery.refresh();
    disableBtnAmountHits();
}

//console.log(gallery);

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