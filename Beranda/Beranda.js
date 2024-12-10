// Slick slider initialization
$(document).ready(function () {
    $('.slider').slick({
        infinite: true,        // Infinite scrolling
        slidesToShow: 3,       // Number of slides to show
        slidesToScroll: 1,     // Number of slides to scroll
        arrows: true,          // Enable arrows for manual sliding
        dots: true,            // Enable dot navigation
        autoplay: true,        // Enable auto-sliding
        autoplaySpeed: 3000,   // Speed for auto-slide (3 seconds)
        swipe: true,           // Enable swipe gestures (manual slide)
        touchMove: true,       // Allow touch screen interaction
    });
});