const fs = require('fs')
class Membre{
    constructor(pseudo, roles){
        this.pseudo = pseudo
        this.roles = roles
    }
}

const admins = new Array(
    new Membre("Zyguan", new Array("Président", "Joueur")),
    new Membre("Shuku", new Array("Co-Président")),
    new Membre("Konogan", new Array("Manager TFT", "Streamer", "Joueur")),
    new Membre("Wazzy", new Array("Manager Stream", "Streamer")),
    new Membre("Floliroy", new Array("Graphiste", "Web Dev", "Streamer", "Joueur")),
    new Membre("Cripito", new Array("Orga Event")),
    new Membre("Nairod", new Array("Orga Event", "Joueur")),
    new Membre("Gazalhi", new Array("Community Manager")),
)
const joueurs = new Array(
    new Membre("Aaron", new Array("Joueur")),
    new Membre("Crazy Genius", new Array("Joueur")),
    new Membre("Strelok", new Array("Joueur")),
    new Membre("ACKK", new Array("Joueur")),
    new Membre("Frobei", new Array("Joueur")),
    new Membre("Martin", new Array("Joueur")),
    new Membre("Rakluuhr", new Array("Streamer", "Joueur")),
    new Membre("Ronflex", new Array("Streamer", "Joueur")),
    new Membre("Sirutop", new Array("Joueur")),
    new Membre("Tragoedia", new Array("Joueur")),
    new Membre("Verigular", new Array("Joueur")),
    new Membre("Zel", new Array("Streamer", "Joueur")),
)

module.exports = class Membres{

    static getPage(req, res){
        console.log(`${req.headers["x-forwarded-for"] || req.connection.remoteAddress} asked for membres`)
        res.render("membres", {layout: "layout",
            admins: admins,
            joueurs: joueurs,
            helpers: {
                getImage: function(name){
                    const path = `${__dirname.replace("modules", "")}public/images/${name.toLowerCase().replace(" ", "")}.png`
                    return fs.existsSync(path) ? `./images/${name.toLowerCase().replace(" ", "")}.png` : "./logo.png"
                }
            }
        })
    }

}