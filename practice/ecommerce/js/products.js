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

        if(maxVal - minVal < this.#priceGap) {
            if(event.target.className === 'range-min') {
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

        if((maxVal - minVal >= this.#priceGap) && (maxVal <= 550)) {
            if(event.target.id === 'min-value') {
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

        for(let j = 0; j < this.#priceInput.length; j++) {
            this.#priceInput[j].addEventListener('input', (event) => this.updateSlideRange(event));
        }
    }
}
