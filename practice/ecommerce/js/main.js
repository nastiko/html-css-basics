//Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Sliders
function slider() {
    let arrows = document.querySelectorAll('.bg-icon');
    for(let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener('click', nextSlide);
    }

    //устанавливаем индекс слайда по умолчанию
    let slideIndex = 1;
    showSlides(slideIndex);

    function nextSlide() {
        //увеличиваем индекс на 1, то есть показываем следующий слайд
        showSlides(slideIndex += 1);
    }

    function previousSlide() {
        //уменьшаем индекс на 1, то есть показываем предыдущий слайд
        showSlides(slideIndex -= 1);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let sliders = document.getElementsByClassName('slider');

        if (n > sliders.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = sliders.length;
        }

        for (let slide of sliders) {
            slide.style.display = 'none';
        }
        sliders[slideIndex - 1].style.display = 'block';
    }


    //let widthWindow = window.innerWidth;
}

slider();