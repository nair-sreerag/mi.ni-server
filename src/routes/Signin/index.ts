import { Router, Request, Response } from 'express'

const signin = Router()



signin.post("/signin", function (req: Request, res: Response) {
    console.log("in /signin")
    let body = req.body

    try {
        body = typeof body === "string" ? JSON.parse(body) : body
    }
    catch (err) {
        res.status(400).json({ error: "Invalid data received. Please try signing again." })
    }

    if (body.username && body.password) {

        userModel.findOne({
            username: body.username,
            password: body.password
        }, function (error, userDocument) {

            console.log('document :', userDocument);

            if (error) {
                res.status(400).json({ error })
            }

            if (userDocument) {
                res.status(200).json({ authtoken: encrypt(userDocument.username, userDocument.password) })
            }
            else {

                res.status(404).json({ error: "Username or password is invalid. Please provide valid credentials and try again." })
            }
        })
    }
    else {
        res.status(400).json({ error: "Please send both the username and password." })
    }

})



module.exports = signin
