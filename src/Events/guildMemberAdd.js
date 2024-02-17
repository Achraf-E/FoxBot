const Discord = require("discord.js");
const config = require("../config.json").official;

module.exports = async(bot,  member) => {
        member.roles.add(config.default_role);
}