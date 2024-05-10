'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'AccountBook',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            description: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            fiscal_start_date: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            fiscal_end_date: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            tableName: 'account_books',
            timestamps: false
        }
    )
}