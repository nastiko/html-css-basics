$(window).on('resize', function() {
    let windowScreen = $(this);
    if (windowScreen.width() <= 970) {
        $('.desktop-device, .img-first_wrap.hide-block, .desktop-img, .hr-first_line, .hr-second_line, .grid-container, .video-subtitle, .video-type_course, .fourth-block_wrap, .footer-list_style').hide();
    } else {
        $('.desktop-device, .img-first_wrap.hide-block, .desktop-img, .hr-first_line, .hr-second_line, .grid-container, .video-subtitle, .video-type_course, .fourth-block_wrap, .footer-list_style').show();
    }
});
