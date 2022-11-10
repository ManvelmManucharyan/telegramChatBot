const https = require("https");

class Text {
    static async start (msg, bot) {
        const chatId = msg.chat.id
        await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp")
        return await bot.sendMessage(chatId, `Welcome to ankap bot`);
    }
    
    static async info (msg, bot) {
        const chatId = msg.chat.id
        return await bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`);
    }

    static async film (msg, bot) {
        const chatId = msg.chat.id
        const url =
        "https://www.omdbapi.com/?t=the+dark+knight" + process.env.API_KEY;

      const request = https.request(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data = data + chunk.toString();
        });
        response.on("end", async () => {
          const body = JSON.parse(data);
          console.log(body);
          let picture =
            body.Poster.slice(0, body.Poster.lastIndexOf("_") + 1) + "webp";
          await bot.sendPhoto(chatId, `${picture}`);
          return await bot.sendMessage(
            chatId,
            `Name - ${body.Title}
                            Actors - ${body.Actors}
                            Year - ${body.Year}
                    `
          );
        });
      });
      request.on("error", (error) => {
        console.log("An error", error);
      });
      request.end();
    }
}

module.exports = Text