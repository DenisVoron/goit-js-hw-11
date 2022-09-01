import axios from "axios";

const API_KEY = '29561801-8060ff7959275b65131112eea';
const BASE_URL = 'https://pixabay.com/api/';
const SETTINGS_URL = 'per_page=40&image_type=photo&orientation=horizontal&safesearch=true';

export default class PixApiService {
    constructor() {
        this.query = '';
        this.page = 1;
        /*this.amountHits = 0;
        this.hits = {};*/
    }
    async fetchPhoto() {
        console.log(this);

        try {
            const img = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.query}&${SETTINGS_URL}&page=${this.page}`);
            //this.amountHits += img.data.hits.length;

            //this.hits = img;
            //console.log(this.hits);
            this.page += 1;
            return img;          //return img.data.hits;
        } catch (error) {
            console.log(error);
        }
    }

    /*addAmountHits() {

        console.log(this.amountHits);
        return this.amountHits;

        //return this.amountHits;
        //addAmountHits(img);
    }*/

    totalHits() {
        return this.hits;
    }

    resetPage() {
        this.page = 1;
    }

    get searchQuery() {
        return this.query;
    }


    set searchQuery(newQuery) {
        this.query = newQuery;
        console.log(this.query);
    }
}