const Discord = require("discord.js");
const { name, options } = require("./warn");

module.exports = {
    name : "warnlist",
    description : "Affiche la liste des personnes wanrs, et combien",
    permission : Discord.PermissionFlagsBits.ModerateMembers,
    dm : false,
    category : "Informations",
    
    async run(bot, interaction, options , db){
        db.query(`SELECT GROUP_CONCAT(DISTINCT warner) AS warners, count(*) AS count FROM warns GROUP BY warned`, function (err, result, fields){
            console.log(result);
        });
    }
}