const path = require("path");
const jsonServer = require("json-server");
const config = {};

config.createJsonServer = (port, routePath) => {
    const server = jsonServer.create();
    const router = jsonServer.router(routePath);
    const middlewares = jsonServer.defaults();
    server.use(middlewares);
    server.use(router);
    /* eslint-disable prefer-template */
    server.listen(port, () => {
        console.log("JSON Server is running on " + port);
    });
};

module.exports = config;
