class Membre{
    constructor(pseudo, roles, image, twitter, facebook, instagram, twitch){
        this.pseudo = pseudo
        this.roles = roles
        this.image = image
        this.twitter = twitter
        this.facebook = facebook
        this.instagram = instagram
        this.twitch = twitch
    }
}

const admins = new Array(
    new Membre("Zyguan", new Array("Président", "Joueur"), null,
        "https://twitter.com/TZyguan", null, null, null
    ),
    new Membre("Shuku", new Array("Co-Président"), null,
        "https://twitter.com/TMSShuku", null, null, null
    ),
    new Membre("Konogan", new Array("Manager TFT", "Streamer", "Joueur"), null,
        "https://twitter.com/Konogan_", null, null, null
    ),
    new Membre("Wazzy", new Array("Manager Stream", "Streamer"), null,
        "https://twitter.com/TmsWazzy", null, null, null
    ),
    new Membre("Floliroy", new Array("Graphiste", "Web Dev", "Streamer", "Joueur"), `./images/floliroy.png`,
        "https://twitter.com/Floliroy", "https://www.facebook.com/floliroyjenkins", null, "https://www.twitch.tv/floleeroyj"
    ),
    new Membre("Cripito", new Array("Orga Event"), null,
        "https://twitter.com/cripito_", null, null, null
    ),
    new Membre("Nairod", new Array("Orga Event", "Joueur"), null,
        "https://twitter.com/NairodTV", null, null, null
    ),
    new Membre("Gazalhi", new Array("Community Manager"), null,
        "https://twitter.com/Hg1er", null, null, null
    ),
)
const joueurs = new Array(
    new Membre("Aaron", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Crazy Genius", new Array("Joueur"), null,
        "https://twitter.com/CrazyGeniusTV", null, null, "https://www.twitch.tv/crazygeniustv"
    ),
    new Membre("Strelok", new Array("Joueur"), null,
        "https://twitter.com/StrelokTms", null, null, null
    ),
    new Membre("ACKK", new Array("Joueur"), null,
        "https://twitter.com/tftackk", null, null, null
    ),
    new Membre("Frobei", new Array("Joueur"), null,
        "https://twitter.com/FrobeiF", null, null, null
    ),
    new Membre("Martin", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Rakluuhr", new Array("Streamer", "Joueur"), null,
        "https://twitter.com/Rakluuhr", null, null, null
    ),
    new Membre("Ronflex", new Array("Streamer", "Joueur"), null,
        "https://twitter.com/JOOOOOOORDY_", null, null, null
    ),
    new Membre("Sirutop", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Shacovid", new Array("Joueur"), null,
        "https://twitter.com/shacovid", null, null, null
    ),
    new Membre("Tragoedia", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Verigular", new Array("Joueur"), null,
        "https://twitter.com/verigular", null, null, null
    ),
    new Membre("Zel", new Array("Streamer", "Joueur"), null,
        "https://twitter.com/TMSZel", null, null, null
    ),
)

module.exports = class Membres{

    static getPage(req, res){
        console.log(`${req.headers["x-forwarded-for"] || req.connection.remoteAddress} asked for membres`)
        res.render("partials/layout", {body: "membres",
            admins: admins,
            joueurs: joueurs,
            fs: require('fs'),
            __dirname: __dirname
        })
    }

}