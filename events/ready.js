const Discord = require('discord.js')
const db = require("croxydb")
const links = db.fetch("UptimeLink") || []
const Linkler = db.fetch(`UptimeLink`) || []

module.exports = {
    name: 'ready',
      
    execute(client) {
     
      console.log(`[arescan] ${client.user.username} Giriş Yaptım`)


    }
}
