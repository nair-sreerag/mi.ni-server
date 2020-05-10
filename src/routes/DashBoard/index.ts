import { Router, Request, Response } from 'express'

const dashboard = Router()

dashboard.get("/dashboard", function (req: Request, res: Response) {

    console.log("TCL: res.locals", res.locals.userDocument)
    if (res.locals.userDocument) {

        //fetch saved user links and 
        // user info and redirect to dashboard

        let userDocument = res.locals.userDocument

        linkModel.find({
            created_by: userDocument._id
        }, function (error, linkDocsArray) {

            let objToSendToDashBoard = {
                userDocument,
                _linksArray: linkDocsArray
            }

            res.status(200).json({ data: objToSendToDashBoard })

        })

    }
    else {
        res.status(403).redirect("/")
    }

})


module.exports = dashboard