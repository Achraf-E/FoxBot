const { error } = require("console");
const fs = require("fs");

module.exports = async bot => {

    fs.readdirSync("./Events").filter(file => file.endsWith(".js")).forEach(async file => {
        
        let command = require(`../Events/${file}`);

    });
}