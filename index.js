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
 * Pages
 */
function getPage(page, req, res){
    if(page != "error"){
        console.log(`${req.headers["x-forwarded-for"] || req.connection.remoteAddress} asked for ${page}`)
    }

    res.render("partials/layout", {body: page})
}

app.get("/", function(req, res){
    getPage("index", req, res)
})
app.get("/actualites", function(req, res){
    Pages.getPage("1khD6yWfKJrdSU0B--C_W0vh02ZPefF5a1ZhB_BJ3nzk", "Actualités", req, res)
    //getPage("actualites", req, res)
})
app.get("/lineup", function(req, res){
    Membres.getPage(req, res)
})
app.get("/aboutus", function(req, res){
    getPage("aboutus", req, res)
})
app.get("/stream", function(req, res){
    getPage("stream", req, res)
})
app.get("/recrutement", function(req, res){
    getPage("recrutement", req, res)
})


app.get("/planning", function(req, res){
    res.sendFile(path.resolve("../../Shared/planning.png"))
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
