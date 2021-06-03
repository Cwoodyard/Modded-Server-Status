const discord = require('discord.js')
module.exports = {
    commands: ['commands'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const Embed2 = new discord.MessageEmbed()
            .setTitle('Commands')
            .addField('v-status', "Command to get the Fabric minecraft server status.")
            .addField('v-MVSMPmodpack', "Where to download the Forge modpack.")
            .addField('v-FAmodpack', "Where to download the Fabric Modpack.")
            .addField('v-commands', "This prompt.")
        message.channel.send(Embed2)
    },
    permissions: [],
    requiredRoles: [],
}