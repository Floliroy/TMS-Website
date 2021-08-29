const {GoogleSpreadsheet} = require('google-spreadsheet')
const doc = new GoogleSpreadsheet("15soO9myOe0mOV9uhvr-lM2PsEow74KRRDS4l4FhL7PQ")
doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_EMAIL,
    private_key: process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n')
})

class Membre{
    constructor(pseudo){
        this.pseudo = pseudo
        this.roles = new Array()
    }
}

const mapTitres = new Map()
mapTitres.set("staff", "Le Staff")
mapTitres.set("tft", "TeamFight Tactics")
mapTitres.set("valo", "Valorant")
mapTitres.set("rl", "Rocket League")
mapTitres.set("lol", "League of Legends")

let admins = new Array()
let joueurs = new Array()

module.exports = class Membres{

    static async loadMembres(){
        admins = new Array()
        joueurs = new Array()

        await doc.loadInfo()
        const sheet = doc.sheetsById["0"]
        const rows = await sheet.getRows()
        for await(let row of rows){
            let membre = new Membre(row.Pseudo)

            membre.tft = row.TFT == "TRUE"
            membre.valo = row.Valo == "TRUE"
            membre.rl = row.RL == "TRUE"
            membre.lol = row["LoL 1"] == "TRUE" || row["LoL 2"] == "TRUE"
            if(membre.lol){
                membre.nbEquipe = row["LoL 1"] == "TRUE" ? 1 : 2
            }

            membre.roleEquipe = row["Role Equipe"]
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
    }

    static async getPage(req, res){
        const roles = ["Toplane", "Jungle", "Midlane", "ADCarry", "Support"]
        let players = new Array()
        if(req.query.lineup == "lol"){
            for(const role of roles){
                for(const joueur of joueurs){
                    if(joueur.roleEquipe == role){
                        players.push(joueur)
                    }
                }
            }
        }else{
            players = req.query.lineup == "staff" ? admins : joueurs
        }

        res.render("partials/layout", {body: "lineup",
            lineup: req.query.lineup,
            titre: mapTitres.get(req.query.lineup),
            players: players,
            fs: require('fs'),
            __dirname: __dirname
        })
    }

}