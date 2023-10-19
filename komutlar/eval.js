const Discord = require('discord.js')//Developed by aresxrd
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')//Developed by aresxrd
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              
//Developed by aresxrd
    data: new SlashCommandBuilder()         
    .setName('eval')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addStringOption(option =>
        option//Developed by aresxrd
            .setName('kod')
            .setDescription('Denenecek kodu belirtin.')
            .setRequired(true)),//Developed by aresxrd
              
    async execute(client, interaction) {   
      //Developed by aresxrd
      const YetkiYok = new EmbedBuilder()
      .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
    
      const code = interaction.options.getString('kod');
        
      try {//Developed by aresxrd
      var evaled = clean(await eval(code));
      if (evaled.match(new RegExp(`${client.token}`, "g")));
         
         const Token = new EmbedBuilder()
          .setDescription(`${red} **Bu şekilde tokenimi alamazsın.**`)
          .setColor('Red')
         
         if (evaled.includes(client.token)) return interaction.reply({embeds: [Token]});//Developed by aresxrd
                
         const Eval = new EmbedBuilder()
         .addFields({name: `<:Giris:1048294668707835984> **Kod girişi**`, value: `\`${code}\``})
         .addFields({name: `<:Cikis:1048294654141010010> **Kod çıkışı**`, value: `\`${evaled}\``}) 
         .setColor('Green')
         interaction.reply({embeds: [Eval]})
        
         } catch (err) {//Developed by aresxrd//Developed by aresxrd
           
         const Hata = new EmbedBuilder()
         .addFields({name: `<:Giris:1048294668707835984> **Kod girişi**`, value: `\`${code}\``})
         .addFields({name: `<:Hata:1048294942054809630> **Hata**`, value: `\`${err}\``}) 
         .setColor('Red')
         interaction.reply({embeds: [Hata]});
         }//Developed by aresxrd
         function clean(text) {
         if (typeof text !== "string")
         text = require("util").inspect(text, { depth: 0 });
         text = text
         .replace(/`/g, "`" + String.fromCharCode(8203))
         .replace(/@/g, "@" + String.fromCharCode(8203));
         return text;//Developed by aresxrd
      }
   }
}