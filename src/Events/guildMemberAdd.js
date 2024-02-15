const Discord = require("discord.js");

module.exports = async(bot,config,  member) => {
        member.roles.add(config.default_role);
}