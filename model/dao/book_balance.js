'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'BookBalance',
        {
            book_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
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
            tableName: 'book_balances',
            timestamps: false
        }
    )
}