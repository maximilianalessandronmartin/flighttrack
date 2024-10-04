// dotenv-config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    mbFile: process.env.MB_FILE,
    airportsFile: process.env.AIRPORTS_FILE,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    DB: process.env.DB_NAME,
};