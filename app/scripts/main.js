$(document).ready(function () {
    particlesJS.load('welcome-header-container', 'scripts/particlesjs-config.json');
    $('.card').addClass('wow pulse card-hover');

    $('.fa-heart, .fa-code').bind('mouseenter mouseleave click', function () {
        $(this).toggleClass('animated rubberBand');;
    });

    //init wow js - delay animation until scroll
    var wow = new WOW({}).init();

    //get random and it's complementary color
    // var color = generateRandomColor();
    var color = Please.make_color({
        colors_returned: 4
    });

    var cColor = '#E5E5E5'; //generateComplimentColor(color);

    $('body').css({
        'background': color[0],
        'color': cColor
    });
    $('#about-section-container').css({
        'background': color[1],
        'color': cColor
    });
    $('#project-section-container').css({
        'background': color[2],
        'color': cColor
    });
    $('#footer-section-container').css({
        'color': cColor
    });

    $.each($('.card img'), function (index, value) {
        var colorThief = new ColorThief();
        var domColor = rgbToHex(colorThief.getColor(value));
        var compColor = generateComplimentColor(domColor);
        $(this).next('.project-desc').css({
            'background': domColor,
            'color': compColor
        });

    });
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('#scroll #Layer_1').css({
                'display': 'none'
            });
            $('#scroll #Layer_2').css({
                'display': 'block'
            });
        } else if ($(window).scrollTop() == $("#welcome-header-container").offset().top) {
            $('#scroll #Layer_1').css({
                'display': 'block'
            });
            $('#scroll #Layer_2').css({
                'display': 'none'
            });
            $('#welcome-header-container').append($('#scroll'));
        }
        if ($(window).scrollTop() >= 705 && $(window).scrollTop() <= 730) {
            var color = Please.make_color();
            var cColor = generateComplimentColor(color);
            $('body').css({
                'background': color,
                'color': '#' + cColor
            });
        }

    });

    $('#scroll').click(function () {
        var $this = $(this).parent();
        var $next = $this.next();

        if (($this.attr('id') === 'welcome-header-container') &&
            $(window).scrollTop() + $(window).height() >= $("#footer-section-container").offset().top) {
            $.scrollTo($('#welcome-header-container'), 400);
        } else {
            if ($next.attr('id')) {
                $.scrollTo($($next), 400);
                $next.append($('#scroll'));
            } else {
                $.scrollTo($('#welcome-header-container'), 400);
            }
        }
    });

});

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * '0xFFFFFF').toString(16);
}

function generateComplimentColor(randomColor) {
    return randomColor.indexOf('#') == 0 ? '#' + (('0xffffff' ^ '0x' + randomColor.substring(1)).toString(16)) : '#' + (('0xffffff' ^ '0x' + randomColor).toString(16));
}

function rgbToHex(rgb) {
    return '#' + intToHex(rgb[0]) + intToHex(rgb[1]) + intToHex(rgb[2]);
}

function intToHex(intValue) {
    var hexValue = intValue.toString(16);
    return hexValue.length == 1 ? '0' + hexValue : hexValue;
}