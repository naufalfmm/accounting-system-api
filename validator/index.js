'use strict'

module.exports = class validator {
    account_book
    account_type
    journal_entry

    constructor(account_book, account_type, journal_entry) {
        this.account_book = account_book
        this.account_type = account_type
        this.journal_entry = journal_entry
    }
}