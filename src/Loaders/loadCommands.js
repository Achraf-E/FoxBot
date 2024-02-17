const fs = require("fs");

module.exports = async (bot) => {

    fs.readdirSync("./Commands").filter(file => file.endsWith(".js")).forEach(async file => {

        let command = require(`../Commands/${file}`);
        if(!command.name || typeof command.name !== "string"){
            throw new TypeError(`Command name error on : ${file}`);
        }
        bot.commands.set(command.name, command);
        console.log(`Command loaded : ${file}`);
    });
}