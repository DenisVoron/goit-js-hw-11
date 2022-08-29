import './css/styles.css';

import PixApiService from "./fetch_service/api_service";

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

let page = 1;
//let photo = [];

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


const pixApiService = new PixApiService();
//console.log(pixApiService);

/*const renderGallary = () => {
    console.log(photo);
};*/


function onFormSubmit(e) {
    e.preventDefault();

    pixApiService.searchQuery = e.target.elements.searchQuery.value;
    pixApiService.resetPage();
    pixApiService.fetchPhoto().then(img => console.log(img));
};

function onLoadMore() {
    pixApiService.fetchPhoto().then(img => console.log(img));
}
