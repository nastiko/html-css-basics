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

    transformIcon() {
        //this.#iconsTransform.style.transform = 'rotate(180deg)';
    }

    init(descBtnClass, descInfo = '.hidden', iconsTransform = '.btn-description-info.border-bottom::after') {
        this.#descriptionBtn = document.querySelectorAll(descBtnClass);
        this.#iconsTransform = document.querySelectorAll(iconsTransform);

        for (let i = 0; i < this.#descriptionBtn.length; i++) {
            this.#descriptionBtn[i].addEventListener('click', () => this.showVisible(this.#descriptionBtn[i].querySelector(descInfo)));
        }

        // for (let j = 0; j < this.#iconsTransform; j++) {
        //     this.#iconsTransform[j].addEventListener('click', () => this.transformIcon());
        // }
    }
}

let productInfo = new ProductInfo();
productInfo.init('.description-info');