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
$(".navbar").on('click', 'a:not([data-toggle])', function (event) {
    //Close menu
    $(".navbar-collapse").collapse("hide")

    //Close submenu
    $(".show").removeClass("show")
})

/**
 * Load the datatable
 */
$(document).ready(function(){
    if($("#tableResultats").length > 0){
        window.$("#tableResultats").DataTable({
            "language": {"url": "https://cdn.datatables.net/plug-ins/1.11.0/i18n/fr_fr.json"},
            "retrieve": true,
            "pageLength": 25,
            "columnDefs": [
                {type: "date-eu", targets: 0}
            ],
            "order": [
                [1,"desc"], [0, "desc"]
            ]
        })
    }
})