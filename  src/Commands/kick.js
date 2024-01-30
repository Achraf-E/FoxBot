const discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "kick un membre du serveur",
    permission: discord.PermissionFlagsBits.KickMembers,
    dm : false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "membre à kick",
            required: true
        },
        {
            type: "string",
            name: "raison",
            description: "raison du kick",
            required: true
        }
    ],

    async run(bot, interaction, options){ 

        interaction.guild.members.fetch(options.get("membre")).then(async member => {
                        //Test if the person can kick
                        if(member.roles.highest.comparePositionTo(interaction.member.roles.highest) > -1){
                            interaction.guild.channels.cache.get("1130483351199961219").send(` \`${interaction.user.username}\` a essayé de kick \`${member.user.username}\` mais n'en a pas les droits.`);
                            return interaction.reply(`Vous ne pouvez kick \`${member.user.username}\`, les logs on été envoyé dans le channel des moderateurs`);
                        }

                        await member.user.send(`Vous avez été kick du serveur \`${interaction.guild.name}\` pour la raison : \`${options.get("raison").value}\``);
                        //We can ban
                        member.kick(options.get("raison").value).then(()=>{
                            interaction.guild.channels.cache.get("1130483351199961219").send(` \`${interaction.user.username}\` a kick \`${member.user.username}\` pour la raison : \`${options.get("raison").value}\``);
                            return interaction.reply(`Vous avez bien kick \`${member.user.username}\`, les logs ont été envoyé dans le channel des moderateurs`)

                        });
        });




    }
}