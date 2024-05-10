'use strict';

const { DataTypes } = require('sequelize');

const Db = class {
    account_book
    account_type
    journal_entry
    journal_entry_item

    account_balance_sheet
    book_balance

    constructor(pgsql) {
        this.account_book = require('./account_book')(pgsql, DataTypes)
        this.account_type = require('./account_type')(pgsql, DataTypes)
        this.journal_entry = require('./journal_entry')(pgsql, DataTypes)
        this.journal_entry_item = require('./journal_entry_item')(pgsql, DataTypes)
        this.account_balance_sheet = require('./account_balance_sheet')(pgsql, DataTypes)
        this.book_balance = require('./book_balance')(pgsql, DataTypes)

        this.journal_entry.associate(pgsql.models)
        this.journal_entry_item.associate(pgsql.models)
    }
}

module.exports.initialize_model = (pgsql) => {
    module.exports.db = new Db(pgsql)
}