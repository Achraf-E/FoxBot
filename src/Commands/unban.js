const discord = require("discord.js");
const config = require("../config.json").official;

module.exports = {
    name: "unban",
    description: "unban un utilisateur du serveur",
    permission: discord.PermissionFlagsBits.BanMembers,
    dm : false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "utilisateur à unban",
            required: true,
        },
        {
            type: "string",
            name: "raison",
            description: "raison du unban",
            required: true
        }
    ],

    async run(bot, interaction, options){ 

        interaction.guild.bans.remove(options.getUser("utilisateur")).then(async user => {
            interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a unban \`${user.username}\` pour la raison : \`${options.get("raison").value}\``);
            return interaction.reply({ephemeral: true, content : `Vous avez bien unban \`${user.username}\`, les logs ont été envoyé dans le channel des moderateurs`});
        }).catch(() => {return interaction.reply({ephemeral: true, content : `${options.get("utilisateur").value} introuvable.`});});




    }
}