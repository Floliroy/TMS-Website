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
    $(".selected").removeClass("selected")
    $(event.currentTarget).addClass("selected")
})

/**
 * Move background
 */
const movementStrength = 50
$(document).mousemove(function(event){
    const width = movementStrength / $(window).width()
    const height = movementStrength / $(window).height()
    const newvalueX = width * (event.clientX - ($(window).width() / 2)) * - 1 - 25
    const newvalueY = height * (event.clientY - ($(window).height() / 2)) * - 1 - 50
    $(".background").css("background-position", `calc(50% - ${newvalueX}px) calc(50% - ${newvalueY}px)`)
})