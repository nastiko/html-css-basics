//Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Sliders
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

slider();