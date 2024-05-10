'use strict'

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const account_book_repository = require('../persistent/repository/account_book')
const account_type_repository = require('../persistent/repository/account_type')
const journal_entry_repository = require('../persistent/repository/journal_entry')
const journal_entry_item_repository = require('../persistent/repository/journal_entry_item')
const repository = require('../persistent/repository')

const persistent = require('../persistent')

const account_book_usecase = require('../usecase/account_book')
const account_type_usecase = require('../usecase/account_type')
const journal_entry_usecase = require('../usecase/journal_entry')
const usecase = require('../usecase')

const { initialize_resource } = require('../resource');
const { initialize_model } = require('../model/dao');
const account_book_controller = require('../infrastructure/rest/controller/account_book')
const account_type_controller = require('../infrastructure/rest/controller/account_type')
const journal_entry_controller = require('../infrastructure/rest/controller/journal_entry')
const controller = require('../infrastructure/rest/controller')

const validator = require('../validator')
const account_book_validator = require('../validator/account_book')
const account_type_validator = require('../validator/account_type')
const journal_type_validator = require('../validator/journal_entry')
const infrastructure = require('../infrastructure')
const account_balance_sheet_repository = require("../persistent/repository/account_balance_sheet")
const account_balance_sheet_usecase = require("../usecase/account_balance_sheet")
const book_balance_repository = require("../persistent/repository/book_balance")

module.exports.initialize_app = async () => {
    const app = express()

    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const resource = await initialize_resource();

    app.set("port", (resource.config.port || 8080))

    initialize_model(resource.pgsql.sequelize_orm);

    const account_book_repo = new account_book_repository(resource)
    const account_type_repo = new account_type_repository(resource)
    const journal_entry_repo = new journal_entry_repository(resource)
    const journal_entry_item_repo = new journal_entry_item_repository(resource)
    const account_balance_sheet_repo = new account_balance_sheet_repository(resource)
    const book_balance_repo = new book_balance_repository(resource)
    const repo = new repository(account_book_repo, account_type_repo, journal_entry_repo, journal_entry_item_repo, account_balance_sheet_repo, book_balance_repo)

    const persist = new persistent(repo)

    const account_book_usec = new account_book_usecase(persist, resource)
    const account_type_usec = new account_type_usecase(persist, resource)
    const journal_entry_usec = new journal_entry_usecase(persist, resource)
    const account_balance_sheet_usec = new account_balance_sheet_usecase(persist, resource)
    const usec = new usecase(account_book_usec, account_type_usec, journal_entry_usec, account_balance_sheet_usec)

    const account_book_cont = new account_book_controller(usec, resource)
    const account_type_cont = new account_type_controller(usec, resource)
    const journal_entry_cont = new journal_entry_controller(usec, resource)
    const cont = new controller(account_book_cont, account_type_cont, journal_entry_cont)

    const vld = new validator(new account_book_validator(), new account_type_validator(), new journal_type_validator())

    const infr = new infrastructure(cont, vld)

    infr.register(app)

    return app
}