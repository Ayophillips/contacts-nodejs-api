const fs = require('fs');

const config = {
    port: process.env.PORT || 5001,
    mongodb: {
        uri: process.env.NODE_ENV === 'production'
            ? fs.readFileSync('secrets/mongodb_uri.txt', 'utf8').trim()
            : process.env.CONNECTION_STRING
    },
    jwt: {
        secret: process.env.NODE_ENV === 'production'
            ? fs.readFileSync('secrets/jwt_secret.txt', 'utf8').trim()
            : process.env.ACCESS_TOKEN_SECRET
    }
};

module.exports = config;
