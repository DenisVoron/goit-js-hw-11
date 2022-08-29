import axios from "axios";

const API_KEY = '29561801-8060ff7959275b65131112eea';
const BASE_URL = 'https://pixabay.com/api/';
const SETTINGS_URL = 'per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

export default class PixApiService {
    constructor() {
        this.query = '';
        this.page = 1;
    }
    fetchPhoto() {
        console.log(this);

        return axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.query}&${SETTINGS_URL}&page=${this.page}`)
            .then(img => {
                //console.log(img.data.hits);

                this.page += 1;

                return img.data.hits;

            }).catch(error => {
                console.log(error);
            });
    }

    resetPage() {
        this.page = 1;
    }

    get searchQuery() {
        return this.query;
    }


    set searchQuery(newQuery) {
        this.query = newQuery;
    }
}