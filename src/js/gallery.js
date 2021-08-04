const DEBOUNCE_DELAY = 300;
import Gallery from './fetch';
import pictureCardTpl from '../templates/pictureCardTpl.hbs';
import { Notify} from "notiflix";
import LoadMoreBtn from "./load-more-btn";

const gallery = new Gallery();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
});

const searchRef = document.querySelector(".search-input");
const formRef = document.querySelector(".search-form");
const pictureCardRef = document.querySelector(".gallery");

formRef.addEventListener('submit', onSearch)
loadMoreBtn.refs.button.addEventListener('click', LoadMore);

function appendPictures(pictures) {
    pictureCardRef.insertAdjacentHTML('beforeend', pictureCardTpl(pictures))
    loadMoreBtn.enable();
    return pictures
}
function onSearch(e) {
    e.preventDefault();
    cleanGallery();
    gallery.query = searchRef.value;
    gallery.resetPage();
    if (gallery.query === '') {
        Notify.failure('Type search parameters...');
        return
    }
   gallery.fetchImages()
        .then(appendPictures);
     loadMoreBtn.show();
    loadMoreBtn.disable();
};

function cleanGallery() {
    pictureCardRef.innerHTML ='';
}
        
function LoadMore(e) {
    loadMoreBtn.disable();
    e.preventDefault();
    gallery.fetchImages()
        .then(appendPictures)
}


