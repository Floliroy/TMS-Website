const { google } = require("googleapis")
const scopes = ["https://www.googleapis.com/auth/documents.readonly"]
const docs = google.docs({version: "v1"})
const jwt = new google.auth.JWT(process.env.GOOGLE_EMAIL, null, process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n'), scopes)

let pages = new Map()
const ids = new Map()
ids.set("Actualités", "1khD6yWfKJrdSU0B--C_W0vh02ZPefF5a1ZhB_BJ3nzk")

module.exports = class Pages{

    static async loadPages(){
        pages = new Map()

        for(const [titre, id] of ids){
            const docResponse = await docs.documents.get({
                auth: jwt,
                documentId: id,
            })
            pages.set(titre, docResponse.data)
        }
    }


    static async getPage(titre, req, res){
        const data = pages.get(titre)

        res.render("partials/layout", {body: "unparse",
            titre: titre,
            content: data.body.content,
            images: data.inlineObjects,
            lists: data.lists
        })
    }

}