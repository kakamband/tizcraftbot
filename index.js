const discord = require("discord.js");
const client = new discord.Client();

const minecraft = require("minecraft-server-util");

const prefix = "/"

client.on("ready" , () => {

    console.log("I'm ready!");

});

client.on("message" , msg => {
    var args = msg.content.substr(prefix.length).split(" ")

    /*------------------------Test Command-------------------------*/

    if(msg.content == "ping"){
        msg.channel.send("kos nago kale kiri");
    }

    /*------------------------Test Command------------------------*/

    switch(args[0]){
        case "koskesh":
            msg.channel.send("lol");
            break;
        case "server":
            minecraft.status('103.130.144.21')
            .then((response) => {
                const svembed = new discord.MessageEmbed()
                svembed
                .setAuthor(msg.author.username)
                .setColor(1752220)
                .setTitle("Tizcraft")
                .setDescription("Tizcraft By SagD")
                .addField("IP",response.host)
                .addField("Port",response.port)
                .addField("Server Version",response.version)
                .addField("Online Players", "`" + response.onlinePlayers+ "`")
                .addField("Max Players",response.maxPlayers)
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/767699977119072268/767782188149243974/TizCraft.png");
                msg.channel.send(svembed)

                const plembed = new discord.MessageEmbed()
                plembed
                .setAuthor(msg.author.username)
                .setColor(12745742)
                .setTitle("Online Players")
                .setDescription("Tizcraft Online Players");
                if(response.onlinePlayers == 0){
                    plembed.setDescription('There are no online players.')
                    msg.channel.send(plembed);
                }
                else{
                    var players = [];
                    for(var i = 0;i < response.samplePlayers.length;i++){
                       players.push(response.samplePlayers[i].name);
                    }
                    plembed.setDescription(players)
                    msg.channel.send(plembed);
                }
                
            })
            .catch((error) => {
                throw error;
            });
            break;
    }

});

client.login(process.env.BOT_TOKEN);