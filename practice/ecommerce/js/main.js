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

    let arrDiscount = [30, 50, 70];
    let i = 0;

    setInterval(function () {
        elemSpan.textContent = `${arrDiscount[i++]}`;
        if (i >= arrDiscount.length) {
            i = 0;
        }
    }, 3000);

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