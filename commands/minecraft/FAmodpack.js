module.exports = {
    commands: ['FAmodpack'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send("Mana's Fabric Adventures:\thttps://www.curseforge.com/minecraft/modpacks/manas-fabric-adventures");
    },
    permissions: [],
    requiredRoles: [],
}