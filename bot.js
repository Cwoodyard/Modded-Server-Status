/* Author: v1p3r_hax
 *  Description: A pourpose built discord bot to get the server status of the SMP server used in the streams
 *  Version: 1.0.3
 */
const discord = require('discord.js')
const util = require('minecraft-server-util');
const config = require('./config.json');
const statBot = new discord.Client();

statBot.on('ready', async() => {
    setDefaultStatus();
    console.log("Standing ready sire!");
    //setting up a reoccuring check of the server to change the bot status
    setInterval(function() {
        util.status(config.ip, { port: config.port })
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

function setDefaultStatus() {
    statBot.user.setStatus("online");
};

statBot.on('message', async message => {
    // message.channel.send(message.content.slice(0, 2));

    if (message.content.startsWith('v-')) {
        switch (message.content.slice(2, message.content.length)) {
            case 'status':
                util.queryFull(config.ip, { port: config.port })
                    .then((response) => {
                        currPlayers = ' ';
                        onlinePlaying = response.onlinePlayers;
                        if (!onlinePlaying == 0) {
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

            case 'MVSMPmodpack':
                message.channel.send('Potion Shop Madness:\thttps://www.curseforge.com/minecraft/modpacks/potion-shop-madness');
                break;

            case 'FAmodpack':
                message.channel.send("Mana's Fabric Adventures:\thttps://www.curseforge.com/minecraft/modpacks/manas-fabric-adventures");
                break;

            case 'check':
                serverPingStat();
                break;

            case 'help':
                message.channel.send('Complain To @ManaHakume#8416 and use https://www.google.com/');
                break;

            case 'commands':

                const Embed2 = new discord.MessageEmbed()
                    .setTitle('Commands')
                    .addField('v-status', "Command to get the Fabric minecraft server status.")
                    .addField('v-check', "Similar to v-status where it check to see of server is online.")
                    .addField('v-MVSMPmodpack', "Where to download the Forge modpack.")
                    .addField('v-FAmodpack', "Where to download the Fabric Modpack.")
                    .addField('v-help', "What to do if you need help.")
                    .addField('v-commands', "This prompt.")
                message.channel.send(Embed2)
                break;
            default:
                message.channel.send('invalid Command. Please type v-commands for the list of commands.')
                break;
        }
    }
});

statBot.login(config.token);