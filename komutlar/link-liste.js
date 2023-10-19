const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-liste')
    .setDescription('Sistemdeki linklerinizi listeler.')
    .setDMPermission(false),
      
    async execute(client, interaction) {   
      
      const ProjeEklenmemiş = new EmbedBuilder()
          .setColor("Red")
          .setDescription(`${red} **Sisteme hiç proje eklememişsin.**`)
    
      const LinkYok = db.get(`UptimeLink_${interaction.user.id}`)
 			if (!LinkYok) return interaction.reply({embeds: [ProjeEklenmemiş]})
        
        const links = db.get(`UptimeLink_${interaction.user.id}`).map(map => `<:stardev_book:1164362461181399111> **Link:** ${map}`).join("\n")

        const LinkListe = new EmbedBuilder()
            .setTitle(`Star Uptime • Projelerin`)
            .setDescription(`${links || "Sisteme eklenmiş bir proje yok."}`)
            .setColor("Blurple")

        interaction.reply({
            embeds: [LinkListe],
            ephemeral: true
        }).catch(e => { })
      
    }
}