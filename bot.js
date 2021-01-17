/* Author: v1p3r_hax
*  Description: A pourpose built discord bot to get the server status of the SMP server used in the streams
*  Version: 1.0.1
*/
const discord = require('discord.js')
const util = require('minecraft-server-util');
const config = require('./config.json');
const statBot = new discord.Client();

const REFRESH_INTERVAL = 0.5 * 60 * 1000;

statBot.on('ready', async() => {
    setDefaultStatus();
    console.log("Standing ready sire!");
    serverPingStat();
});

function setDefaultStatus(){
    statBot.on('presenceUpdate', async() => {
        statBot.user.setStatus("online");
    });
};

async function serverPingStat(){
    while(config.stopper == false){
        await util.status(config.ip, {port: config.port})
        .then((result) => {
            statBot.user.setStatus("online");
            console.log("yea, we up!");
        })
        .catch((error) => {
            statBot.user.setStatus("dnd");
            console.log("WE GOING DOWN!");
            throw error;
        });
        await new Promise(done => setTimeout(done, REFRESH_INTERVAL));
    };
};

statBot.on('message', async message => {
    switch(message.content){
        case 'v-status':
            util.status(config.ip,{ port: config.port })
            .then((response) => {
                const Embed = new discord.MessageEmbed()
                    .setTitle('Server Status')
                    .addField('Server IP', response.host)
                    .addField('Server Version', response.version)
                    .addField('Online Players', response.onlinePlayers)
                    .addField('Max Players', response.maxPlayers)
                    message.channel.send(Embed)
                    console.log(response);
            })
            
            if(error){
                message.channel.send("Server Denied the Request!");
                throw error;
            } 
            break;
            
        case 'v-modpack':
            message.channel.send('Potion Shop Madness:\thttps://www.curseforge.com/minecraft/modpacks/potion-shop-madness');
            break;

        case 'v-check':
            serverPingStat();
            break;

        case 'v-help':
            message.channel.send('Complain To @ManaHakume#8416 and use https://www.google.com/');
            break;
    }
});

statBot.login(config.token);