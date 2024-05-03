

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        // linkSelector: 'a:not([data-no-swup])',
        animationSelector: '[class="port-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".port-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".port-animation-1 .port-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".port-animation-1 .port-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".port-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".port-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".port-reveal-box", {
        right: "0"
    });
    timeline.to(".port-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".port-animation-2 .port-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".port-animation-2 .port-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".port-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".port-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.port-preloader').addClass("port-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".port-arrow").clone().appendTo(".port-arrow-place");
        $(".port-dodecahedron").clone().appendTo(".port-animation");
        $(".port-lines").clone().appendTo(".port-lines-place");
        $(".port-main-menu ul li.port-active > a").clone().appendTo(".port-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".port-accordion-group");
    let menus = gsap.utils.toArray(".port-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".port-accordion-menu");
        let box = element.querySelector(".port-accordion-content");
        let symbol = element.querySelector(".port-symbol");
        let minusElement = element.querySelector(".port-minus");
        let plusElement = element.querySelector(".port-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".port-back-to-top .port-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.port-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.port-drag, .port-more, .port-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.port-drag, .port-more, .port-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.port-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('port-accent');
    });

    $('.port-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('port-accent');
    });

    $('.port-drag').mouseover(function () {
        gsap.to($('.port-ball .port-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.port-drag').mouseleave(function () {
        gsap.to($('.port-ball .port-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.port-more').mouseover(function () {
        gsap.to($('.port-ball .port-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.port-more').mouseleave(function () {
        gsap.to($('.port-ball .port-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.port-choose').mouseover(function () {
        gsap.to($('.port-ball .port-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.port-choose').mouseleave(function () {
        gsap.to($('.port-ball .port-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".port-choose , .port-more , .port-drag , .port-accent-cursor"), input , textarea, .port-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.port-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".port-choose , .port-more , .port-drag , .port-accent-cursor"), input, textarea, .port-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.port-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.port-menu-btn').on("click", function () {
        $('.port-menu-btn').toggleClass('port-active');
        $('.port-menu').toggleClass('port-active');
        $('.port-menu-frame').toggleClass('port-active');
    });
    /***************************

    main menu

    ***************************/
    $('.port-has-children a').on('click', function () {
        $('.port-has-children ul').removeClass('port-active');
        $('.port-has-children a').removeClass('port-active');
        $(this).toggleClass('port-active');
        $(this).next().toggleClass('port-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.port-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".port-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".port-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".port-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".port-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="port-custom-dot port-slide-1"></div>', '<div class="port-custom-dot port-slide-2"></div>', '<div class="port-custom-dot port-slide-3"></div>', '<div class="port-custom-dot port-slide-4"></div>', '<div class="port-custom-dot port-slide-5"></div>', '<div class="port-custom-dot port-slide-6"></div>', '<div class="port-custom-dot port-slide-7"></div>']
    var mySwiper = new Swiper('.port-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.port-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.port-revi-next',
            prevEl: '.port-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.port-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.port-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.port-portfolio-next',
            prevEl: '.port-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.port-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.port-portfolio-next',
            prevEl: '.port-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.port-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.port-portfolio-next',
            prevEl: '.port-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.port-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.port-menu-btn').removeClass('port-active');
        $('.port-menu').removeClass('port-active');
        $('.port-menu-frame').removeClass('port-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".port-arrow-place .port-arrow, .port-animation .port-dodecahedron, .port-current-page a").remove();
            $(".port-arrow").clone().appendTo(".port-arrow-place");
            $(".port-dodecahedron").clone().appendTo(".port-animation");
            $(".port-lines").clone().appendTo(".port-lines-place");
            $(".port-main-menu ul li.port-active > a").clone().appendTo(".port-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".port-accordion-group");
        let menus = gsap.utils.toArray(".port-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".port-accordion-menu");
            let box = element.querySelector(".port-accordion-content");
            let symbol = element.querySelector(".port-symbol");
            let minusElement = element.querySelector(".port-minus");
            let plusElement = element.querySelector(".port-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.port-drag, .port-more, .port-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.port-drag, .port-more, .port-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.port-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('port-accent');
        });

        $('.port-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('port-accent');
        });

        $('.port-drag').mouseover(function () {
            gsap.to($('.port-ball .port-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.port-drag').mouseleave(function () {
            gsap.to($('.port-ball .port-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.port-more').mouseover(function () {
            gsap.to($('.port-ball .port-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.port-more').mouseleave(function () {
            gsap.to($('.port-ball .port-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.port-choose').mouseover(function () {
            gsap.to($('.port-ball .port-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.port-choose').mouseleave(function () {
            gsap.to($('.port-ball .port-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".port-choose , .port-more , .port-drag , .port-accent-cursor"), input , textarea, .port-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.port-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".port-choose , .port-more , .port-drag , .port-accent-cursor"), input, textarea, .port-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.port-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.port-has-children a').on('click', function () {
            $('.port-has-children ul').removeClass('port-active');
            $('.port-has-children a').removeClass('port-active');
            $(this).toggleClass('port-active');
            $(this).next().toggleClass('port-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".port-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".port-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".port-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".port-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="port-custom-dot port-slide-1"></div>', '<div class="port-custom-dot port-slide-2"></div>', '<div class="port-custom-dot port-slide-3"></div>', '<div class="port-custom-dot port-slide-4"></div>', '<div class="port-custom-dot port-slide-5"></div>', '<div class="port-custom-dot port-slide-6"></div>', '<div class="port-custom-dot port-slide-7"></div>']
        var mySwiper = new Swiper('.port-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.port-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.port-revi-next',
                prevEl: '.port-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.port-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.port-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.port-portfolio-next',
                prevEl: '.port-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.port-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.port-portfolio-next',
                prevEl: '.port-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.port-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.port-portfolio-next',
                prevEl: '.port-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});
