const util = require('minecraft-server-util');
const config = require('../../config.json');
module.exports = {
    commands: ['status'],
    expectedArgs: 'config',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
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
            message.channel.send("Server is currently down. Please notify Mana or Viper.");
            throw error;
        })
    },
    permissions: '',
    requiredRoles: ['Modded Players'],
}