export default class LoadMoreBtn {
    constructor({ selector, hidden = false }){
    this.refs = this.getRefs(selector);
        hidden && this.hide();
}
getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.btnLabel = refs.button.querySelector('.label');
    return refs;
    };

    enable() {
        this.refs.button.disabled = false;
        this.refs.btnLabel.textContent = 'Show more';
    }
    disable() {
        this.refs.button.disabled = true;
        this.refs.btnLabel.textContent = 'Loading...';
    }
    show() {
       this.refs.button.classList.remove('is-hidden'); 
    }
    hide() {
    this.refs.button.classList.add('is-hidden')
    }
}