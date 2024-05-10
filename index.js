'use strict'

const { initialize_app } = require("./app");
const { createServer } = require("http");
const { green } = require("cli-color");

initialize_app().then(app => {
    const server = createServer(app)
    server.listen(app.get("port"), () => {
        console.log(green('======================================'));
        console.log(green('SERVER RUNNING ON PORT ' + app.get("port")));
        console.log(green('======================================'));
    })
}).catch(err => {
    throw new Error(err)
})