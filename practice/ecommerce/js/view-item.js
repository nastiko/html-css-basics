class ProductInfo {

    #mainBlock;
    #descriptionBtn;
    #accordionContent;
    #iconsTransform;

    constructor(mainBlock, descBtnClass = '.btn-description_info', accordionContent = '.accordion-content', iconsTransform = '.icon') {
        this.#mainBlock = document.querySelector(mainBlock);
        this.#descriptionBtn = descBtnClass;
        this.#iconsTransform = iconsTransform;
        this.#accordionContent = accordionContent;
    }

    toggleVisible(element) {
        let content = element.parentNode.querySelector(this.#accordionContent);
        let icon = element.parentNode.querySelector(this.#iconsTransform);

        content.classList.toggle('visible');
        icon.classList.toggle('rotate');
    }

    init() {
        let buttons = this.#mainBlock.querySelectorAll(this.#descriptionBtn);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => this.toggleVisible(buttons[i]));
        }
    }
}

let productInfo = new ProductInfo('.description');
productInfo.init();


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