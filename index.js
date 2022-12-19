const { Client } = require('discord.js-selfbot-v13')
const client = new Client({
    "checkUpdate": false
})
const { token } = require("./config.json")
const debug_mode = false;
const moment = require("moment-timezone");


client.on('ready', async () => {
    console.log(`${client.user.tag} is ready!`);
})


client.on("messageCreate", async msg => {
    const isDM = msg.channel.type === "DM"
    if(isDM){
        const channel = client.channels.cache.get(msg.channelId)
        let author = "";
        let recipient = "";
        if(msg.author === client.user){
            author = client.user;
            recipient = channel.recipient;
        } else {
            author = channel.recipient;
            recipient = client.user;
        }
        let text = msg.content
        if(msg.attachments.size !== 0 && msg.content.length === 0) text = `# MESSAGE CONTAINS ${msg.attachments.size === 1 ? "ATTACHMENT" : "ATTACHMENTS"} #`;
        if(msg.stickers.size !== 0 && msg.content.length === 0) text = `# MESSAGE CONTAINS STICKER #`;
        //        console.log(final_date + " " + (msg.author === client.user ? "[OUTGOING]" : "[INCOMING]") + ` ${author.tag} ${debug_mode == true ? "" : `(ID: ${author.id})`} -> ${recipient.tag} ${debug_mode ? "" : `(ID: ${recipient.id})`} :  ${text}`)
        log((msg.author === client.user ? "[OUTGOING]" : "[INCOMING]") + ` ${author.tag} -> ${recipient.tag} :  ${text}`);
    }
})

function log(msg, with_date=true){
    const date = moment(Date.now()).tz("Europe/Warsaw");
    const final_date = date.format("MM/DD/YYYY HH:mm:ss")
    console.log((with_date===true ? final_date : " ") + " " + msg);
}
client.login(token)