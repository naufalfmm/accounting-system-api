'use strict'

const rest = require("./rest")

module.exports = class infrastructure {
    rest

    constructor(controller, validator) {
        this.rest = new rest(controller, validator)
    }

    register = (app) => {
        this.rest.register(app)
    }
}