import { Router, Response, Request } from 'express'
import { Types } from 'mongoose'

const shorten = Router();
import {
    expiryForUnauthUser,
    expiryForAuthUser,
    baseURL,
    outSideFacingPort
} from '../../config.json'

shorten.post("/shorten", function (req: Request, res: Response) {

    console.log("in /shorten")

    let originalURL = "";
    let userDocument = res.locals.userDocument
    console.log("TCL: userDocument", userDocument)

    if (req.body.originalURL) originalURL = req.body.originalURL
    else res.status(500).json({ error: "Url provided is either invalid or missing." })

    if (userDocument) {

        linkModel.findOneAndUpdate({
            created_by: Types.ObjectId(userDocument._id),
            original_link: originalURL,
            shortened_link: generateHash(originalURL) //computed value goes here.     
        }, {}, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
            .then(async (linkDocument) => {
                console.log("TCL: linkDocument", linkDocument)

                //check redis
                if (await cacheOperationObject.checkKeyExistence(linkDocument.shortened_link)) {
                    res.status(200).json({ shortened_link: baseURL + ":" + outSideFacingPort + "/" + linkDocument.shortened_link, in_cache: true, authenticated: true })
                }
                else {
                    await cacheOperationObject.setKeyWithExpiry(linkDocument.original_link, linkDocument.shortened_link, expiryForAuthUser)
                    res.status(200).json({ shortened_link: baseURL + ":" + outSideFacingPort + "/" + linkDocument.shortened_link, cached_now: true, authenticated: true })
                }

            })
            .catch((error) => {
                console.log("TCL: error", error)
                res.status(500).json({ error: "Some error occured wile fetching linkDoc. Please try again later." })

            })

    }
    else {
        // store it in the temp collection

        new tempLinkModel({
            original_link: originalURL,
            shortened_link: generateHash(originalURL)
        })
            .save(async function (error, tempLinkDoc) {
                if (error) res.status(500).json({ error: "Some error occured while saving the temp link." })

                await cacheOperationObject.setKeyWithExpiry(originalURL, tempLinkDoc.shortened_link, expiryForUnauthUser)
                res.status(200).json({ shortened_link: baseURL + ":" + outSideFacingPort + "/" + tempLinkDoc.shortened_link, type: "unauth" })

            })
    }

})

module.exports = shorten