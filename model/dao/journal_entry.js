'use strict';

const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
    const journal_entry =  sequelize.define(
        'JournalEntry',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            account_book_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            code: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            datetime: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING,
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
            tableName: 'journal_entries',
            timestamps: false
        }
    )

    journal_entry.associate = (models) => {
        journal_entry.belongsTo(models.AccountBook, {
            foreignKey: 'account_book_id',
            as: 'account_book'
        })
    }

    return journal_entry
}