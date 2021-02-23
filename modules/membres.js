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
        null, null, null, null
    ),
    new Membre("Shuku", new Array("Co-Président"), null,
        null, null, null, null
    ),
    new Membre("Konogan", new Array("Manager TFT", "Streamer", "Joueur"), null,
        null, null, null, null
    ),
    new Membre("Wazzy", new Array("Manager Stream", "Streamer"), null,
        null, null, null, null
    ),
    new Membre("Floliroy", new Array("Graphiste", "Web Dev", "Streamer", "Joueur"), `./images/floliroy.png`,
        "https://twitter.com/Floliroy", "https://www.facebook.com/floliroyjenkins", null, "https://www.twitch.tv/floleeroyj"
    ),
    new Membre("Cripito", new Array("Orga Event"), null,
        null, null, null, null
    ),
    new Membre("Nairod", new Array("Orga Event", "Joueur"), null,
        null, null, null, null
    ),
    new Membre("Gazalhi", new Array("Community Manager"), null,
        null, null, null, null
    ),
)
const joueurs = new Array(
    new Membre("Aaron", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Crazy Genius", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Strelok", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("ACKK", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Frobei", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Martin", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Rakluuhr", new Array("Streamer", "Joueur"), null,
        null, null, null, null
    ),
    new Membre("Ronflex", new Array("Streamer", "Joueur"), null,
        null, null, null, null
    ),
    new Membre("Sirutop", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Tragoedia", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Verigular", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Zel", new Array("Streamer", "Joueur"), null,
        null, null, null, null
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