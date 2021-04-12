const Discord = require('discord.js');
const client = new Discord.Client();

const ytdl = require("ytdl-core");

const PREFIX = '!';

var Version = 'Version 1.0.0';

var Ping = 'hva skjer med faren din mann';

var Website = 'https://breakingbad.fandom.com/wiki/Hector_Salamanca';

var InvalidARG = 'Invalid Argument';

var Servers = {};

//konsollen sier at boten er klar
//til bruk på serveren.
client.once('ready', () => {
    console.log('Hector is online')
});

client.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send(Ping)
            break;
        case 'website':
            message.channel.send(Website)
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send(Version)
            }else{
                message.channel.send(InvalidARG)               
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error please define second argument')
            message.channel.bulkDelete(args[1]);
            break;
        case 'play':
			console.log("inside play-function");
            function play(connection, message){ 
                var server = servers[message.guild.id];
                console.log(server);
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
                
                server.queue.shift();
                
                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                })
            }


            if(!args[1]){
                message.channel.send("Please provide a link!");
                return;
            }
            if(!message.member.voiceChannel){
                message.channel.send("You must be in a voice channel!");
                return;
            }
            if(!Servers[message.guild.id]) Servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            }) 
            break;
    }   
})



client.login('ODMwMDU0MDQ2Mzc0NDI4Njgy.YHBGEg.dGMQbIuxPJgNFtoYiHTFG7jeldw')
