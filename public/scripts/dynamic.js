/**
 * Function to replace when clicking on anchor
 */
function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 100)
    }
}
$(document).on('click', 'a[href^="#"]', function(event) {
    window.setTimeout(function() {
        offsetAnchor()
    }, 0)
})
window.setTimeout(offsetAnchor, 0)

/**
 * Change header active link
 */
$(document).on('click', 'header a', function(event) {
    $(".active").removeClass("active")
    $(event.currentTarget).addClass("active")
})

/**
 * Hide navbar on click
 */
$(".navbar-collapse").on('click', 'a:not([data-toggle])', function () {
    $(".navbar-collapse").collapse("hide")
})