$('a[href^="#"]').on('click', function(event) {
    $(this).parent('div').css('height', '100vh');
    $(this).next().css('display', 'block');
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});