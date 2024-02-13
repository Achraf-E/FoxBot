const Discord = require("discord.js");
const { name, options } = require("./warn");

module.exports = {
    name : "warnlist",
    description : "Affiche la liste des personnes wanrs, et combien",
    permission : Discord.PermissionFlagsBits.ModerateMembers,
    dm : false,
    category : "Informations",
    
    async run(bot, interaction, options , db){
        //Create the embed
        let embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setAuthor({ name : bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
        .setTitle(`Liste des warnings dans  ${interaction.guild.name} : `)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
                    
        await db.query(`SELECT warned, GROUP_CONCAT(DISTINCT warner) AS warners, count(*) AS count FROM warns GROUP BY warned` , function (err, result, fields){
            for(warned of result){
                embed.addFields({name : `${warned.warned}`, value : `Modos ayants warn : ${warned.warners}, nombre de warns total : ${warned.count}`});
            }
            return interaction.reply({embeds: [embed], ephemeral:true});
        });
    }
}