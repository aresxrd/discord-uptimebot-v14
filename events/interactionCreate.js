const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Collection } = require('discord.js')
const icooldown = new Collection()
const { ownerid, botid } = require("../ayarlar.json")
const db = require("croxydb")

module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {

        const command = client.slashcommands.get(interaction.commandName)
        if (!command) return
        
      if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
           .setColor("Red")
           .setTitle("Bot Bakımda!")
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
          .setEmoji(`<:stardev_icon:1163686894715031633>`)    
          .setURL(`https://discord.gg/RRpECRSaaP`)
          .setLabel("Star Development")
          .setStyle("Link"))
          
          if(interaction.user.id !== "873182701061021696" && interaction.user.id !== "1068897096951935017" && interaction.user.id !== "1068902433977286769" && interaction.user.id !== "1029431477219360869" && interaction.user.id !== "990186530767249419"){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       //Developed by aresxrd
          }
        }//Developed by aresxrd
      
      const Kullanamazsın = new EmbedBuilder()//Developed by aresxrd
           .setColor("Red")
           .setTitle("Komutlarımı Kullanamazsın!")//Developed by aresxrd
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        //Developed by aresxrd
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setEmoji(`<:stardev_icon:1163686894715031633>`)    
        .setURL(`https://discord.gg/RRpECRSaaP`)
        .setLabel("Star Development")
        .setStyle("Link"))
         
        if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek]})
      
        if (interaction.user.id !== ownerid) {//Developed by aresxrd
            if (!icooldown.has(interaction.commandName)) {
                icooldown.set(interaction.commandName, new Collection())
            }//Developed by aresxrd

            const now = Date.now()
            const timestampt = icooldown.get(interaction.commandName)
            const cooldownAmount = (command.cooldown) * 1000//Developed by aresxrd
//Developed by aresxrd
            if (timestampt.has(interaction.user.id)) {
                const expiration = timestampt.get(interaction.user.id) + cooldownAmount

                if (now < expiration) {
                    const timeleft = Math.round((expiration - now) / 1000)
//Developed by aresxrd
                    const embeduyarı = new EmbedBuilder()//Developed by aresxrd
                        .setDescription(`<:stardev_unlem2:1164372473006006345> Bu komutu tekrar kullanabilmek için **${timeleft} saniye** beklemelisin.`)
                        .setColor('Red')
                        .setTitle("Hata")//Developed by aresxrd
                    interaction.reply({ embeds: [embeduyarı] })
                    setTimeout(() => { interaction.deleteReply() }, expiration - now)//Developed by aresxrd

                    return
                }

            } else {//Developed by aresxrd

                timestampt.set(interaction.user.id, now)
                setTimeout(() => timestampt.delete(interaction.user.id), cooldownAmount)
            }
        }//Developed by aresxrd

        if (command.yetki) {
//Developed by aresxrd
            var yetki = command.yetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet').replace(ownerid, 'Bot Sahibi')

            var yetkiyok = new EmbedBuilder()
                .setDescription(`<:stardev_unlem2:1164372473006006345> Bu komutu kullanabilmek için **${yetki}** yetkisine sahip olmalısın.`)
                .setColor('Red')
                .setTitle("Hata")
            if (!interaction.member.permissions.has(`${command.yetki}`)) return interaction.reply({ embeds: [yetkiyok] })//Developed by aresxrd
        }
//Developed by aresxrd
        if (command.botyetki) {
//Developed by aresxrd
            var botyetki = command.botyetki.replace("ManageEmojis", 'Emojileri Yönet').replace("KickMembers", 'Kullanıcıyı Uzaklaştır').replace("BanMembers", 'Kullanıcıyı Yasakla').replace('Administrator', 'Yönetici').replace("ManageChannels", 'Kanalları Yönet').replace("ManageMessages", 'Mesajları Yönet').replace("ManageRoles", 'Rolleri Yönet')

            var botyetkiyok = new EmbedBuilder()//Developed by aresxrd
                .setDescription(`\<:stardev_unlem2:1164372473006006345> Bu komutu kullanabilmek için **${botyetki}** yetkisine sahip olmalıyım.`)
                .setColor('Red')//Developed by aresxrd
                .setTitle("Hata")
            if (!interaction.guild.members.me.permissions.has(`${command.botyetki}`)) return interaction.reply({ embeds: [botyetkiyok] })//Developed by aresxrd
        }

        try {//Developed by aresxrd
            command.execute(client, interaction)//Developed by aresxrd
        } catch (error) {
            console.error(error)//Developed by aresxrd
        }
    }
}
//Developed by aresxrd