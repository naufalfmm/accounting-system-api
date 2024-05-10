'use strict';

const { config } = require("dotenv");

module.exports.initialize_config = () => {
    config();

    return {
        name: process.env.NAME,
        port: process.env.PORT,
        db_host: process.env.DB_HOST,
        db_port: process.env.DB_PORT,
        db_username: process.env.DB_USERNAME,
        db_password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME,
        db_idle_connection: parseInt(process.env.DB_MAX_IDLE_CONNECTION),
        db_open_connection: parseInt(process.env.DB_MAX_OPEN_CONNECTION),
        db_connection_max_life_time: parseInt(process.env.DB_CONNECTION_MAX_LIFE_TIME),
        db_log_mode: process.env.DB_LOG_MODE
    }
}