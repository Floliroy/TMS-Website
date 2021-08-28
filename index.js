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
const Pages = require('./modules/pages')

/**
 * Setup the express lib
 */
const app = express()
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

/**
 * Load custom pages and members from google
 */
Pages.loadPages()
Membres.loadMembres()

/**
 * Pages
 */
app.get("/", function(req, res){
    res.render("partials/layout", {body: "index"})
})
app.get("/actualites", function(req, res){
    Pages.getPage("Actualités", req, res)
})
app.get("/lineup", function(req, res){
    Membres.getPage(req, res)
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
app.get("/update", function(req, res){ //TODO: Changer lien (clé ? post?)
    console.log("Mise a jour des données...")
    Pages.loadPages()
    Membres.loadMembres()
    res.end()
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
    console.log("Server running on port 1248!")
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
