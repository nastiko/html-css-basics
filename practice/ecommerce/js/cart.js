class Cart {

    #addToCartBtn;


    addToCart() {
        //let result = await API.getProducts();
    }

    init(addToCartBtn) {
        this.#addToCartBtn = document.querySelectorAll(addToCartBtn);

        for(let i = 0; i < this.#addToCartBtn.length; i++) {
            this.#addToCartBtn[i].addEventListener('click', () => this.addToCart());
        }

    }
}