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
    //Set active menu
    $(".active").removeClass("active")
    $(event.currentTarget).addClass("active")
    //Set active sub menu
    if(event.currentTarget.href.includes("?lineup")){
        $("#navbarDropdownLineup").addClass("active")
    }
})

/**
 * Hide navbar on click
 */
const pageName = new Map()
    .set("index", "Accueil")
    .set("actualites", "Actualités")
    .set("lineup", "Line-up")
    .set("stream", "Web TV")
    .set("aboutus", "A propos")
    .set("recrutement", "Nous rejoindre")
    .set("error", "Erreur 404")
$(".navbar").on('click', 'a:not([data-toggle])', function (event) {
    //Close menu
    $(".navbar-collapse").collapse("hide")

    //Close submenu
    $(".show").removeClass("show")

    //Change page title    
    const decomposition = event.currentTarget.href.split("/")
    const body = decomposition[decomposition.length-1]
    if(pageName.get(body)){
        document.title = `TMS - ${pageName.get(body)}`
    }
})

/**
 * Load the datatable
 */
$(document).ready(function(){
    if(window.$("#tableResultats").length){
        window.$("#tableResultats").DataTable({
            "language": {"url": "https://cdn.datatables.net/plug-ins/1.11.0/i18n/fr_fr.json"},
            "columnDefs": [
                {type: "date-eu", targets: 0}
            ],
            "order": [
                [1,"desc"], [0, "desc"]
            ]
        })
    }
})