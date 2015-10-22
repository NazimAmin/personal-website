$(document).ready(function () {

    $('.card').addClass('wow pulse hvr-grow');
    $('.fa-heart, .fa-code').bind('mouseenter mouseleave click', function () {
        $(this).toggleClass('animated rubberBand');;
    });

    //init wow js - delay animation until scroll
    var wow = new WOW({}).init();

    //get random and it's complementary color
    var color = generateRandomColor();
    var cColor = generateComplimentColor(color);

    $('body').css({
        'background': '#' + color,
        'color': '#' + cColor
    });

    //init particles js
    particlesJS('welcome-header-container', {
        "particles": {
            "number": {
                "value": 25,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": cColor
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 3
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
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
            console.log('ok');
            var color = generateRandomColor();
            var cColor = generateComplimentColor(color);

            $('body').css({
                'background': '#' + color,
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
    return (((Math.random() * '0xFFFFFF').toString(16)).slice(-6));
}

function generateComplimentColor(randomColor) {
    return (('0xffffff' ^ '0x' + randomColor).toString(16));
}