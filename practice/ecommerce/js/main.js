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
            let template = this.getTemplateBlockItem(this.#title, this.#price, this.#img);
            let container = document.getElementById('container');
            container.innerHTML += template;
        }
    }

    getTemplateBlockItem(title, price, img) {
        return '<div class="col-banner_carousel">\n' +
            '        <div class="hover-element">\n' +
            '             <div class="blocks-position">\n' +
            '                  <img class="img-style"\n' +
            '                       src="' + img + '"\n' +
            '                       alt="' + title + '">\n' +
            '                  <div class="flex-links">\n' +
            '                       <div class="icon-button" data-bs-toggle="tooltip" title="Add to Cart">\n' +
            '                            <div class="icon-bag">\n' +
            '                                 <a href="#"></a>\n' +
            '                            </div>\n' +
            '                       </div>\n' +
            '                       <div class="icon-button" data-bs-toggle="tooltip" title="Wishlist">\n' +
            '                            <div class="icon-like">\n' +
            '                                 <a href="#"></a>\n' +
            '                            </div>\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '             </div>\n' +
            '             <div>\n' +
            '                  <div class="flex-stars">\n' +
            '                       <span class="icon-star"></span>\n' +
            '                       <span class="icon-star"></span>\n' +
            '                       <span class="icon-star"></span>\n' +
            '                       <span class="icon-star"></span>\n' +
            '                       <span class="icon-star"></span>\n' +
            '                  </div>\n' +
            '                  <div>\n' +
            '                       <h3 class="product-name">\n' +
            '                           <a href="#">' + title + '</a>\n' +
            '                       </h3>\n' +
            '                       <p class="product-price">£' + price + '</p>\n' +
            '                  </div>\n' +
            '             </div>\n' +
            '        </div>\n' +
            '   </div>'
    }
}

class Countdown {
    constructor(days, hours, mins, secs) {
        this.days = days;
        this.hours = hours;
        this.mins = mins;
        this.secs = secs;
    }

    countDownTo() {
        //countdown to
        let contDate = new Date('December 31, 2023 00:00:00').getTime();
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

        let textDay = Math.floor(this.countDownTo / days);
        let textHour = Math.floor((this.countDownTo % days) / hours);
        let textMinutes = Math.floor((this.countDownTo % hours) / minutes);
        let textSecond = Math.floor((this.countDownTo % minutes) / seconds);

        this.days.innerHTML = textDay;
        this.hours.innerHTML = textHour;
        this.mins.innerHTML = textMinutes;
        this.secs.innerHTML = textSecond;

        if(textDay < 100) {
            this.days.innerHTML = '0' + textDay;
        } else if(textDay < 10) {
            this.days.innerHTML = '00' + textDay;
        }

        if(textHour < 10) {
            this.hours.innerHTML = '0' + textHour;
        }

        if(textMinutes < 10) {
            this.mins.innerHTML = '0' + textMinutes;
        }

        if(textSecond < 10) {
            this.secs.innerHTML = '0' + textSecond;
        }
    }

    setInterval() {
        setInterval(this.calculateTime, 1000);
    }

    init(daysId, hoursId, minsId, secsId) {
        this.days = document.getElementById(daysId);
        this.hours = document.getElementById(hoursId);
        this.mins = document.getElementById(minsId);
        this.secs = document.getElementById(secsId);
    }
}

let time = new Countdown();
time.init('days', 'hours', 'mins', 'secs');
time.setInterval();
