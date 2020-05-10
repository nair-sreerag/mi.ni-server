import { sign, verify, decode } from 'jsonwebtoken';
import { expirationTimeInDays, jwtSigningKey } from '../config.json'



module.exports = {

    encrypt: function (username: string, password: string) {

        return sign({ data: { username, password } }, jwtSigningKey, {
            expiresIn: expirationTimeInDays,
        })
    },

    verify: function (token: string) {

        return verify(token, jwtSigningKey)
    },

    decrypt: function (token: string) {
        return decode(token)
    }

}