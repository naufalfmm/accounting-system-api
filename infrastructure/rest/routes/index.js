'use strict'

module.exports = class routes {
    controller
    validator

    constructor(controller, validator) {
        this.controller = controller
        this.validator = validator
    }

    register = (app) => {
        app.get("/", (_, res) => {
            return res.status(200).json({
                ok: true,
                data: "success"
            })
        })

        app.post("/books", this.validator.account_book.create_validator(), this.controller.account_book.create)
        app.get("/books/:id/balance", this.controller.account_book.get_balance)
        app.get("/books/:id/entries", this.validator.journal_entry.get_all_entries_book_validator(), this.controller.journal_entry.get_all_entries_book)
        app.get("/books/:id/complete", this.controller.account_book.get_complete_page)

        app.post("/types", this.validator.account_type.create_validator(), this.controller.account_type.create)

        app.post("/journals", this.validator.journal_entry.record_validator(), this.controller.journal_entry.record)
        app.get("/journals/entries", this.validator.journal_entry.get_all_entries_validator(), this.controller.journal_entry.get_all_entries)
    }
}