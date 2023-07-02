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

    isValidEmail() {
        return this.#email.value.toLowerCase().match(
            /^[^]+\@[a-zA-z]+\.[a-zA-Z]{2,4}$/);
    }

    validationInput() {
        // Email
        if (this.getEmailValue() === '') {
            this.setError(this.#email, 'Email is required');
        } else if(!this.isValidEmail(this.getEmailValue())) {
            this.setError(this.#email, 'Provide a valid email address');
        } this.setSuccess(this.#email, '');

        // First Name
        if(this.getFirstNameValue() === '') {
            this.setError(this.#firstName, 'Name is required');
        } else {
            this.setSuccess(this.#firstName);
        }



    }

    applyDiscount(event) {
        let userValue = this.#discount.value;
        if(userValue === this.#setDiscount) {
            this.setSuccess(this.#discount, 'Discount is successful!');
        } else {
            this.setError(this.#discount, 'Discount is not successful!');
        }

        event.preventDefault();
    }

    init() {
        this.#applyDiscountBtn.addEventListener('click', (event) => this.applyDiscount(event));
    }

}

let validation = new ValidationForm('form-checkout');
validation.validationInput();
validation.init();