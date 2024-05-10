'use strict';

const dayjs = require("dayjs");

module.exports = (sequelize, DataTypes) => {
    const journal_entry_item =  sequelize.define(
        'JournalEntryItem',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.BIGINT,
            },
            journal_entry_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            account_type_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            notes: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            debit: {
                allowNull: false,
                type: DataTypes.DECIMAL(20,5),
                validate: {
                    min: 0
                }
            },
            credit: {
                allowNull: false,
                type: DataTypes.FLOAT,
                validate: {
                    min: 0
                }
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
            tableName: 'journal_entry_items',
            timestamps: false
        }
    )

    journal_entry_item.associate = (models) => {
        journal_entry_item.belongsTo(models.JournalEntry, {
            foreignKey: 'journal_entry_id',
            as: 'journal_entry'
        })

        journal_entry_item.belongsTo(models.AccountType, {
            foreignKey: 'account_type_id',
            as: 'account_type'
        })
    }

    return journal_entry_item
}