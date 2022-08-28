import './css/styles.css';
import axios from "axios";

const API_KEY = '29561801-8060ff7959275b65131112eea';
const BASE_URL = 'https://pixabay.com/api/';
const SETTINGS_URL = 'per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadBtn: document.querySelector('.load-more'),
}

let query = '';
let page = 1;
let photo = [];

const renderGallary = () => {
    console.log(photo);
};

const fetchPhoto = () => {
    axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&${SETTINGS_URL}&page=${page}`).then(img => {
        console.log(img.data.hits);

        //photo = data;
        renderGallary();

    }).catch(error => {
        console.log(error);
    });
}

const onFormSubmit = e => {
    e.preventDefault();

    query = e.target.elements.searchQuery.value;
    console.log(query);
    fetchPhoto();
};

refs.form.addEventListener('submit', onFormSubmit);