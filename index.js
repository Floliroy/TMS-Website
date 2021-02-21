/**
 * All the libraries
 */
const moment = require('moment')
const express = require('express')
const Handlebars = require('handlebars')
const handlebars = require('express-handlebars')

/**
 * My own libraries
 */
const Membres = require('./modules/membres')


/**
 * Setup the handlebars lib
 */
const app = express()
app.use(express.urlencoded({extended: true}))
app.set("view engine", "handlebars")
app.engine("handlebars", handlebars({
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
}))

/**
 * Pages
 */
function getPage(page, req, res){
    if(page != "error"){
        console.log(`${req.headers["x-forwarded-for"] || req.connection.remoteAddress} asked for ${page}`)
    }

    res.render(page, {layout: "layout"})
}

app.get("/", function(req, res){
    getPage("index", req, res)
})
app.get("/aboutus", function(req, res){
    getPage("aboutus", req, res)
})
app.get("/membres", function(req, res){
    Membres.getPage(req, res)
})
app.get("/projets", function(req, res){
    getPage("projets", req, res)
})
app.get("/recrutement", function(req, res){
    getPage("recrutement", req, res)
})
app.get("/stream", function(req, res){
    getPage("stream", req, res)
})
app.get("/error", function(req, res){
    getPage("error", req, res)
})

/**
 * Start server
 */
app.use(express.static("public"))
app.use(function (req, res){
	res.status(404)
    res.redirect("error")
})
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