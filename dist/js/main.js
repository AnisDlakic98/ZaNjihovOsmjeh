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
});