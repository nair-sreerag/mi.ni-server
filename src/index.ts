import express, { Request, Response, Express, NextFunction } from 'express';
import { PORT } from './config.json'
import { MongoConnection } from './main/dbConnect'
import {
    DashBoardRoute,
    PingRoute,
    ShortenRoute,
    SigninRoute,
    SignupRoute
} from './routes'

import { UserModelInterface, DecodedPayloadObjectInterface } from './types'
import { verify } from './main/tokenHandling';
const { loadModule } = require("mi.ni-models")

const App: Express = express();

const userModel = loadModule("user")

App.use("/", PingRoute)
App.use("/", SignupRoute)
App.use("/", SigninRoute)
App.use("/", userAuthValidatorMiddleware, ShortenRoute)
App.use("/", userAuthExistenceCheckerMiddleware, userAuthValidatorMiddleware, DashBoardRoute)



App.use("/:hash", function (req: Request, res: Response) {

    let h = req.param.hash

    cacheOperationObject.getKey(h)
        .then(originalURL => {
            res.status(302).redirect(originalURL)
        })
        .catch(error => {
            res.status(500).json({ error })
        })

})

App.get("*", function (req: Request, res: Response) {
    res.status(404).json({ error: "Oops! You seem to have hit a dead end..." })
})

App.post("*", function (req: Request, res: Response) {
    res.status(404).json({ error: "Oops! You seem to have hit a dead end..." })
})


App.listen(PORT, function () {
    console.log(`mi.ni server listening on port ${PORT}`)

    if (!global.mongoHandle) {
        console.log("Setting global handle.")
        global.mongoHandle = MongoConnection.initializeAndSetHandle()
    }
})


function userAuthExistenceCheckerMiddleware(req: Request, res: Response, next: NextFunction) {

    let headers = req.headers

    if (headers.authorization && headers.authorization.split(" ")[1]) {
        next()
    }
    else {
        res.status(302).json({ error: "You are trying to access a protected route and seem to lack a token." })
    }
}



function userAuthValidatorMiddleware(req: Request, res: Response, next: NextFunction) {

    let headers = req.headers

    if (!headers.authorization) {
        console.log("inherer")
        res.locals.userDocument = null
        return next()
    }


    let decodedJWTToken: DecodedPayloadObjectInterface = verify(headers.authorization.split(" ")[1]);

    let username = decodedJWTToken.data.username
    console.log("TCL: userAuthValidatorMiddleware -> username", username)
    let password = decodedJWTToken.data.password
    console.log("TCL: userAuthValidatorMiddleware -> password", password)


    if (decodedJWTToken.exp < Date.now()) { }
    else {
        res.status(403).json({ error: "Please login again." })
    }



    userModel.findOne({
        username,
        password
    },
        "fname lname email username")
        .then((userDocument: UserModelInterface) => {

            console.log("TCL: userAuthValidatorMiddleware -> userDocument", userDocument)
            if (userDocument) {
                res.locals.userDocument = userDocument
                next()
            }
            else {
                res.locals.userDocument = null
                next()
            }

        })
        .catch((error: any) => {
            res.status(400).json({ error })
        })


}