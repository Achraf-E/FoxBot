const Discord = require("discord.js");
const config = require("../config.json").test;


module.exports = {
    name : "clear",
    description : "Supprime les derniers messages d'un channel \n (celui-ci, si aucun n'est précisé)",
    permission : Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [

        {
            type: "number",
            name: "nombre",
            description: "Nombre de messages à supprimer",
            required: true,
        },

        {
            type: "channel",
            name: "salon",
            description: "salon où supprimer les messages",
            required : false,
        }

    ],

    async run(bot, interaction, options){
        var channel = options.getChannel("salon") != null ? options.getChannel("salon"):interaction.channel
        await interaction.deferReply({ephemeral: true});
        try{
            if(options.get('nombre').value > 100){
                throw new IllegalArgumentException();
            }
            channel.bulkDelete(options.get('nombre').value)
            .then(async messages => {
            interaction.guild.channels.cache.get(config.moderate_channel).send(`${interaction.user.username} a supprimé ${messages.size} du channel ${channel.name}.`);
            return interaction.editReply(`Vous avez bien supprimé ${messages.size} du channel ${channel.name}`);
            }).catch(() => {
                return interaction.editReply('Vous ne pouvez pas supprimer des messages plus vieux que 14 jours');
            });
        }
        catch(error){
            return interaction.editReply('Erreur lors de la suppression, essayez de supprimer moins de messages, mettez entre 0 et 100 messages à supprimer');
        }
    }
}