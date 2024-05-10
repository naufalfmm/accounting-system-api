'use strict';

const { Sequelize } = require('sequelize');
const { preload_orm } = require('./preload');

const pgsql_orm = class {
    sequelize_orm
    trx
    preload

    constructor(sequelize_orm) {
        this.sequelize_orm = sequelize_orm
        this.trx = null
        this.preload = new preload_orm()
    }

    begin = async () => {
        if (this.trx != null) {
            return
        }

        this.trx = await this.sequelize_orm.transaction();
    }

    rollback = async () => {
        if (this.trx == null) {
            return
        }

        await this.trx.rollback()

        this.trx = null
    }

    commit = async () => {
        if (this.trx == null) {
            return
        }

        await this.trx.commit()

        this.trx = null
    }

    get_preloads = () => {
        return this.preload.get(this.sequelize_orm.models)
    }

    orm = () => {
        return this.sequelize_orm
    }
}

module.exports.initialize_pgsql = async (config) => {
    Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat
    Sequelize.DataTypes.postgres.BIGINT.parse = parseInt

    const sequelize = new Sequelize({
        dialect: 'postgres',
        database: config.db_name,
        host: config.db_host,
        port: config.db_port,
        username: config.db_username,
        password: config.db_password,
        pool: {
            max: config.db_max_open_connection,
            idle: config.db_max_idle_connection,
            acquire: config.db_connection_max_life_time
        },
        logQueryParameters: config.db_log_mode
    })

    sequelize.where()

    await sequelize.authenticate()

    return new pgsql_orm(sequelize)
}