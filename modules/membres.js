const {GoogleSpreadsheet} = require('google-spreadsheet')
const doc = new GoogleSpreadsheet("15soO9myOe0mOV9uhvr-lM2PsEow74KRRDS4l4FhL7PQ")
doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_EMAIL,
    private_key: process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n')
})
doc.loadInfo()

class Membre{
    constructor(pseudo){
        this.pseudo = pseudo
        this.tft = false
        this.valo = false
        this.rl = false
        this.lol = false
        this.roles = new Array()
        this.image = null
        this.twitter = null
        this.facebook = null
        this.instagram = null
        this.twitch = null
    }
}

const mapTitres = new Map()
mapTitres.set("staff", "Le Staff")
mapTitres.set("tft", "TeamFight Tactics")
mapTitres.set("valo", "Valorant")
mapTitres.set("rl", "Rocket League")
mapTitres.set("lol", "League of Legends")

module.exports = class Membres{

    static async getPage(req, res){
        console.log(`${req.headers["x-forwarded-for"] || req.connection.remoteAddress} asked for lineup ${req.query.lineup}`)

        const admins = new Array()
        const joueurs = new Array()

        const sheet = doc.sheetsById["0"]
        const rows = await sheet.getRows()
        for await(let row of rows){
            let membre = new Membre(row.Pseudo)

            membre.tft = row.TFT == "TRUE"
            membre.valo = row.Valo == "TRUE"
            membre.rl = row.RL == "TRUE"
            membre.lol = row.LoL == "TRUE"

            for(let i=1 ; i<=3 ; i++){
                if(row[`Role ${i}`]){
                    membre.roles.push(row[`Role ${i}`])
                }
            }
            
            if(row.Image) membre.image = row.Image
            if(row.Twitter) membre.twitter = row.Twitter
            if(row.Facebook) membre.facebook = row.Facebook
            if(row.Twitch) membre.twitch = row.Twitch
            if(row.Instagram) membre.instagram = row.Instagram
            
            joueurs.push(membre)
            if(row.Staff == "TRUE"){
                admins.push(membre)
            }
        }

        joueurs.sort((a,b) => (a.pseudo > b.pseudo) ? 1 : ((b.pseudo > a.pseudo) ? -1 : 0))

        res.render("partials/layout", {body: "lineup",
            lineup: req.query.lineup,
            titre: mapTitres.get(req.query.lineup),
            players: req.query.lineup == "staff" ? admins : joueurs,
            fs: require('fs'),
            __dirname: __dirname
        })
    }

}