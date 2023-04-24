//sliders
class Sliders {

    #slideWidth;
    #slideCount;
    #slideContainer;
    #nextBtn;
    #prevBtn;
    #dots;

    #slideShown = 1;

    constructor(slideWidth, slideCount, slideContainer, nextBtn, prevBtn, dots) {
        this.#slideWidth = slideWidth;
        this.#slideCount = slideCount;
        this.#slideContainer = slideContainer;
        this.#nextBtn = nextBtn;
        this.#prevBtn = prevBtn;
        this.#dots = dots;
    }

    move(direction, slideSelected = 0) {
        let currPos = this.#slideContainer.getBoundingClientRect().left;
        let shiftSlides = 1;

        if (direction === 'selected') {
            // if dot selected is for the current slide - do nothing
            if (this.#slideShown === slideSelected) {
                return;
            } else {
                // define shift direction
                direction = this.#slideShown > slideSelected ? 'right' : 'left';
            }
            // calculate number of slides to shift
            shiftSlides = Math.abs(this.#slideShown - slideSelected);
        }

        let shiftPixel = this.#slideWidth * (direction === 'left' ? -shiftSlides : shiftSlides);


        if (direction === 'right' && this.#slideShown <= 1) {
            this.move('selected', this.#slideCount);
            return;
        } else if (direction === 'left' && this.#slideCount - this.#slideShown <= 0) {
            this.move('selected', 1);
            return;
        } else {
            this.#slideShown += direction === 'left' ? shiftSlides : -shiftSlides;
        }
        this.#slideContainer.style.left = (currPos + shiftPixel).toString() + 'px';

        for (let i = 0; i < this.#dots.length; i++) {
            this.#dots[i].classList.remove('current-slide');
        }
        this.#dots[this.#slideShown - 1].classList.add('current-slide');
    }

    init(slideWidthClass, slideCountClasses, slideContainerClass, nextBtnId, PrevBtnId, dotsClass) {
        this.#slideWidth = document.querySelector(slideWidthClass).getBoundingClientRect().width;
        this.#slideCount = document.querySelectorAll(slideCountClasses).length;
        this.#slideContainer = document.querySelector(slideContainerClass);
        this.#nextBtn = document.getElementById(nextBtnId);
        this.#prevBtn = document.getElementById(PrevBtnId);
        this.#dots = document.getElementsByClassName(dotsClass);

        this.#nextBtn.addEventListener('click', () => this.move('left'));
        this.#prevBtn.addEventListener('click', () => this.move('right'));
        for (let i = 0; i < this.#dots.length; i++) {
            this.#dots[i].addEventListener('click', () => this.move('selected', i + 1));
        }
    }
}

class BlockSlider {

    #slides;
    #sliderBlock;
    #sliderContainer;

    #clickBtns;

    #currPosition = 0;

    constructor(slides, sliderBlock, sliderContainer, clickBtns) {
        this.#slides = slides;
        this.#sliderBlock = sliderBlock;
        this.#sliderContainer = sliderContainer;
        this.#clickBtns = clickBtns;
    }

    isInViewport(element) {
        let positionViewportRight = this.#sliderBlock.clientWidth;

        if (element.getBoundingClientRect().left < 0) {
            return false;
        } else if (element.getBoundingClientRect().left >= positionViewportRight) {
            return false;
        } else {
            return true;
        }
    }

    getElementWidth(element, withMargin = true, withPadding = true, withBorder = true) {
        let style = element.currentStyle || window.getComputedStyle(element),
            width = element.offsetWidth, // or use style.width
            margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
            padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
            border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

        return width - (withPadding ? padding : 0) + (withBorder ? border : 0) + (withMargin ? margin : 0);
    }

    // Get width only one slide
    getSlideWidth(withMargin = true, withPadding = true, withBorder = true) {
        let element = document.querySelector('.block-img');
        return this.getElementWidth(element, withMargin, withPadding, withBorder);
    }

    // Get width only one slide
    getSlideGap() {
        return this.getSlideWidth() - this.getSlideWidth(false);
    }

    move(direction) {
        let shiftPixel = this.getSlideWidth() * (direction === 'left' ? 1 : -1);

        if (direction === 'right' && this.isInViewport(this.#slides[this.#slides.length - 1])) {
            return;
        } else if (direction === 'left' && this.isInViewport(this.#slides[0])) {
            return;
        }

        let currPos = this.#currPosition * this.getSlideWidth();
        this.#sliderContainer.style.transform = `translateX(${currPos + shiftPixel}px)`;
        this.#currPosition += direction === 'left' ? 1 : -1;
    }

    init(wrapperClass, allSlides = '.block-img', hiddenContentClass = '.carousel-imgs', clickBtnsClass = '.click-btn') {
        this.#sliderBlock = document.querySelector(wrapperClass);
        this.#slides = this.#sliderBlock.querySelectorAll(allSlides);
        this.#sliderContainer = this.#sliderBlock.querySelector(hiddenContentClass);
        this.#clickBtns = this.#sliderBlock.parentElement.querySelectorAll(clickBtnsClass);

        this.calculateWidth();

        for (let i = 0; i < this.#clickBtns.length; i++) {
            this.#clickBtns[i].addEventListener('click', () => this.move(this.#clickBtns[i].dataset.direction));
        }
    }

    calculateWidth() {
        let innerWidth = this.#sliderBlock.closest('.width-container').clientWidth - this.getSlideGap();
        let slidesCount = Math.floor((innerWidth - this.getSlideGap()) / this.getSlideWidth());
        let sliderWidth = (slidesCount <= 0 ? 1 : slidesCount) * this.getSlideWidth() - this.getSlideGap();
        this.#sliderBlock.setAttribute('style', `width: ${sliderWidth}px`);

        let sliderHiddenContentWidth = (this.#slides.length * this.getSlideWidth());
        this.#sliderContainer.setAttribute('style', `width: ${sliderHiddenContentWidth}px`);
    }
}

class Utilities {
    //change header discount
    changeDiscount() {
        function change() {
            document.getElementById('fadeEl').setAttribute('class', 'text-fade');

            setTimeout(() => {
                document.getElementById('fadeEl').innerHTML = `${arrDiscount[i++]}`;
                document.getElementById('fadeEl').setAttribute('class', 'text-show');
            }, 900);

            if (i >= arrDiscount.length) {
                i = 0;
            }
        }

        let arrDiscount = [50, 70, 30];
        let i = 0;

        setInterval(change, 2000);
    }

    //scrollUp button
    scrollUp() {
        let btn = document.getElementById('up-click');

        window.onscroll = () => window.scrollY > 250 ? btn.style.opacity = '1' : btn.style.opacity = '0';

        btn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    //Initialize tooltips
    tooltips() {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    init() {
        this.tooltips();
        this.scrollUp();
        this.changeDiscount();
    }
}

class Products {
    #title;
    #price;
    #img;

    constructor(title, price, img) {
        this.#title = title;
        this.#price = price;
        this.#img = img;
    }

    async renderProducts() {

        let response = await fetch('https://fakestoreapi.com/products/category/jewelery');
        let result = await response.json();

        for await(let item of result) {
            this.#title = item.title;
            this.#price = item.price;
            this.#img = item.image;
            let template = await this.getTemplateBlockItem(this.#title, this.#price, this.#img);
            let container = document.getElementById('container');
            container.innerHTML += template;
        }
    }

    async getTemplateBlockItem(title, price, img) {
        let response = await fetch('template/product_item.html');
        let result = await response.text();

        result = result.replaceAll('VAR_TITLE', title);
        result = result.replaceAll('VAR_PRICE', price);
        result = result.replaceAll('VAR_IMG', img);

        return result;
    }
}

class Countdown {
    constructor(days, hours, mins, secs, dateTo) {
        this.days = days;
        this.hours = hours;
        this.mins = mins;
        this.secs = secs;
        this.dateTo = dateTo;
    }

    countDownTo() {
        //countdown to
        let contDate = new Date(this.dateTo).getTime();
        //current time
        let now = new Date().getTime();
        //the finished number in milliseconds
        return contDate - now;
    }

    calculateTime() {
        let seconds = 1000;
        let minutes = seconds * 60;
        let hours = minutes * 60;
        let days = hours * 24;

        let textDay = Math.floor(this.countDownTo() / days);
        let textHour = Math.floor((this.countDownTo() % days) / hours);
        let textMinutes = Math.floor((this.countDownTo() % hours) / minutes);
        let textSecond = Math.floor((this.countDownTo() % minutes) / seconds);

        this.days.innerHTML = textDay;
        this.hours.innerHTML = textHour;
        this.mins.innerHTML = textMinutes;
        this.secs.innerHTML = textSecond;

        if (textDay < 100) {
            this.days.innerHTML = '0' + textDay;
        } else if (textDay < 10) {
            this.days.innerHTML = '00' + textDay;
        }

        if (textHour < 10) {
            this.hours.innerHTML = '0' + textHour;
        }

        if (textMinutes < 10) {
            this.mins.innerHTML = '0' + textMinutes;
        }

        if (textSecond < 10) {
            this.secs.innerHTML = '0' + textSecond;
        }
    }

    setInterval() {
        let time = this;
        setInterval(() => time.calculateTime(), 1000);
    }

    init(daysId, hoursId, minsId, secsId, date) {
        this.days = document.getElementById(daysId);
        this.hours = document.getElementById(hoursId);
        this.mins = document.getElementById(minsId);
        this.secs = document.getElementById(secsId);
        this.dateTo = date;
    }
}

class HotSale extends Countdown {
    constructor() {
        super();
    }
}
