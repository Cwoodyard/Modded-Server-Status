/* Author: v1p3r_hax
*  Description: A pourpose built discord bot to get the server status of the SMP server used in the streams
*  Version: 1.0.2
*/
const discord = require('discord.js')
const util = require('minecraft-server-util');
const config = require('./config.json');
const statBot = new discord.Client();

statBot.on('ready', async() => {
    setDefaultStatus();
    console.log("Standing ready sire!");
    //setting up a reoccuring check of the server to change the bot status
    setInterval(function (){
        util.status(config.ip, {port: config.port})
        .then((result) => {
            statBot.user.setStatus("online");
            console.log("yea, we up!");
        })
        .catch((error) => {
            statBot.user.setStatus("dnd");
            console.log("WE GOING DOWN!");
            throw error;
        })
    }, 3000);
});

function setDefaultStatus(){
        statBot.user.setStatus("online");
};

statBot.on('message', async message => {
    switch(message.content){
        case 'v-status':
            util.queryFull(config.ip,{ port: config.port })
            .then((response) => {
                currPlayers = ' ';
                onlinePlaying = response.onlinePlayers;
                if(!onlinePlaying == 0){
                    currPlayers = response.players;
                } else {
                    currPlayers = "Empty";
                };
                const Embed = new discord.MessageEmbed()
                    .setTitle('Server Status')
                    .addField('Server IP', response.host)
                    .addField('Server Version', response.version)
                    .addField('Online Players', response.onlinePlayers)
                    .addField('Max Players', response.maxPlayers)
                    .addField('Players', currPlayers)
                    message.channel.send(Embed)
                    console.log(response);
            })
            
            .catch((error) => {
                message.channel.send("Server Denied the Request!");
                throw error;
            }) 
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