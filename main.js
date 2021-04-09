const Discord = require('discord.js');
const client = new Discord.Client();

const PREFIX = '$';


client.once('ready', () => {
    console.log('Hector is online')
});

client.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('hva skjer med faren din mann')
            break;
        case 'website':
            message.channel.send('https://breakingbad.fandom.com/wiki/Hector_Salamanca')
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send('Version 1.0.0')
            }else{
                message.channel.send('Invalid Argument')               
            }
            break;
    }
})



client.login('ODMwMDU0MDQ2Mzc0NDI4Njgy.YHBGEg.YZQwMaUdteF05TYWlurD0GFk0Tw')
