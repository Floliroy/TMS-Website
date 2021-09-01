require('dotenv').config()

/**
 * All the libraries
 */
const moment = require('moment')
const express = require('express')
const turbolinks = require('turbolinks-express')
const path = require('path')

/**
 * My own libraries
 */
const Membres = require('./modules/membres')
const Actualites = require('./modules/actualites')
const Resultats = require('./modules/resultats')

/**
 * Setup the express lib
 */
const app = express()
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

/**
 * Load custom pages and members from google
 */
Actualites.loadActualites()
Membres.loadMembres()
Resultats.loadResultats()

/**
 * Pages
 */
app.get("/", function(req, res){
    res.render("partials/layout", {body: "index"})
})
app.get("/actualites", function(req, res){
    Actualites.getActualites(req, res)
})
app.get("/actualite", function(req, res){
    Actualites.getPage(req, res)
})
app.get("/lineup", function(req, res){
    Membres.getPage(req, res)
})
app.get("/resultats", function(req, res){
    Resultats.getPage(req, res)
})
app.get("/aboutus", function(req, res){
    res.render("partials/layout", {body: "aboutus"})
})
app.get("/stream", function(req, res){
    res.render("partials/layout", {body: "stream"})
})
app.get("/recrutement", function(req, res){
    res.render("partials/layout", {body: "recrutement"})
})

/**
 * Lien utiles
 */
app.get("/update", function(req, res){
    if(req.query.key != process.env.UPDATE_KEY) return res.end()

    switch(req.query.module){
        case "membres":
            Membres.loadMembres()
            break
        case "resultats":
            Resultats.loadResultats()
            break
        case "actualites":
            Actualites.loadActualites()
            break
        case "all":
            Membres.loadMembres()
            Resultats.loadResultats()
            Actualites.loadActualites()
            break
        default:
            return res.end()
    }

    console.log(`Requete update ${req.query.module} ok !`)
    res.send(`Requete update ${req.query.module} ok !`)
})
app.get("/planning", function(req, res){
    res.sendFile(path.resolve("../../Shared/planning.png"))
})
app.get("/error", function(req, res){
    res.render("partials/layout", {body: "error"})
})

/**
 * Start server
 */
app.use(express.static("public"))
app.use(function (req, res){
	res.status(404)
    res.redirect("error")
})
app.use(turbolinks.redirect)
app.use(turbolinks.location)
app.listen(1248, function(){
    console.log("Serveur démarré sur le port 1248!")
})

/**
 * Add date to console.log
 */
const basicConsole = console.log
console.log = function(){
    const date = `[${moment(new Date()).format("DD/MM/yyyy - HH:mm:ss")}]`
    Array.prototype.unshift.call(arguments, date)
    basicConsole.apply(this, arguments)
}
