'use strict';

$(document).ready(function () {
    particlesJS.load('welcome-header-container', 'scripts/particlesjs-config.json');
    $('.fa-heart').hover(function () {
        $(this).toggleClass('animated rubberBand');
    });
});
/*
$(window).resize(function () {
    if (document.documentElement.clientWidth <= 650) {
        $('.col-xs-6').addClass('col-md-4').removeClass('col-xs-6');
    } else {
        $('.col-md-4').addClass('col-xs-6');
    }
}).resize();*/
//# sourceMappingURL=main.js.map
