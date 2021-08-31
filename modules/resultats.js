const {GoogleSpreadsheet} = require('google-spreadsheet')
const doc = new GoogleSpreadsheet("13wCb_CkEhjR3OLw9aSE7sKnd2PROfogFSi3Mg8ombOE")
doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_EMAIL,
    private_key: process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n')
})

let resultats = new Array()
module.exports = class Resultats{
 
    static async loadResultats(){
        resultats = new Array()
        await doc.loadInfo()
        const sheet = doc.sheetsById["0"]
        const rows = await sheet.getRows()
        for(const row of rows){
            let joueur = row.Joueur
            let duo
            if(joueur.includes("(w/ ")){
                const regex = /([^\(w\/]*)\(w\/([^\)]*)/
                joueur = joueur.replace(regex, "$1").replace(" )", "")
                duo = RegExp.$2
            }

            resultats.push({
                date: row.Date,
                tournoi: row.Tournoi,
                majeur: row["Tournoi Majeur"] == "TRUE" ? "🔥" : "",
                top: row.Top,
                joueur: joueur,
                duo: duo
            })
        }
    }

    static async getPage(req, res){
        res.render("partials/layout", {body: "resultats",
            resultats: resultats
        })
    }
}