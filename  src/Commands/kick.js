const discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "kick un membre du serveur",
    perimission: discord.PermissionFlagsBits.KickMembers,
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

        let user = bot.users.cache.get(options._hoistedOptions[0].value);
        let reason = options.get("raison").value;
        let member = await interaction.guild.members.fetch(user.id);

        //Test if the person can kick
        if(member.roles.highest.comparePositionTo(interaction.member.roles.highest) > -1){
            interaction.guild.channels.cache.get("1130483351199961219").send(` \`${interaction.user.username}\` a essayé de kick \`${user.username}\` mais n'en a pas les droits.`);
            return interaction.reply(`Vous ne pouvez kick \`${user.username}\`, les logs on été envoyé dans le channel des moderateurs`);
        }

        // We can kick
        interaction.guild.members.kick(user.id, {reason : reason}).then(() => {
            interaction.guild.channels.cache.get("1130483351199961219").send(`\`${interaction.user.username}\` a kick \`${user.username}\` pour la raison : \`${reason}\``);
            return interaction.reply(`Vous avez bien kick \`${user.username}\`, les logs ont été envoyé dans le channel des moderateurs`)
        }).catch(() => {
            interaction.guild.channels.cache.get("1130483351199961219").send(`\`${interaction.user.username}\` a essayé de kick \`${options._hoistedOptions[0].value}\` mais n'en a pas les droits.`);
            return interaction.reply(`Vous ne pouvez kick cette utilisateur, les logs on été envoyé dans le channel des moderateurs`);
        });




    }
}