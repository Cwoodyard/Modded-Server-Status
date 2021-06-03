module.exports = {
    commands: ['MVSMPmodpack'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send('Potion Shop Madness:\thttps://www.curseforge.com/minecraft/modpacks/potion-shop-madness');
    },
    permissions: [],
    requiredRoles: [''],
}