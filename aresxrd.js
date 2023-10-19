//StarDev https://discord.gg/y6TR3he9
const Discord = require('discord.js')
const { Client, Partials, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder, ButtonBuilder } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token, ownerid, red, onay} = require("./ayarlar.json")
const moment = require('moment')
const os = require('os') 
const osutils = require('os-utils') 
require("moment-duration-format")
require("./slash")(client)
const db = require("croxydb")
const fetch = require('node-fetch')
const express = require('express')
const monitor = require('http-monitor')
client.login(token)
//=====// Embedler \\=====\\
const PreYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red} **Normal bir kullanıcı en fazla 2 proje ekleyebilir, </link-limit:0> komutu ile link limitinizi arttırabilir, </pre-al:0> komutu ile premium alarak sınırsız link ekleyebilirsiniz.**`)
    
const FazlaLink = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red} **Bir kullanıcı tarafından en fazla 999 link eklenebilir.**`)
   
const LinkVar = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red} **Belirtilen proje sistemde bulunuyor.**`)
    
const BaşıHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red} **Proje linkin hatalı, linkin başında \`https://\` olduğundan emin ol.**`)
    
const SonuHatalı = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red} **Yalnızca glitch projeleri aktif tutulmaktdır, linkin sonunda \`.glitch.me\` olduğundan emin ol.**`)
    
const LinkEklendi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`${onay} **Projen başarıyla sisteme eklendi, linkiniz 2-5 dk içerisinde aktif olacaktır.**`)
        
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red} **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`${onay} **Projen başarıyla sistemden silindi.**`)
    
const Silindi = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Başarılı")
    .setDescription(`${onay} **Proje başarıyla sistemden silindi.**`)
    
const ProjeEklenmemiş = new EmbedBuilder()
    .setColor("Red")
    .setTitle("Hata")
    .setDescription(`${red}  **Sisteme hiç proje eklememişsin.**`)
//=====// Embedler \\=====\\

//=====// LinkEklemeFormu \\=====\\
const LinkEklemeFormu = new ModalBuilder()
    .setCustomId('linkeklemeform2')
    .setTitle('Link ekle')
const LinkEkleFormu = new TextInputBuilder()
    .setCustomId('linkekle')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://star-development.glitch.me')
    .setRequired(true)
const LinkEklemeSistemi = new ActionRowBuilder().addComponents(LinkEkleFormu);
LinkEklemeFormu.addComponents(LinkEklemeSistemi);
//=====// LinkEklemeFormu \\=====\\

//=====// LinkSilmeFormu \\=====\\
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform2')
    .setTitle('Link sil')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://star-development.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi); 
//=====// LinkSilmeFormu \\=====\\

//=====// SilmeFormu \\=====\\
const SilmeFormu = new ModalBuilder()
    .setCustomId('silmeform')
    .setTitle('Link sil')
const SilFormu = new TextInputBuilder()
    .setCustomId('sil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://star-development.glitch.me')
    .setRequired(true)
const SilmeSistemi = new ActionRowBuilder().addComponents(SilFormu);
SilmeFormu.addComponents(SilmeSistemi); 

const SilID = new TextInputBuilder()
    .setCustomId('silid')
    .setLabel('Projesi silinecek kullanıcı idsini giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(18)
    .setMaxLength(20)
    .setPlaceholder('Kullanıcı ID Giriniz.')
    .setRequired(true)
const SilmeID = new ActionRowBuilder().addComponents(SilID);
SilmeFormu.addComponents(SilmeID);

const Sebep = new TextInputBuilder()
    .setCustomId('sebep')
    .setLabel('Projeyi silme sebebini belirtin.')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Geçersiz link.')
    .setRequired(true)
const SilmeSebep = new ActionRowBuilder().addComponents(Sebep);
SilmeFormu.addComponents(SilmeSebep);
        
//=====// SilmeKomutu \\=====\\
client.on('interactionCreate', async interaction => {
  if (interaction.commandName === "sil") {
    
    const YetkiYok = new EmbedBuilder()
      .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
    
    await interaction.showModal(SilmeFormu);
   }
 })
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'silmeform') {
      
      let linkInput = interaction.fields.getTextInputValue("sil")
      let linkID = interaction.fields.getTextInputValue("silid")
      let Sebep = interaction.fields.getTextInputValue("sebep")
      const links = db.get(`UptimeLink_${linkID}`)

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
        db.unpush(`UptimeLink_${linkID}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
        interaction.reply({embeds: [Silindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${linkID}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = `${red}`
        } else {
        PreVarmı = `${onay}`
        }
      
      
        const ProjeSilindi = new EmbedBuilder()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
        .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setColor("Red")
         .setTitle("Bot Sahibi Tarafından Sistemden Bir Link Silindi!")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `<@${linkID}>`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${linkID}\`**`})
         .addFields({name: `<:stardev_unlem2:1164372473006006345> **Linkin Silinme Sebebi**`, value: `**\`${Sebep}\`**`})
         .addFields({name: `<:stardev_link2:1164366935044137060> **Silinen Link**`, value: `**${linkInput}**`})
         client.channels.cache.find(x => x.name == "uptime-log").send({embeds: [ProjeSilindi]})
        
    }
})
//=====// SilmeKomutu \\=====\\
//=====// LinkEklemeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "eklebuton") {
      
      const Kullanamazsın = new EmbedBuilder()
      .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
           .setColor("Red")
           .setTitle("Komutlarımı Kullanamazsın!")
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()    
           .setEmoji(`<:stardev_icon:1163686894715031633>`)    
           .setURL(`https://discord.gg/RRpECRSaaP`)
           .setLabel("Star Development")
           .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
       
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
          .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
           .setColor("Red")
           .setTitle("Bot Bakımda")
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()       
          .setEmoji(`<:stardev_icon:1163686894715031633>`)     
           .setURL(`https://discord.gg/RRpECRSaaP`)
           .setLabel("Star Development")
           .setStyle("Link"))
          
          if(interaction.user.id !== ownerid){
  
          interaction.reply({embeds: [Bakımda], components: [Destek], ephemeral: true})
       
          }
        }
      
    await interaction.showModal(LinkEklemeFormu);
  }
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'linkeklemeform2') {
    
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+2 
      
      if (!db.fetch(`UptimeLink_${interaction.user.id}`)) {
           db.set(`UptimeLink_${interaction.user.id}`, [])
        }
        const link = interaction.fields.getTextInputValue("linkekle")
        let link2 = db.fetch(`UptimeLink_${interaction.user.id}`, [])

        const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)

        if (!link) return

        if (PremiumÜye) {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= 999) {
                return interaction.reply({embeds: [FazlaLink], ephemeral: true}).catch(e => { })
            }

        } else {
        
        if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= Limit) {
                return interaction.reply({embeds: [PreYok], ephemeral: true}).catch(e => { })}
          }

        if (link2.includes(link)) {
            return interaction.reply({embeds: [LinkVar], ephemeral: true}).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({embeds: [BaşıHatalı], ephemeral: true}).catch(e => { })
        }

        if (!link.endsWith(".glitch.me")) {
            return interaction.reply({embeds: [SonuHatalı], ephemeral: true}).catch(e => { })
        }
      
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`UptimeLink`, link)
  
        interaction.reply({embeds: [LinkEklendi], ephemeral: true}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = `${red}`
        } else {
        PreVarmı = `${onay}`
        }
        
        const ProjeEklendi = new EmbedBuilder()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
        .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setColor("Green")
         .setTitle("Sisteme Bir Link Eklendi")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${interaction.user.id}\`**`})
         .addFields({name: `<:stardev_book:1164362461181399111> **Sistemdeki Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink`).length}\`**`})
         .addFields({name: `<:stardev_link:1164353637552766987> **Kullanıcının Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink_${interaction.user.id}`).length}\`**`})
         .addFields({name: `<:stardev_link2:1164366935044137060> **Kullanıcının Eklediği Link**`, value: `**${link}**`})
         client.channels.cache.find(x => x.name == "uptime-log").send({embeds: [ProjeEklendi]})
        
     } 
 })
//=====// LinkEklemeSistemi \\=====\\

//=====// LinkSilmeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "silbuton") {
      
      const Kullanamazsın = new EmbedBuilder()
      .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
           .setColor("Red")
           .setTitle("Komutlarımı Kullanamazsın!")
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setEmoji(`<:stardev_icon:1163686894715031633>`)     
        .setURL(`https://discord.gg/RRpECRSaaP`)
        .setLabel("Star Development")
        .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
      
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
          .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
           .setColor("Red")
           .setTitle("Bot Bakımda!")
           .setDescription(`<:stardev_unlem2:1164372473006006345>**Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
          .setEmoji(`<:stardev_icon:1163686894715031633>`)     
           .setURL(`https://discord.gg/RRpECRSaaP`)
           .setLabel("Star Development")
           .setStyle("Link"))
          
          if(interaction.user.id !== ownerid){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
    await interaction.showModal(LinkSilmeFormu);
   }
})
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    if (interaction.customId === 'linksilmeform2') {
    
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok], ephemeral: true}).catch(e => { })
     
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
        
        interaction.reply({embeds: [LinkSilindi], ephemeral: true}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = `${red}`
        } else {
        PreVarmı = `${onay}`
        }
        const ProjeSilindi = new EmbedBuilder()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
        .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setColor("Red")
         .setTitle("Sistemden Bir Link Silindi")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${interaction.user.id}\`**`})
         .addFields({name: `<:stardev_book:1164362461181399111>**Sistemdeki Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink`).length}\`**`})
         .addFields({name: `<:stardev_link:1164353637552766987> **Kullanıcının Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink_${interaction.user.id}`).length}\`**`})
         .addFields({name: `<:stardev_link2:1164366935044137060> **Kullanıcının Sildiği Link**`, value: `**${linkInput}**`})
         client.channels.cache.find(x => x.name == "uptime-log").send({embeds: [ProjeSilindi]})
        
    }
})
//=====// LinkSilmeSistemi \\=====\\
      
//=====// LinkListeSistemi \\=====\\
client.on('interactionCreate', async interaction => {
    if (interaction.customId === "listebuton") {
    
    const Kullanamazsın = new EmbedBuilder()
    .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
           .setColor("Red")
           .setTitle("Komutlarımı Kullanamazsın!")
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Karalistemde bulunduğun için komutlarımı kullanmazsın, karalisteye alınma sebebini öğrenmek için veya karalisteden çıkartılmak için destek sunucuma gelebilirsin.**`)
        
        const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setEmoji(`<:stardev_icon:1163686894715031633>`)     
        .setURL(`https://discord.gg/RRpECRSaaP`)
        .setLabel("Star Development")
        .setStyle("Link"))
         
    if (db.fetch(`Karaliste_${interaction.user.id}`)) return interaction.reply({embeds: [Kullanamazsın], components: [Destek], ephemeral: true})
      
    if(db.fetch(`Bakım`)) {
          
          const Bakımda = new EmbedBuilder()
          .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
           .setColor("Red")
           .setTitle("Bot Bakımda!")
           .setDescription(`<:stardev_unlem2:1164372473006006345> **Sizlere en iyi hizmeti vermek için kısa süreliğine bakımdayız. Daha ayrıntılı bilgi için destek sunucusuna gelebilirsiniz. Bakım sebebi: \`${db.fetch(`BakımSebep`)}\`**`)
        
          const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
          .setEmoji(`<:stardev_icon:1163686894715031633>`)     
           .setURL(`https://discord.gg/RRpECRSaaP`)
           .setLabel("Star Development")
           .setStyle("Link"))
          
          if(interaction.user.id !== ownerid){
  
          interaction.reply({embeds: [Bakımda], components: [Destek]})
       
          }
        }
      
    const LinkYok = db.get(`UptimeLink_${interaction.user.id}`)
 			if (!LinkYok) return interaction.reply({embeds: [ProjeEklenmemiş], ephemeral: true})
        
        const links = db.get(`UptimeLink_${interaction.user.id}`).map(map => `<:stardev_book:1164362461181399111> **Link:** ${map}`).join("\n")

        const LinkListe = new EmbedBuilder()
            .setTitle(`Sistemdeki projelerin`)
            .setDescription(`${links || "Sisteme eklenmiş bir proje yok."}`)
            .setColor("Blurple")

        interaction.reply({
            embeds: [LinkListe],
            ephemeral: true
        }).catch(e => { })

    }
})
//=====// LinkListeSistemi \\=====\\

//=====// UptimeEtme \\=====\\
setInterval(() => {
  var links = db.get("UptimeLink");
  if (!links) return;
  links.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("Hata: " + e);
    }
  });
  console.log("Uptime başarılı")
}, 120000);
//=====// UptimeEtme \\=====\\
//Star Dev https://discord.gg/y6TR3he9