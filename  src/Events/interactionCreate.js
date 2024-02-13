const discord = require("discord.js");


module.exports = async (bot,config, interaction) => {

    if(interaction.type === discord.InteractionType.ApplicationCommand){

        let command = require(`../Commands/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options,config, bot.db);
        


    }

}