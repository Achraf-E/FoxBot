const fs = require("fs");

module.exports = async (bot) => {

    fs.readdirSync("./src/Events").filter(file => file.endsWith(".js")).forEach(async file => {
        
        let event = require(`../Events/${file}`);

        bot.on(file.split(".js").join(""), event.bind(null, bot));
        console.log(`Event loaded : ${file}`);

    });
}