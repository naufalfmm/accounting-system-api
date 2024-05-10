'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'account_balance_sheets',
        {
            code: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            root_type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            debit_sign: {
                allowNull: false,
                type: DataTypes.SMALLINT,
            },
            credit_sign: {
                allowNull: false,
                type: DataTypes.SMALLINT,
            },
            debit_total: {
                allowNull: false,
                type: DataTypes.DECIMAL(20,5),
            },
            credit_total: {
                allowNull: false,
                type: DataTypes.DECIMAL(20,5),
            },
        },
        {
            timestamps: false
        }
    )
}