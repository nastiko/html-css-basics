class ProductInfo {

    #descriptionBtn;
    #iconsTransform;

    constructor(descriptionBtn, iconsTransform) {
        this.#descriptionBtn = descriptionBtn;
        this.#iconsTransform = iconsTransform
    }

    showVisible(element) {
        element.classList.toggle('visible');
    }

    transformIcon(icon) {
        icon.classList.toggle('rotate');
    }

    init(descBtnClass, descInfo = '.hidden', iconsTransform = '.icon') {
        this.#descriptionBtn = document.querySelectorAll(descBtnClass);
        this.#iconsTransform = document.querySelectorAll(iconsTransform);

        for (let i = 0; i < this.#descriptionBtn.length; i++) {
            this.#descriptionBtn[i].addEventListener('click', () => this.showVisible(this.#descriptionBtn[i].querySelector(descInfo)));
            this.#descriptionBtn[i].addEventListener('click', () => this.transformIcon(this.#descriptionBtn[i].querySelector(iconsTransform)));
        }
    }
}

let productInfo = new ProductInfo();
productInfo.init('.description-info');


class PopUp {
    #popUp;
    #linkPopUp;
    #closePopUp;

    constructor(popUpClass, closePopUpBtn, linkPopUpClass) {
        this.#popUp = document.querySelector(popUpClass);
        this.#linkPopUp = document.querySelector(linkPopUpClass);
        this.#closePopUp = this.#popUp.querySelector(closePopUpBtn);
    }

    showPopUp() {
        this.#popUp.classList.add('active');
    }

    closePopUp() {
        this.#popUp.classList.remove('active');
    }

    init() {
        this.#linkPopUp.addEventListener('click', () => this.showPopUp());
        this.#closePopUp.addEventListener('click', () => this.closePopUp());
    }
}

let sizeGuide = new PopUp('div.popup', '.popup-close_icon', '.link-popup');
sizeGuide.init();