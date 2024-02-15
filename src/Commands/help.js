const Discord = require("discord.js")

module.exports = {
    name: "help",
    description: "affiche un descriptif des commandes",
    dm: true,
    category: "Informations",

    async run(bot, interaction){
        let categories = [];
        bot.commands.forEach(command => {
            if(!categories.includes(command.category)) categories.push(command.category);
        });

       var date = new Date()

        //Create the embed
        let embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setAuthor({ name : bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
        .setTitle("Commandes de Foxbot")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setDescription(`Commandes disponibles : \`${bot.commands.size}\` \n Catégories disponibles : \`${categories.length}\` `);


        categories.sort().forEach(category => {
            let commands = bot.commands.filter(cmd => cmd.category === category);
            embed.addFields({name: `${category}`, value: `${commands.map(cmd => `\`${cmd.name}\` : \`${cmd.description}\` `).join("\n")}`})
        });
        return interaction.reply({embeds: [embed], ephemeral:true})
    }
}