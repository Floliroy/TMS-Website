const {GoogleSpreadsheet} = require('google-spreadsheet')
const doc = new GoogleSpreadsheet("1-KT7shMmCYlOuEYBcJWVeZSt2PZv7UyXASh5V5-VZkE")
doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_EMAIL,
    private_key: process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n')
})

const { google } = require("googleapis")
const scopes = ["https://www.googleapis.com/auth/documents.readonly"]
const docs = google.docs({version: "v1"})
const jwt = new google.auth.JWT(process.env.GOOGLE_EMAIL, null, process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n'), scopes)

let pages = new Map()
let listeActualites = new Array()

module.exports = class Actualites{

    static async loadActualites(){
        listeActualites = new Array()
        pages = new Map()

        await doc.loadInfo()
        const sheet = doc.sheetsById["0"]
        const rows = await sheet.getRows()
        for (const row of rows){
            if(row.DocId){
                const docResponse = await docs.documents.get({
                    auth: jwt,
                    documentId: row.DocId,
                })
                pages.set(row.Lien, {data: docResponse.data, titre: row.Titre})
            }

            listeActualites.push({
                date: row.Date,
                titre: row.Titre,
                resume: row.Resume,
                image: row.Image,
                lien: row.Lien
            })
        }
    }

    static async getPage(req, res){

        if(req.query.actu && pages.get(req.query.actu)){
            const page = pages.get(req.query.actu)

            res.render("partials/layout", {body: "unparse",
                titre: page.titre,
                content: page.data.body.content,
                images: page.data.inlineObjects,
                lists: page.data.lists
            })
        }else{
            res.redirect("actualites")
        }

    }

    static async getActualites(req, res){
        res.render("partials/layout", {body: "actualites",
            actualites: listeActualites
        })
    }

}