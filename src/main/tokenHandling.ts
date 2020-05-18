import { sign, verify, decode } from 'jsonwebtoken';
import { expirationTimeInDays, jwtSigningKey } from '../config.json'
import { DecodedPayloadObjectInterface } from '../types'

let helpers = {

    encrypt: function (username: string, password: string): string {

        return sign({ data: { username, password } }, jwtSigningKey, {
            expiresIn: expirationTimeInDays,
        })
    },

    verify: function (token: string): DecodedPayloadObjectInterface{

        return <DecodedPayloadObjectInterface>verify(token, jwtSigningKey)
},

    decrypt: function (token: string) {
        return decode(token)
    }

}

export = helpers