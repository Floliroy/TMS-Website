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
//Function at beginning of page change
function loaderIn() {
    return gsap.fromTo(loader,
        {
            rotation: -30,
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
//Function at end of page change
function loaderAway() {
    return gsap.to(loader, {
        duration: 0.8,
        scaleX: 0,
        xPercent: 5,
        rotation: 30,
        transformOrigin: 'right center',
        ease: 'power4.inOut'
    })
}
//Init of page change div animation
gsap.set(loader, {
    scaleX: 0,
    rotation: -30,
    xPercent: -5,
    yPercent: 50,
    transformOrigin: 'left center',
    autoAlpha: 1
})
barba.hooks.enter(function(){
    window.scrollTo(window.scrollX, 0)
})
//Recreate twitch embed player
barba.hooks.after(function(){
    if($("#twitch-embed").length){
        const width = document.querySelector("#main").offsetWidth - 46
        new Twitch.Embed("twitch-embed", {
            width: "100%",
            height: (width-340)/(16/9),
            channel: "tacticalmonkeyesport",
            parent: ["tms.floliroy.fr"],
        })
    }
})
//Barba init
barba.init({
    transitions: [{
        async leave() {
            await loaderIn()
        },
        enter() {
            loaderAway()
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