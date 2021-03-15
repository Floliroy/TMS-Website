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
        this.roles = new Array()
        this.image = null
        this.twitter = null
        this.facebook = null
        this.instagram = null
        this.twitch = null
    }
}


module.exports = class Membres{

    static async getPage(req, res){
        console.log(`${req.headers["x-forwarded-for"] || req.connection.remoteAddress} asked for membres`)

        const admins = new Array()
        const joueurs = new Array()
        
        const sheet = doc.sheetsById["0"]
        const rows = await sheet.getRows()
        for await(let row of rows){
            let membre = new Membre(row.Pseudo)
            for(let i=1 ; i<=4 ; i++){
                if(row[`Role ${i}`]){
                    membre.roles.push(row[`Role ${i}`])
                }
            }
            if(row.Image) membre.image = row.Image
            if(row.Twitter) membre.twitter = row.Twitter
            if(row.Facebook) membre.facebook = row.Facebook
            if(row.Twitch) membre.twitch = row.Twitch
            if(row.Instagram) membre.instagram = row.Instagram
            
            if(row.Staff == "TRUE"){
                admins.push(membre)
            }else{
                joueurs.push(membre)
            }
        }

        res.render("partials/layout", {body: "membres",
            admins: admins,
            joueurs: joueurs,
            fs: require('fs'),
            __dirname: __dirname
        })
    }

}