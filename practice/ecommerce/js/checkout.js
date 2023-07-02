class ValidationForm {
    #form;
    #email;
    #firstName;

    #setDiscount = 'sale-25';
    #discount;
    #applyDiscountBtn;

    #validationResult = true;

    constructor(form, email = '#email', firstName = '#first-name', discount = 'discount', applyDiscountBtn = 'apply-discount') {
        this.#form = document.getElementById(form);
        this.#email = this.#form.querySelector(email);
        this.#firstName = this.#form.querySelector(firstName);
        this.#discount = document.getElementById(discount);
        this.#applyDiscountBtn = document.getElementById(applyDiscountBtn);
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

    init() {
        this.#applyDiscountBtn.addEventListener('click', (event) => this.applyDiscount(event));
        this.#discount.addEventListener('keyup', () => this.removeStyles());

    }

}

let validation = new ValidationForm('form-checkout');
validation.validationInput();
validation.init();

class Toggle {

    #sectionCheckoutBlock;
    #btnPayment;
    #blockPayment;

    #sectionHighlighterBlock;
    #defaultPage;
    #nextInactiveSpan;

    #BtnReturnToInfoPage;

    togglePaymentBlock(event) {
        event.preventDefault();
        this.#blockPayment.classList.toggle('active-block');

        this.getHighlighterPage();
    }

    getHighlighterPage() {
        this.#defaultPage.classList.remove('default-page');
        this.#defaultPage.classList.add('prev-link');

        this.#nextInactiveSpan.classList.remove('page-highlighter_inactive');
        this.#nextInactiveSpan.classList.add('default-page');
    }

    getPrevHighlighterPage(event) {
        event.preventDefault();
        this.#nextInactiveSpan.classList.add('page-highlighter_inactive');
        this.#nextInactiveSpan.classList.remove('default-page');

        this.#defaultPage.classList.add('default-page');
        this.#defaultPage.classList.remove('prev-link');

        // if (this.#blockPayment.style.display === 'block') {
        //     this.#blockPayment.style.visibility = 'none';
        // }
    }


    init(sectionCheckout,
         sectionHighlighter,
         btnPayment = '#payment',
         blockPayment = '#payment-info',
         defaultPage = '.default-page',
         nextInactiveSpan = '.page-highlighter_inactive',
         btnReturnInfoPage = '#prev-highlighter_page') {

        this.#sectionCheckoutBlock = document.getElementById(sectionCheckout);
        this.#btnPayment = this.#sectionCheckoutBlock.querySelector(btnPayment);
        this.#blockPayment = this.#sectionCheckoutBlock.querySelector(blockPayment);
        this.#BtnReturnToInfoPage = this.#sectionCheckoutBlock.querySelector(btnReturnInfoPage)

        this.#sectionHighlighterBlock = document.getElementById(sectionHighlighter);
        this.#defaultPage = this.#sectionHighlighterBlock.querySelector(defaultPage);
        this.#nextInactiveSpan = this.#sectionHighlighterBlock.querySelector(nextInactiveSpan);

        this.#btnPayment.addEventListener('click', (event) => this.togglePaymentBlock(event));
        this.#BtnReturnToInfoPage.addEventListener('click', (event) => this.getPrevHighlighterPage(event));
    }
}

let toggle = new Toggle()
toggle.init('form-checkout', 'highlighter-page');