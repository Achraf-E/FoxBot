const Discord = require("discord.js")
const config = require("../config.json").official;


module.exports = {
    name : "warn",
    description : "avertissement d'un membre ne suivant pas les règles du serveur",
    permission : Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [

        {
            type: "user",
            name: "membre",
            description: "Le membre à warn",
            required: true,
        },

        {
            type: "string",
            name: "raison",
            description: "raison du warn",
            required : true,
        }

    ],

    async run(bot, interaction, options, db){
        var member = interaction.guild.members.fetch(options.get("membre")).then(async member => {
            //official if the person can warn
            if(member.roles.highest.comparePositionTo(interaction.member.roles.highest) > -1){
                interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a essayé de warn \`${member.user.username}\` mais n'en a pas les droits.`);
                return interaction.reply({ephemeral: true, content :  `Vous ne pouvez warn \`${member.user.username}\`, les logs on été envoyé dans le channel des moderateurs`});
            }

            db.query(`INSERT INTO warns (warner, warned, reason) VALUES ('${interaction.user.username}', '${member.user.username}', '${options.get("raison").value}');`);

            await member.user.send(`Vous avez été warn du serveur \`${interaction.guild.name}\` pour la raison : \`${options.get("raison").value}\``);
            interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a warn \`${member.user.username}\` pour la raison : \`${options.get("raison").value}\``);
            checkWarns(bot,interaction,member,db);
            return interaction.reply({ephemeral: true, content : `Vous avez bien warn \`${member.user.username}\`, les logs ont été envoyé dans le channel des moderateurs`});
            
        }).catch(err => {
            console.log(err);
            interaction.guild.channels.cache.get(config.moderate_channel).send(` \`${interaction.user.username}\` a essayé de warn \`${options.getUser("membre")}\` mais une erreur est survenue (est-il dans le serveur?).`);
            return interaction.reply({ephemeral: true, content :  `Vous ne pouvez warn cette personne, les logs on été envoyé dans le channel des moderateurs`});
        });
    },
}

function checkWarns(bot,interaction,member,db){
    db.query(`SELECT count(*) AS count FROM warns WHERE warned = '${member.user.username}'`, function(err, result, fields){
        if (err){
            console.log(err);
            return;
        }
        var count = result[0].count
        if(count > 2){

            //Create the embed
            let embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name : bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
            .setTitle(`Warnings de ${member.user.username} : ${count}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setDescription(`Nombres de warnings de ${member.user.username}, cet affichage se fait quand il a eu plus de 3 warns`);
            
            interaction.guild.channels.cache.get(config.moderate_channel).send({embeds: [embed]});

        } ;


    });
}