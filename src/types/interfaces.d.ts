export interface Hasher {
    generateHash: (s: string) => string
}

export interface LinkModelInterface {
    "created_by": string,
    "original_link": string,
    "shortened_link": string,
    "hits": string,
    "created_on": Date
}


export interface TempLinkModelInterface {
    "original_link": string,
    "shortened_link": string,
    "hits": number,
    "created_on": Date,
    "ttl": Date,

}

export interface UserModelInterface {
    "fname": string,
    "lname": string,
    "email": string,
    "username": string,
    "password": string,
    "created_on": Date,

}

export interface DecodedPayloadObjectInterface {
    "exp": number | Date,
    "data": data
}

interface data {
    "username": string,
    "password": string
}


// export interface DecodedPayloadStringInterface : string