'use strict'

const routes = require("./routes")

module.exports = class rest {
    routes

    constructor(controller, validator) {
        this.routes = new routes(controller, validator)
    }

    register = (app) => {
        this.routes.register(app)
    }
}