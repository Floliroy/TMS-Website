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
barba.hooks.enter(function(){
    window.scrollTo(window.scrollX, 0);
})
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