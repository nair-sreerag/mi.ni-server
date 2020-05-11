// import { Router, Request, Response } from 'express'
import * as Express from 'express'

const pingrouter = Express.Router()

//connection checker
pingrouter.get("/ping", function (req: Express.Request, res: Express.Response) {

    console.log('__dirname__ :', __dirname);
    console.log('__dirname__ :', process.cwd());
    // response.sendFile(path.join(__dirname))
    res.json({ token: "SREERAGNAIR" })
    // response.send("YOLO");
})


export = pingrouter