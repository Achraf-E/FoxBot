const mysql = require("mysql");

module.exports = async () => {

    var db =  mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    db.query("CREATE DATABASE IF NOT EXISTS FoxBot");
    db.changeUser({database : "FoxBot"});

    db.query("CREATE TABLE IF NOT EXISTS warns (id SERIAL NOT NULL , warned VARCHAR(100) NOT NULL , warner VARCHAR(100) NOT NULL , reason VARCHAR(1000) )");

    return db;

}