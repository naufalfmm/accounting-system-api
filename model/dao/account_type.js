'use strict';

const dayjs = require("dayjs");
const { root_type } = require("../../const/const");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'AccountType',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            code: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            root_type: {
                allowNull: false,
                type: DataTypes.ENUM(root_type.all),
                set(value) {
                    this.setDataValue('root_type', value)
                    if (value == 'ASSETS' || value == 'EXPENSES') {
                        this.setDataValue('debit_sign', 1)
                        this.setDataValue('credit_sign', -1)
                    } else {
                        this.setDataValue('debit_sign', -1)
                        this.setDataValue('credit_sign', 1)
                    }
                }
            },
            debit_sign: {
                allowNull: false,
                type: DataTypes.SMALLINT,
                validate: {
                    isIn: [[-1, 1]]
                },
            },
            credit_sign: {
                allowNull: false,
                type: DataTypes.SMALLINT,
                validate: {
                    isIn: [[-1, 1]]
                },
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: dayjs(),
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: dayjs(),
            },
        },
        {
            tableName: 'account_types',
            timestamps: false
        }
    )
}