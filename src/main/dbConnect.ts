import { createConnection, Mongoose, connect } from 'mongoose'

import { mongoConfig } from '../config.json'

export class MongoConnection {

    private static dbHandle: Mongoose;

    public static async initializeAndSetHandle() {

        try {

            if (this.dbHandle) {
                return this.dbHandle
            }

            console.log(`DBHandle not found. Creating a new connection.`)

            this.dbHandle = await connect(mongoConfig.testConnectionURL, mongoConfig.options)
            return this.dbHandle

        }
        catch (err) {
            console.log(err.message || JSON.stringify(err))
        }

    }

}




