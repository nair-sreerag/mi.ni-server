
import { createHmac } from 'crypto'
import { cryptoSecret } from '../config.json'

let helpers = {

    hashPassword: function (plainText: string): string {
        return createHmac('sha256', cryptoSecret)
            .update(plainText)
            .digest("hex")
    }

}

export = helpers