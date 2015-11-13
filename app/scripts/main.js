//sometimes images doesn't finish loading
//making ColorThief throwing 'null' ofc.
//so wait for the page finish loading first
window.addEventListener('load', function () {
    $.each($('.card img'), function (index, value) {
        (function loadImageAndSetColor() {
            if (value.complete) {
                var vibrant = new Vibrant(value);
                if (vibrant) {
                    var bgColor = vibrant.VibrantSwatch.getHex();
                    var textColor = vibrant.VibrantSwatch.getTitleTextColor();
                    $(value).next('.project-desc').css({
                        'background': bgColor,
                        'color': textColor
                    });
                }
            } else {
                setTimeout(loadImageAndSetColor, 2000);
            }
        })();
    });

    /* $.each($('.card img'), function (index, value) {
        if (value) {
            var colorThief = new ColorThief().getColor(value);
            if (colorThief) {
                var domColor = rgbToHex(colorThief);
                var compColor = generateComplimentColor(domColor);
                $(this).next('.project-desc').css({
                    'background': domColor,
                    'color': compColor
                });
            }
        }

    });*/
});

$(document).ready(function () {
    loadProjects();
    particlesJS.load('welcome-header-container', 'scripts/particlesjs-config.json');
    $('.card').addClass('wow pulse card-hover');

    $('.fa-heart, .fa-code').bind('mouseenter mouseleave click', function () {
        $(this).toggleClass('animated rubberBand');;
    });

    //init wow js - delay animation until scroll
    var wow = new WOW({
        mobile: false
    }).init();

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

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('#scroll #Layer_1').css({
                'display': 'none'
            });
            $('#scroll #Layer_2').css({
                'display': 'block'
            });

            var color = Please.make_color();
            var cColor = generateComplimentColor(color);
            $('body').css({
                'background': color,
                'color': '#' + cColor
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

function loadProjects() {
    $.ajax({
        url: 'data/projects.json',
        dataType: "json",
        success: function (data) {
            drawProjectsToView(data);
        }
    });
}

function drawProjectsToView(projects) {
    $.each(projects.projects, function (index, el) {
        var tags = "";
        $.each(el.caption.tags, function (index, value) {
            tags += ('<li>' + value + '</li>');
        });
        var make_card = $('<div class="card">' +
            '<div class="card-item">' +
            '<img src="/images/' + el.image + '"alt=' + el.title + '>' +
            '<div class="project-desc">' +
            '<h3 class="project-title">' + el.title + '</h3>' +
            '<h5 class="project-info">' + el.info + '</h5>' +
            '</div>' +
            '<div class="card-item-caption">' +
            '<a href="' + el.link + '">' +
            '<p><span class="fa fa-code fa-lg"></span> ' + el.caption.at + '</p>' +
            '<span class="card-use-tag">' + tags +
            '</span>' +
            '<div class="github"><i class="fa fa-github fa-2x"></i>' +
            '<h6>GitHub</h6></div></a></div></div></div>');
        $('.card-holder').append(make_card);
    });
}