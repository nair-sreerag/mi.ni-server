import { Router, Request, Response } from 'express'

const ping = Router()

//connection checker
ping.get("/ping", function (req: Request, res: Response) {

    console.log('__dirname__ :', __dirname);
    console.log('__dirname__ :', process.cwd());
    // response.sendFile(path.join(__dirname))
    res.json({ token: "SREERAGNAIR" })
    // response.send("YOLO");
})


module.exports = ping