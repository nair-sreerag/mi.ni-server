const f = require("fnv-plus");
import { Hasher } from '../types'

var hasher: Hasher = {

    generateHash: function (originalURL: string) {

        let hashedURL: string = f.hash(originalURL, 4).hex()

        console.log('originalURL ->>>> :', originalURL);
        console.log('hashedURL ->>>  :', hashedURL);

        return hashedURL

    }
};



module.exports = hasher;
