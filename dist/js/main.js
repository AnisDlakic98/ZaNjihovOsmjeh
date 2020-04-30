$(function() {
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 10) {
            $(".navbar").addClass("active");
            $(".navbar-brand img").attr("src", "img/za-njihov-osmijeh-logo@3x.png");
        } else {
            $(".navbar").removeClass("active");
            $(".navbar-brand img").attr(
                "src",
                "img/za-njihov-osmijeh-logo-white@2x.png"
            );
        }
    });

    $(window).load(function() {
        setTimeout(function() {
            $(".preloader").fadeOut();
        }, 1000);
    });

    $("#carousel").owlCarousel({
        // autoplay: true,
        lazyLoad: true,
        loop: true,

        animateOut: "fadeOut",
        animateIn: "fadeIn",
        margin: 150,
        responsiveClass: true,
        autoHeight: true,
        autoplayTimeout: 7000,
        smartSpeed: 800,
        // stagePadding: 50,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },

            600: {
                items: 1,
            },

            1076: {
                margin: 150,
                items: 2,
            },

            1366: {
                items: 2,
            },
        },
    });
});

$(".navbar-toggler").on("click", function(e) {
    e.preventDefault();
    if ($(".hamburger").hasClass("active-menu")) {
        $(".hamburger").removeClass("active-menu");
    } else {
        $(".hamburger").addClass("active-menu");
    }
});

$(".nav-item").hover(function() {
    $(this).toggleClass("active");
});