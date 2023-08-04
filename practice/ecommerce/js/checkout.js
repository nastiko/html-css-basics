class ValidationForm {
    #form;
    #email;
    #firstName;

    #setDiscount = 'sale-25';
    #discount;
    #applyDiscountBtn;

    #validationResult = true;

    #formReview;
    #btnPayment;
    #blockPayment;
    #blockReview;
    #changeInfo;

    #sectionHighlighterBlock;
    #defaultPage;
    #nextInactiveSpan;

    #btnReturnToInfoPage;

    constructor(form,
                sectionHighlighterBlock,
                email = '#email',
                firstName = '#first-name',
                discount = 'discount',
                applyDiscountBtn = 'apply-discount',
                formReview = '#form-review',
                btnPayment = '#payment',
                blockPayment = '#payment-info',
                blockReview = '#block-review',
                changeInfo = '.link-point',
                defaultPage = '.default-page',
                nextInactiveSpan = '.page-highlighter_inactive',
                btnReturnToInfoPage = '#prev-highlighter_page') {
        this.#form = document.getElementById(form);
        this.#email = this.#form.querySelector(email);
        this.#firstName = this.#form.querySelector(firstName);
        this.#discount = document.getElementById(discount);
        this.#applyDiscountBtn = document.getElementById(applyDiscountBtn);

        this.#formReview = this.#form.querySelector(formReview);
        this.#btnPayment = this.#form.querySelector(btnPayment);
        this.#blockPayment = this.#form.querySelector(blockPayment);
        this.#blockReview = this.#form.querySelector(blockReview);
        this.#btnReturnToInfoPage = this.#form.querySelector(btnReturnToInfoPage)

        this.#sectionHighlighterBlock = document.getElementById(sectionHighlighterBlock);
        this.#defaultPage = this.#sectionHighlighterBlock.querySelector(defaultPage);
        this.#nextInactiveSpan = this.#sectionHighlighterBlock.querySelector(nextInactiveSpan);

        this.#changeInfo = this.#blockReview.querySelectorAll(changeInfo);
    }

    getEmailValue() {
        return this.#email.value.trim();
    }

    getFirstNameValue() {
        return this.#firstName.value.trim();
    }

    setError(elem, message) {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');

        this.#validationResult = false;
    }

    setSuccess(elem, message) {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = message;
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    removeStyles() {
        let userValue = this.#discount.value;
        console.log(userValue);
        if (userValue === '') {
            let inputControl = this.#discount.parentElement;
            let errorDisplay = inputControl.querySelector('.error');

            errorDisplay.innerHTML = '';
            inputControl.classList.remove('success');
            inputControl.classList.remove('error');
        }
    }

    isValidEmail() {
        return this.#email.value.toLowerCase().match(
            /^[^]+\@[a-zA-z]+\.[a-zA-Z]{2,4}$/);
    }

    validationInput() {
        // Email
        if (this.getEmailValue() === '') {
            this.setError(this.#email, 'Email is required');
        } else if (!this.isValidEmail(this.getEmailValue())) {
            this.setError(this.#email, 'Provide a valid email address');
        }
        this.setSuccess(this.#email, '');

        // First Name
        if (this.getFirstNameValue() === '') {
            this.setError(this.#firstName, 'Name is required');
        } else {
            this.setSuccess(this.#firstName);
        }
    }

    applyDiscount(event) {
        let userValue = this.#discount.value;
        if (userValue === this.#setDiscount) {
            this.setSuccess(this.#discount, 'Discount is successful!');
        } else {
            this.setError(this.#discount, 'Discount is not successful!');
        }

        event.preventDefault();
    }

    // add hidden payment block
    togglePaymentBlock(event) {
        event.preventDefault();
        this.#blockPayment.classList.toggle('active-block');
        this.#blockReview.classList.toggle('active-block');

        this.#formReview.style.display = 'none';

        this.getHighlighterPage();
    }

    // get color:black of the current page when payment block appears
    getHighlighterPage() {
        this.#defaultPage.classList.remove('default-page');
        this.#defaultPage.classList.add('prev-link');

        this.#nextInactiveSpan.classList.remove('page-highlighter_inactive');
        this.#nextInactiveSpan.classList.add('default-page');
    }

    // make the prev link of the previous page color:grey
    getPrevHighlighterPage(event) {
        event.preventDefault();
        this.#nextInactiveSpan.classList.add('page-highlighter_inactive');
        this.#nextInactiveSpan.classList.remove('default-page');

        this.#defaultPage.classList.add('default-page');
        this.#defaultPage.classList.remove('prev-link');

        this.#blockPayment.classList.toggle('active-block');
        this.#blockReview.classList.toggle('active-block');
        this.#formReview.style.display = 'block';
    }

    init() {
        this.#applyDiscountBtn.addEventListener('click', (event) => this.applyDiscount(event));
        this.#discount.addEventListener('keyup', () => this.removeStyles());

        this.#btnPayment.addEventListener('click', (event) => this.togglePaymentBlock(event));
        this.#btnReturnToInfoPage.addEventListener('click', (event) => this.getPrevHighlighterPage(event));

        for(let i = 0; i < this.#changeInfo.length; i++) {
            this.#changeInfo[i].addEventListener('click', (event) => this.getPrevHighlighterPage(event));
        }

    }

}

let validation = new ValidationForm('form-checkout', 'highlighter-page');
validation.validationInput();
validation.init();