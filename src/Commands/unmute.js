const Discord = require("discord.js");
const config = require("../config.json").official;

module.exports = {
    name: "unmute",
    description: "unmute un membre",
    dm : false,
    permission : Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modération",
    options : [
        {
            type: "user",
            name: "membre",
            description: "membre à unmute",
            required: true
        },
        {
            type: "string",
            name: "raison",
            description: "raison du unmute",
            required: false
        },

    ],

    async run(bot, interaction, options) {
        interaction.guild.members.fetch(options.get("membre")).then(member => {            

            //official if the person can unmute
            if(member.roles.highest.comparePositionTo(interaction.member.roles.highest) > -1){
                interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a essayé de unmute \`${member.user.username}\` mais n'en a pas les droits.`);
                return interaction.reply({ephemeral: true, content : `Vous ne pouvez unmute \`${member.user.username}\`, les logs on été envoyé dans le channel des moderateurs`});
            }
            //We can unmute
            member.timeout(1, (options.get("raison")? options.get("raison").value:"Pas de raisons")).then(() => {
                interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a unmute \`${member.user.username}\` pour la raison : \`${options.get("raison")? options.get("raison").value:"Pas de raisons"}\``);
                return interaction.reply({ephemeral: true, content : `Vous avez bien unmute \`${member.user.username}\`, les logs ont été envoyé dans le channel des moderateurs`});

            });
        })
    }
}