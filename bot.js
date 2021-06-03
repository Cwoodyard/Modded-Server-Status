/*  Author: v1p3r_hax
 *  Authors Notes: The base.js and some of this code has been taken 
    from https://github.com/AlexzanderFlores/Worn-Off-Keys-Discord-Js 
    and should be aknowledged as so <3 to the original dev and their youtube tutorial
 *  Description: A pourpose built discord bot to get the server 
    status of the SMP server used in the streams
 *  Version: 2.0.0
 */
const discord = require('discord.js')
const util = require('minecraft-server-util');
const config = require('./config.json');
const statBot = new discord.Client();

//Added as part of WornOffKey's 25th vid
const path = require('path');
const fs = require('fs');

statBot.on('ready', async() => {
    setDefaultStatus();
    console.log("Standing ready sire!");

    //Added as part of WornOffKey's 25th vid
    const baseFile = 'base.js';
    const commandBase = require(`./commands/${baseFile}`)
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                console.log(file, option)
                commandBase(statBot, option, config)

            }
        }
    }
    readCommands('commands');

    // setting up a reoccuring check of the server to change the bot status
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

statBot.login(config.token);