const discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "banni un membre du serveur",
    perimission: discord.PermissionFlagsBits.BanMembers,
    dm : false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "membre à bannir",
            required: true
        },
        {
            type: "string",
            name: "raison",
            description: "raison du ban",
            required: true
        }
    ],

    async run(bot, interaction, options){ 

        try {
            let user = bot.users.cache.get(options._hoistedOptions[0].value);
            if(!user){
                return interaction.reply(`${options._hoistedOptions[0].value.username} non trouvé`);
            }


            let member = interaction.guild.members.cache.get(user.id);
            let reason = options.get("raison").value;

        // Conditions
            if(user.id === interaction.user.id){
                return interaction.reply("Tu ne peux te banir toi-même.");
            }
            if(await interaction.guild.fetchOwner().id === user.id){
                //console.log(user + " === " + interaction.guild.fetchOwner() );
                //console.log(await interaction.guild.fetchOwner().id === user.id);
                return interaction.reply("Tu ne peux bannir le propriétaire du serveur.");
            } if(!member?.bannable){
                return interaction.reply("Cette personne n'est pas bannissable");
            } if(member && interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0){
                return interaction.reply("Tu n'as pas les droits pour banir cette personne.");
            }
            if((await interaction.guild.bans.fetch()).get(user.id)){
                return interaction.reply("Cet utilisateur est déjà banni de ce serveur");
            }

        // We can ban
            interaction.guild.members.ban(user.id, {reason : reason}).then(() => {
                member.send(`Tu as été banni du serveur ${interaction.guild.name} par ${interaction.user.username} pour la raison : ${reason}`);
                return interaction.reply(`${interaction.user.username} a banni ${user.username} pour la raison : ${reason}`);
            })

        } catch (error) {
            return interaction.reply(`${options._hoistedOptions[0].value} non trouvé`);
        }


    }
}