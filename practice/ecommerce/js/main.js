//Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Sliders
function slider() {
    let sliders = document.querySelectorAll('.carousel_slide');
    let nextBtn = document.getElementById('right-click');
    let prevBtn = document.getElementById('left-click');
    let indicatorNav = document.querySelectorAll('.carousel_nav button');
    let currentPosition = 0;
    let viewportWidth = window.innerWidth;
    //console.log(viewportWidth);


    for(let i = 0; i < sliders.length; i++) {
        sliders[i].style.left = viewportWidth * i + 'px';
    }

    nextBtn.addEventListener('click', moveRight);
    function moveRight() {
        let currentSlide = document.getElementById('current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        let amountToMove = nextSlide.style.left;
        sliders.style.transform = 'translateX(' + amountToMove + ')';
    }
}

slider();