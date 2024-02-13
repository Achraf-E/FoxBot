const discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "ban un membre du serveur",
    permission: discord.PermissionFlagsBits.BanMembers,
    dm : false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "membre à ban",
            required: true,
        },
        {
            type: "string",
            name: "raison",
            description: "raison du ban",
            required: true
        }
    ],

    async run(bot, interaction, options, config){ 

        interaction.guild.members.fetch(options.get("membre")).then(async member => {
                        //Test if the person can ban
                        if(member.roles.highest.comparePositionTo(interaction.member.roles.highest) > -1){
                            interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a essayé de ban \`${member.user.username}\` mais n'en a pas les droits.`);
                            return interaction.reply({ephemeral: true, content :  `Vous ne pouvez ban \`${member.user.username}\`, les logs on été envoyé dans le channel des moderateurs`});
                        }

                        await member.user.send(`Vous avez été ban du serveur \`${interaction.guild.name}\` pour la raison : \`${options.get("raison").value}\``);
                        //We can ban
                        member.ban({reason : options.get("raison").value}).then(()=>{
                            interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a ban \`${member.user.username}\` pour la raison : \`${options.get("raison").value}\``);
                            return interaction.reply({ephemeral: true, content : `Vous avez bien ban \`${member.user.username}\`, les logs ont été envoyé dans le channel des moderateurs`});

                        });
        }).catch(err => {
            interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a essayé de ban \`${options.getUser("membre")}\` mais une erreur est survenue (est-il dans le serveur?).`);
            return interaction.reply({ephemeral: true, content :  `Vous ne pouvez ban cette personne, les logs on été envoyé dans le channel des moderateurs`});
        });




    }
}