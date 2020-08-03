const MongoClient = require("mongodb").MongoClient;
const makeApp = require("./app");

// Constants
const PORT = process.env.PORT || 8080;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const HOST = "0.0.0.0";

const dbUrl = `mongodb://${DB_HOST}:${DB_PORT}`;
const client = new MongoClient(dbUrl);

setTimeout(function () {
    client.connect(function (err) {
        if (err) {
            console.log("Can't connect to the db " + dbUrl);
            return;
        }

        const app = makeApp(client);
        app.listen(PORT, HOST);
        console.log(`Running on http://${HOST}:${PORT}`);
    });
}, 10000);
