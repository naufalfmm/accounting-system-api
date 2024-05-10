'use strict';

const dotenv = require('dotenv');
const { resolve } = require('path');
const fs = require('fs');

dotenv.config()

if (!process.env.DB_HOST) {
    return
}

const opt = {
    "pg": {
        "driver": "pg",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "user": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
    },
    "sql-file": true
};

fs.writeFileSync(resolve(__dirname, 'database.json'), JSON.stringify(opt, null, 4))

