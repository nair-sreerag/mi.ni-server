import { Router, Request, Response } from 'express'

const signup = Router()


signup.post("/signup", function (req: Request, res: Response) {

    console.log('request.body in /signup:', req.body);

    let body = req.body

    try {
        body = typeof body === "string" ? JSON.parse(body) : body
    }
    catch (err) {
        res.status(400).json({ error: "Invalid data received. Please try signing again." })
    }

    if (body.fname && body.username && body.lname && body.email && body.password) {

        let newUser = new userModel();

        newUser.username = body.username;
        newUser.fname = body.fname;
        newUser.lname = body.lname;
        newUser.email = body.email;
        newUser.password = hashPassword(body.password);

        newUser.save(function (error, newUserDocument) {

            console.log('err,document :', error, newUserDocument);

            if (error) {

                res.status(500).json({ error })

            }
            else {
                //201 - content created
                // response.status(201).json({ message: "User created successfully - > " + JSON.stringify(newUserDocument) })
                res.status(201).json({ message: "User created successfully - > " + JSON.stringify(newUserDocument), redirect: "/dashboard", authtoken: encrypt(newUserDocument.username, newUserDocument.password) })
            }

        })
    }
    else {
        //400 - Bad request
        res.status(400).json({ error: "Please provide all the values." })

    }
})


module.exports = signup