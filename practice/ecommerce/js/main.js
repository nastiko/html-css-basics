//Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});


//sliders
function slider() {
    let slideWidth = document.querySelector('.carousel_slide').getBoundingClientRect().width;
    let slideCount = document.querySelectorAll('.carousel_slide').length;
    let slideContainer = document.querySelector('.slide-container');
    let nextBtn = document.getElementById('right-click');
    let prevBtn = document.getElementById('left-click');
    let indicatorNav = document.querySelectorAll('.carousel_nav button');
    let slideShown = 1;

    nextBtn.addEventListener('click', () => move('left'));
    prevBtn.addEventListener('click', () => move('right'));

    function move(direction) {
        let currPos = slideContainer.getBoundingClientRect().left;
        let shift = slideWidth * (direction === 'left' ? -1 : 1);

        if (direction === 'right' && slideShown <= 1) {
            shift = 0;
        } else if (direction === 'left' && slideCount - slideShown <= 0) {
            shift = 0;
        } else {
            slideShown += direction === 'left' ? 1 : -1;
        }
        slideContainer.style.left = (currPos + shift).toString() + 'px';
    }
}


//change header discount
function changeDiscount() {
    let elemSpan = document.getElementById('header-text');

    let arrDiscount = [50, 70, 30];

    let i = 0;

    setInterval(function () {
        elemSpan.textContent = `${arrDiscount[i++]}`;
        if (i >= arrDiscount.length) {
            i = 0;
        }

    }, 1100);

}


//scrollUp button
function scrollUp() {
    let btn = document.getElementById('up-click');

    window.onscroll = () => window.scrollY > 250 ? btn.style.opacity = '1' : btn.style.opacity = '0';

    btn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

slider();
changeDiscount();
scrollUp();

class Products {

    #title;
    #price;
    #img;

    constructor(title, price, img) {
        this.#title = title;
        this.#price = price;
        this.#img = img;
    }

    async getProducts() {

        let response = await fetch('https://fakestoreapi.com/products/category/jewelery');
        let result = await response.json();

        for await(let item of result) {
            this.#title = item.title;
            this.#price = item.price;
            this.#img = item.image;
            let template = this.getTemplateBlockItem(this.#title, this.#price, this.#img);
            let container = document.getElementById('container');
            container.innerHTML += template;
        }
    }

    getTemplateBlockItem(title, price, img) {
        return '<div class="col-banner_carousel">\n' +
            '                    <div class="hover-element">\n' +
            '                        <div class="blocks-position">\n' +
            '                            <img class="img-style"\n' +
            '                                   src="' + img + '"\n' +
            '                                   alt="' + title + '">\n' +
            '                            <div class="flex-links">\n' +
            '                                <div class="icon-button" data-bs-toggle="tooltip" title="Add to Cart">\n' +
            '                                    <div class="icon-bag">\n' +
            '                                        <a href="#"></a>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div class="icon-button" data-bs-toggle="tooltip" title="Wishlist">\n' +
            '                                    <div class="icon-like">\n' +
            '                                        <a href="#"></a>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div>\n' +
            '                            <div class="flex-stars">\n' +
            '                                <span class="icon-star"></span>\n' +
            '                                <span class="icon-star"></span>\n' +
            '                                <span class="icon-star"></span>\n' +
            '                                <span class="icon-star"></span>\n' +
            '                                <span class="icon-star"></span>\n' +
            '                            </div>\n' +
            '                            <div>\n' +
            '                                <h3 class="product-name">\n' +
            '                                    <a href="#">'+ title +'</a>\n' +
            '                                </h3>\n' +
            '                                <p class="product-price">£'+ price +'</p>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>'
    }
}

let products = new Products;
products.getProducts();
