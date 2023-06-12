class Cart {
    static #mainBlockEl = '#cart .offcanvas-body';

    static init(block, addToCartBtnClass = '.add-to-cart') {
        let addToCartBtn = block.querySelectorAll(addToCartBtnClass);

        if (!addToCartBtn) {
            return;
        }

        for (let i = 0; i < addToCartBtn.length; i++) {
            let productId = addToCartBtn[i].dataset.id;
            addToCartBtn[i].addEventListener('click', () => {
                // show cart loading screen
                document.getElementById('loader').style.display = 'block';

                // add product to cart and hide loading screen after load
                Cart.addToCart(productId).then((value) => document.getElementById('loader').style.display = 'none');

                // show main cart sidebar
                document.getElementById('cart_button').click();
            });
        }
    }

    static async addToCart(productId) {
        let cart = this.getCart();

        // check if we already have same item in cart, then increment qty
        let found = false;
        for (let cartItem of cart.items) {
            if (cartItem.id === parseInt(productId)) {
                cartItem.qty++;
                cartItem.total = Math.round(cartItem.price * cartItem.qty);
                found = true;
                break;
            }
        }

        // if we don't have item in cart, then add new item to cart
        if (!found) {
            let product = await API.getProduct(productId);
            let productPrice = Math.round(product.price * 0.01 * (100 - product.discount));
            cart.items.push({
                id: product.id,
                title: product.name,
                price: productPrice,
                total: productPrice,
                image: product.preview[0],
                qty: 1,
            });
            cart.itemQty++;
            cart.total += productPrice;
        }

        // save cart
        this.setCart(cart);

        // re-render cart items
        await this.renderCart();
    }

    /**
     * Render products block
     */
    static async renderCart() {
        let content = '';
        let mainBlockEl = document.querySelector(this.#mainBlockEl);
        let dataContainer = document.createElement('div');
        let cart = this.getCart();

        // render each product template
        for (let item of cart.items) {
            let template = await this.renderCartItem(item.title, item.total, item.image, item.qty, item.id);
            content += template;
        }

        // paste all items HTML into container on the page
        let dataContainerClass = 'cart-items';
        dataContainer.innerHTML = content;
        dataContainer.className = dataContainerClass;
        mainBlockEl.querySelector(`.${dataContainerClass}`) ? mainBlockEl.querySelector(`.${dataContainerClass}`).remove() : '';
        mainBlockEl.appendChild(dataContainer);

        // add event listeners for "remove" button click
        this.addEventRemoveCartItem();

        // check if cart is empty
        if (cart.items.length > 0) {
            document.getElementById('cart-empty').style.display = "none";
        } else {
            document.getElementById('cart-empty').style.display = "block";
        }
    }

    /**
     * Load individual product HTML template
     *
     * @param {string} title    Product title
     * @param {int}    price    Product price
     * @param {string} img      Product image
     * @param {int}    qty       Product id
     * @param {int}    id       Product id
     */
    static async renderCartItem(title, price, img, qty, id) {
        let template = await this.getCartItemTemplate();
        template = template.replaceAll('VAR_TITLE', title);
        template = template.replaceAll('VAR_ID', id.toString());
        template = template.replaceAll('VAR_PRICE', price.toString());
        template = template.replaceAll('VAR_IMG', img);
        template = template.replaceAll('VAR_QTY', qty.toString());

        return template;
    }

    static async getCartItemTemplate() {
        // init predefined variables
        let templateUrl = 'template/cart_item.html';

        // initialise cache if not yet ready
        let cache = await caches.open('cart_item_template');

        // try to load template from cache
        let response = await cache.match(templateUrl);
        if (!response) {
            // add caching for API requests
            await cache.add(templateUrl);
            // get fetch result
            response = await cache.match(templateUrl);
        }

        return await response.text();
    }

    static getCart() {
        let cart = localStorage.getItem('cart');
        if (cart) {
            return JSON.parse(cart);
        } else {
            return {items: [], total: 0, itemQty: 0}
        }

    }

    static setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // remove item from cart
    static addEventRemoveCartItem() {
        let btnItem = document.querySelectorAll('.cart-remove');

        for (let elem of btnItem) {
            elem.addEventListener('click', function () {
                let productId = parseInt(elem.dataset.id);
                Cart.removeItem(productId);
                Cart.renderCart();
            });
        }
    }

    static getItemByProductId(productId = "0") {
        let cart = this.getCart();
        // render each product template
        for (let item of cart.items) {
            if (parseInt(item.id) === parseInt(productId)) {
                return item;
            }
        }

        // if no cart element found with such product - report error
        throw Error('Element not found');
    }

    static changeItemQty(productId, direction = '+') {
        try {
            let item = this.getItemByProductId(productId);
            switch (direction) {
                case "+":
                    item.qty++;
                    break;
                case "-":
                    item.qty--;
                    break;
                default:
                    break;
            }

            if (item.qty <= 0) {
                this.removeItem(productId);
            }

            return item.qty;
        } catch (error) {
            alert(error);
        } finally {

        }
    }

    // remove item from cart
    static removeItem(productId) {
        let cart = this.getCart();
        for (let cartItemId in cart.items) {
            if (parseInt(cart.items[cartItemId].id) === parseInt(productId)) {
                cart.items.splice(parseInt(cartItemId), 1);
                break;
            }
        }
        // save cart with removed product
        this.setCart(cart);
    }
}