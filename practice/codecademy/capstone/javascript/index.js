$(window).on('resize', function() {
    let windowScreen = $(this);
    if (windowScreen.width() <= 970) {
        $('.img-first_wrap.hide-block').hide();
    } else {
        $('.img-first_wrap.hide-block').show();
    }
});
