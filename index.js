const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');

const token = 'NjU0OTYwMzIyMzY0NDQwNTg2.Xf1N5g.ZX1SAt2m8ONN9TMcYmWuDh0E-EQ';

const PREFIX = "-";

bot.on('ready', () => {
    console.log('This bot is online!');
    bot.user.setActivity('-help | Archy Is Daddy', { type: 'WATCHING' }).catch(console.error);
});

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name === "bando");
    if (!channel) return;

    channel.send(`Wsg ${member}, Welcome to our server. Invite people for rewards!`)

});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ")

    switch (args[0]) {
        case 'ping':
            message.channel.sendMessage('**PONG!**');
            break;
        case 'wizz':
            message.channel.sendMessage('**YOU JUST WIZZED THIS SERVER**')
            break;
        case 'hang':
            message.channel.sendMessage('Someone hang this dumbass nigga')
            break;
        case 'die':
            message.channel.sendMessage('Once again: **Niyah has killed someone with her stank ass pussy**')
            break;
        case 'laylani':
            message.channel.sendMessage('*Laylani is this baddest bitch in the server.* **NO CAP!**')
            break;
        case 'archy':
            message.channel.sendMessage('*Archy has the biggest dick in the server.*')
            break;
        case 'kumshoota':
            message.channel.sendMessage('*6Z is the toughest nigga around*')
            break;
        case 'mommy':
            message.channel.sendMessage('*Mommy is the thiccest in the server*')
            break;
        case 'niyah':
            message.channel.sendMessage('*Niyah is riding 6Z atm, come back* **never**')
            break;
        case 'rachel':
            message.channel.sendMessage('*Rachel is the cutest bitch in the server*')
            break;
        case 'info':
            message.channel.sendMessage('**HELLO!** *I am a moderational bot with lots of features. I was created by Archy. To see a list of commands,* type: =help')
            break;
        case 'invite':
            message.channel.sendMessage('Sorry! **YOU CANNOT ADD ME TO YOUR SERVER. Archy set me up specifically for this server.**')
            break;
        case 'clear':
            if(!message.member.roles.find(r => r.name === "★★★★")) return message.channel.send('**YOU NEED ADMINISTRATOR PERMISSIONS TO USE THIS COMMAND**')
            if (!args[1]) return message.reply('**ERROR**! Please enter a number of messages to clear')
            .then(msg => message.delete(5000));
            message.channel.bulkDelete(args[1]);
            break;
        case 'kick':
            if(!message.member.roles.find(r => r.name === "★★★★")) return message.channel.send('**YOU NEED ADMINISTRATOR PERMISSIONS TO USE THIS COMMAND**')
            .then(msg => message.delete(5000));
            if (!args[1]) message.channel.send(`**ERROR!** You need to mention the user you want to kick.`)
            .then(msg => message.delete(5000));

            var user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('**You were kicked from Wraith!**').then(() => {
                        message.reply(`**Sucessfully kicked ${user.tag}**`);
                    }).catch(err => {
                        message.reply('I was unable to kick this member, because they are a moderator.');
                        console.log(err)
                        .then(msg => message.delete(5000));
                    });
                } else {
                    message.reply("That user isn't in this server!")
                    }
                } else {
                    message.reply("You need to specify a user!")
                    .then(msg => message.delete(5000));
                }
                
            break;
        case 'ban':
            if(!message.member.roles.find(r => r.name === "★★★★")) return message.channel.send('**YOU NEED ADMINISTRATOR PERMISSIONS TO USE THIS COMMAND**')
            .then(msg => message.delete(5000));
            if (!args[1]) message.channel.send(`**ERROR!** You need to mention the user you want to ban.`)
            .then(msg => message.delete(5000));

            var user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.ban({ression: '**You were banned from Wraith!**'}).then(() => {
                        message.reply(`**Sucessfully banned ${user.tag}**`)
                    }).catch(err => {
                        message.reply('I was unable to ban this member, because they are a moderator.');
                        console.log(err)
                        .then(msg => message.delete(5000));
                    });
                } else {
                    message.reply("That user isn't in this server!")
                    }
                } else {
                    message.reply("You need to specify a user!")
                    .then(msg => message.delete(5000));
                }
                
            break;
        case 'mute':
            if(!message.member.roles.find(r => r.name === "★★★★")) return message.channel.send('**YOU NEED ADMINISTRATOR PERMISSIONS TO USE THIS COMMAND**')
            .then(msg => message.delete(5000));
            let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return message.reply("**ERROR!** You need to mention the user you want to mute, or add a time limit.");

            let mainrole = message.guild.roles.find(role => role.name === "🦋");
            let muterole = message.guild.roles.find(role => role.name === "This Nigga Muted");

            if(!muterole) return message.reply("**ERROR!** Mute role doesnt't exist or cannot be found.");

            let time = (args[2]);

            if(!time){
                return message.reply("You need to specify a time limit you want the user to be muted for. **NOTE: ONCE YOU MUTE A USER, YOU CANNOT UNMUTE. THEY WERE MUTED FOR A REASON.**");
            }

            person.removeRole(mainrole.id);
            person.addRole(muterole.id);

            message.channel.send(`**@${person.user.tag} has been muted for ${ms(ms(time))}**`);

            setTimeout(function(){
                person.addRole(mainrole.id);
                person.removeRole(muterole.id);
                message.channel.send(`**@${person.user.tag} has been unmuted**`)
            }, ms(time));
            break;
            case 'help':
                var embed = new Discord.RichEmbed()
                .setTitle("**__General Help Commands__**")
                .addField("**FUN:**", "*ping, wizz, hang, die*")
                .addField("**CUSTOM COMMANDS:**", "*laylani, archy, kumshoota, mommy, nyah, rachel*")
                .addField("**EXTRA:**", "*info, invite*")
                .addField("**ADMIN COMMANDS:**", "*clear, mute, kick, ban*")
                .setColor("8a0303")
                .setFooter("This bot was made for this server only. Developed by Archy.")
                message.channel.sendEmbed(embed)
                break;


    }

});

bot.login(token);
