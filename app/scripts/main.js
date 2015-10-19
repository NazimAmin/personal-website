$(document).ready(function () {
    particlesJS.load('welcome-header-container', 'scripts/particlesjs-config.json');
    $('.fa-heart, .fa-code').bind('mouseenter mouseleave click', function () {
        $(this).toggleClass('animated rubberBand');
    });
});