const mysql = require("mysql");

module.exports = async () => {

    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "FoxBot"
    });
}