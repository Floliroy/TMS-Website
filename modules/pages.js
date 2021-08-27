const { google } = require("googleapis")
const scopes = ["https://www.googleapis.com/auth/documents.readonly"]
const docs = google.docs({version: "v1"})
const jwt = new google.auth.JWT(process.env.GOOGLE_EMAIL, null, process.env.GOOGLE_TOKEN.replace(/\\n/g, '\n'), scopes)

module.exports = class Pages{

    static async getPage(documentId, titre, req, res){
        const docResponse = await docs.documents.get({
            auth: jwt,
            documentId: documentId,
        })

        res.render("partials/layout", {body: "unparse",
            titre: titre,
            content: docResponse.data.body.content,
            images: docResponse.data.inlineObjects
        })
    }

}