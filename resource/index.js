'use strict';

const { initialize_config } = require("./config");
const { initialize_pgsql } = require("./pgql");

module.exports.initialize_resource = async () => {
    const config = initialize_config();
    const pgsql = await initialize_pgsql(config);

    return {
        config,
        pgsql,
    }
}