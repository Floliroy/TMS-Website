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
 const listAboutus = new Array("aboutus", "projets", "recrutement", "coaching")
$(document).on('click', 'header a', function(event) {
    $(".active").removeClass("active")
    $(event.currentTarget).addClass("active")
    
    const decomposition = event.currentTarget.href.split("/")
    const body = decomposition[decomposition.length-1]
    if(event.currentTarget.href.includes("?lineup")){
        $("#navbarDropdownLineup").addClass("active")
    }else if(listAboutus.includes(body)){
        $("#navbarDropdownAboutus").addClass("active")
    }
})

/**
 * Hide navbar on click
 */
$(".navbar-collapse").on('click', 'a:not([data-toggle])', function () {
    $(".navbar-collapse").collapse("hide")
})