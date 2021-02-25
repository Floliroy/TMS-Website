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
 * Set page transition
 */
let loader = $(".loader")
function loaderIn() {
    return gsap.fromTo(loader,
        {
            rotation: 30,
            scaleX: 0,
            xPercent: -5
        },
        {
            duration: 0.8,
            xPercent: 0,
            scaleX: 1,
            rotation: 0,
            ease: 'power4.inOut',
            transformOrigin: 'left center'
        })
}
function loaderAway() {
    return gsap.to(loader, {
        duration: 0.8,
        scaleX: 0,
        xPercent: 5,
        rotation: 0,
        transformOrigin: 'right center',
        ease: 'power4.inOut'
    })
}
gsap.set(loader, {
    scaleX: 0,
    rotation: 30,
    xPercent: -5,
    yPercent: -50,
    transformOrigin: 'left center',
    autoAlpha: 1
})
barba.hooks.enter(() => {
    window.scrollTo(window.scrollX, 0);
})
barba.init({
    transitions: [{
        async leave() {
            await loaderIn();
        },
        enter() {
            loaderAway();
        }
    }]
})

/**
 * Change header active link
 */
$(document).on('click', 'header a', function(event) {
    $(".selected").removeClass("selected")
    $(event.currentTarget).addClass("selected")
})