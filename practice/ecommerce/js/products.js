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

class Filter {

    #API_SEARCH = 'https://anastasia.grinkevi.ch/api/products/search';

    #mainBlock;
    #countEarrings;
    #countNecklaces;
    #countBracelets;
    #countRings;
    #countInStock;

    constructor(mainBlock, countEarrings = '.count-earrings', countNecklaces = '.count-necklaces',
                countBracelets = '.count-bracelets', countRings = '.count-rings', countInStock = '.count-in_stock') {
        this.#mainBlock = document.getElementById(mainBlock);
        this.#countEarrings = this.#mainBlock.querySelector(countEarrings);
        this.#countNecklaces = this.#mainBlock.querySelector(countNecklaces);
        this.#countBracelets = this.#mainBlock.querySelector(countBracelets);
        this.#countRings = this.#mainBlock.querySelector(countRings);
        this.#countInStock = this.#mainBlock.querySelector(countInStock);
    }

    async getAPIProducts() {
        // get API response with products
        let response = await fetch(`${this.#API_SEARCH}`);
        return await response.json();
    }

    async renderCountProducts() {

        let result = await this.getAPIProducts();

        let totalEarrings = 0;
        let totalNecklaces = 0;
        let totalBracelets = 0;
        let totalRings = 0;
        let totalInStock = 0

        for await(let item of result) {
            switch (item.categories[0]) {
                case 'Earrings':
                    totalEarrings++;
                    break;
                case 'Necklaces':
                    totalNecklaces++;
                    break;
                case 'Bracelets':
                    totalBracelets++;
                    break;
                case 'Rings':
                    totalRings++;
                    break;
            }
        }

        for await(let item of result) {
            item.in_stock ? totalInStock++ : 0;
        }

        this.#countEarrings.textContent = `${totalEarrings}`;
        this.#countNecklaces.textContent = `${totalNecklaces}`;
        this.#countBracelets.textContent = `${totalBracelets}`;
        this.#countRings.textContent = `${totalRings}`;
        this.#countInStock.textContent = `${totalInStock}`;
    }

    // async orderItemsByFilter() {
    //
    // }

}

let filter = new Filter('count-items_categories');
filter.renderCountProducts();


