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
    new Membre("Shuku", new Array("Co-Président"), "https://cdn.discordapp.com/attachments/788647635779059733/815683371392565278/51V8QGKL_400x400.png",
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
    new Membre("Gazalhi", new Array("Community Manager"), "https://pbs.twimg.com/profile_images/1277300545577979905/oHaP1uae.jpg",
        "https://twitter.com/Hg1er", null, null, null
    ),
)
const joueurs = new Array(
    new Membre("Aaron", new Array("Joueur"), null,
        null, null, null, null
    ),
    new Membre("Crazy Genius", new Array("Joueur"), "https://pbs.twimg.com/profile_images/1354444895872831489/_Ttc0_Mz.jpg",
        "https://twitter.com/CrazyGeniusTV", null, null, "https://www.twitch.tv/crazygeniustv"
    ),
    new Membre("Strelok", new Array("Joueur"), "https://pbs.twimg.com/profile_images/1351477080765190148/jhXspoiq.jpg",
        "https://twitter.com/StrelokTms", null, null, null
    ),
    new Membre("ACKK", new Array("Joueur"), null,
        "https://twitter.com/tftackk", null, null, null
    ),
    new Membre("Frobei", new Array("Joueur"), "https://pbs.twimg.com/profile_images/1254013846337007616/Z9KM3ITo.jpg",
        "https://twitter.com/FrobeiF", null, null, "https://www.twitch.tv/frobei"
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
    new Membre("Verigular", new Array("Streamer", "Joueur"), "https://pbs.twimg.com/profile_images/1287935665557196800/m1JwAGu2.jpg",
        "https://twitter.com/verigular", null, null, null
    ),
    new Membre("Zel", new Array("Joueur"), "https://pbs.twimg.com/profile_images/1311224786543050753/ZyiMstNK.jpg",
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