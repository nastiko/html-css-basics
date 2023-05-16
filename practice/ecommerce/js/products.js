// Price Range
class SlideRange {

    #rangeInput;
    #progress;
    #priceInput
    #priceGap = 50;

    constructor(rangeInput, progress, priceInput) {
        this.#rangeInput = rangeInput;
        this.#progress = progress;
        this.#priceInput = priceInput;
    }


    getRangesValue(event) {
        let minVal = parseInt(this.#rangeInput[0].value);
        let maxVal = parseInt(this.#rangeInput[1].value);

        if (maxVal - minVal < this.#priceGap) {
            if (event.target.className === 'range-min') {
                this.#rangeInput[0].value = maxVal - this.#priceGap;
            } else {
                this.#rangeInput[1].value = minVal + this.#priceGap;
            }
        } else {
            this.#priceInput[0].value = minVal;
            this.#priceInput[1].value = maxVal;

            this.#progress.style.left = (minVal / parseInt(this.#rangeInput[0].max)) * 100 + '%';
            this.#progress.style.right = 100 - (maxVal / parseInt(this.#rangeInput[1].max)) * 100 + '%';
        }
    }

    updateSlideRange(event) {
        let minVal = parseInt(this.#priceInput[0].value);
        let maxVal = parseInt(this.#priceInput[1].value);

        if ((maxVal - minVal >= this.#priceGap) && (maxVal <= 550)) {
            if (event.target.id === 'min-value') {
                this.#rangeInput[0].value = minVal;
                this.#progress.style.left = (minVal / parseInt(this.#rangeInput[0].max)) * 100 + '%';
            } else {
                this.#rangeInput[1].value = maxVal;
                this.#progress.style.right = 100 - (maxVal / parseInt(this.#rangeInput[1].max)) * 100 + '%';
            }
        }
    }

    init(rangeInoutId, progressClass, priceInputClass) {
        this.#rangeInput = document.querySelectorAll(rangeInoutId);
        this.#progress = document.querySelector(progressClass);
        this.#priceInput = document.querySelectorAll(priceInputClass);

        for (let i = 0; i < this.#rangeInput.length; i++) {
            this.#rangeInput[i].addEventListener('input', (event) => this.getRangesValue(event));
        }

        for (let j = 0; j < this.#priceInput.length; j++) {
            this.#priceInput[j].addEventListener('input', (event) => this.updateSlideRange(event));
        }
    }
}

// class Pagination {
//
//     #dataContainer;
//     #paginationLimit;
//     #itemTemplate;
//     #paginationNumber;
//     #allPageNumbers;
//
//     #API_SEARCH = 'https://anastasia.grinkevi.ch/api/products/search';
//     #itemsCount;
//
//     constructor(paginationLimit) {
//         this.#paginationLimit = paginationLimit;
//     }
//
//     async renderProducts(page = 1) {
//         let skip = this.#paginationLimit * (page - 1);
//         let response = await fetch(`${this.#API_SEARCH}?limit=${this.#paginationLimit}&skip=${skip}`);
//         let result = await response.json();
//         let content = '';
//
//         for await(let item of result) {
//             let template = await this.getTemplateBlockItem(item.name, item.price, item.preview[0]);
//             content += template;
//         }
//
//         // paste all items HTML into container on the page
//         this.#dataContainer.innerHTML = content;
//     }
//
//     /**
//      * @param {string} title Product title
//      * @param {string} price Product price
//      * @param {string} img   Product image
//      */
//     async getTemplateBlockItem(title, price, img) {
//         if (!this.#itemTemplate) {
//             let response = await fetch('template/product_item.html');
//             this.#itemTemplate = await response.text();
//         }
//
//         let template = this.#itemTemplate;
//         template = template.replaceAll('VAR_TITLE', title);
//         template = template.replaceAll('VAR_PRICE', price);
//         template = template.replaceAll('VAR_IMG', img);
//
//         return template;
//     }
//
//     async getAllProducts() {
//         if (!this.#itemsCount) {
//             let response = await fetch(`${this.#API_SEARCH}`);
//             let totalItems = await response.json();
//
//             this.#itemsCount = Math.ceil(totalItems.length / this.#paginationLimit);
//         }
//         return this.#itemsCount;
//     }
//
//     async addPaginationNumbers() {
//         // find number of page
//         for (let i = 1; i <= await this.getAllProducts(); i++) {
//             // create element for pagination
//             let pageNumber = document.createElement('div');
//             pageNumber.className = 'pagination-number' + (i === 1 ? ' active' : '');
//             pageNumber.innerHTML = i.toString();
//             pageNumber.setAttribute('page-index', i.toString());
//
//             //
//             this.addEventHandleActivePageNumber(pageNumber);
//
//             //add page of Number in pagination
//             this.#paginationNumber.appendChild(pageNumber);
//         }
//     }
//
//     addEventHandleActivePageNumber(pageNumber) {
//         pageNumber.addEventListener('click', (event) => {
//             //
//             pageNumber = event.target;
//             pageNumber.parentElement.querySelector('.active').classList.remove('active');
//             let pageIndex = Number(pageNumber.getAttribute('page-index'));
//             pageNumber.classList.add('active');
//             //
//             this.renderProducts(pageIndex);
//         });
//     }
//
//     init(dataContainer, prevBtn = '.next-icon', nextBtn = '.next-icon', paginationNumber = 'pagination-numbers') {
//         this.#dataContainer = document.getElementById(dataContainer);
//         this.#paginationNumber = document.getElementById(paginationNumber);
//     }
// }

// let pagination = new Pagination(12);
//
// pagination.init('all-products');
// pagination.renderProducts();
// pagination.addPaginationNumbers();



