const { error } = require("console");
const fs = require("fs");
const { config } = require("process");

module.exports = async (bot,config) => {

    fs.readdirSync("./src/Events").filter(file => file.endsWith(".js")).forEach(async file => {
        
        let event = require(`../Events/${file}`);

        bot.on(file.split(".js").join(""), event.bind(null, bot, config));
        console.log(`Event loaded : ${file}`);

    });
}