const Discord = require("discord.js");
const { options } = require("./ban");

module.exports = {
    name: "mute",
    description: "mute un membre",
    dm : false,
    permission : Discord.PermissionFlagsBits.ModerateMembers,
    options : [
        {
            type: "user",
            name: "membre",
            description: "membre à mute",
            required: true
        },
        {
            type: "string",
            name: "raison",
            description: "raison du mute",
            required: true
        },
        {
            type: "number",
            name: "temps",
            description: "Temps en secondes",
            required: true
        }

    ],

    async run(bot, interaction, options) {
        interaction.guild.members.fetch(options.get("membre")).then(member => {
            //Test if the person can mute
            if(member.roles.highest.comparePositionTo(interaction.member.roles.highest) > -1){
                interaction.guild.channels.cache.get("1130483351199961219").send(` \`${interaction.user.username}\` a essayé de mute \`${member.user.username}\` mais n'en a pas les droits.`);
                return interaction.reply({ephemeral: true, content : `Vous ne pouvez mute \`${member.user.username}\`, les logs on été envoyé dans le channel des moderateurs`});
            }
            //We can mute
            member.timeout(options.get("temps").value * 1000, options.get("raison").value).then(() => {
                interaction.guild.channels.cache.get("1130483351199961219").send(` \`${interaction.user.username}\` a mute \`${member.user.username}\`  \`${options.get("temps").value}seondes\` pour la raison : \`${options.get("raison").value}\``);
                return interaction.reply({ephemeral: true, content : `Vous avez bien mute \`${member.user.username}\`, les logs ont été envoyé dans le channel des moderateurs`});

            });
        })
    }
}