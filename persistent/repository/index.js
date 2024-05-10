'use strict'

module.exports = class repository {
    account_book
    account_type
    journal_entry
    journal_entry_item
    account_balance_sheet
    book_balance

    constructor(account_book, account_type, journal_entry, journal_entry_item, account_balance_sheet, book_balance) {
        this.account_book = account_book
        this.account_type = account_type
        this.journal_entry = journal_entry
        this.journal_entry_item = journal_entry_item
        this.account_balance_sheet = account_balance_sheet
        this.book_balance = book_balance
    }
}