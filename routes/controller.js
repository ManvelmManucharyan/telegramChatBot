const https = require("https");
const Commands = require("./commands");

class Controller {
    static async sendMessage(chatId, bot, text, button) {
        return await bot.sendMessage(chatId, text, button)
    }

    static async sendSticker(chatId, bot, url) {
        return await bot.sendSticker(chatId, url);
    }

    static async sendPhoto(chatId, bot, url) {
        let picture = url.slice(0, url.lastIndexOf("_") + 1) + "webp";
        return await bot.sendPhoto(chatId, picture);
    }

    static async getFilm(chatId, bot, name, option) {
        const url = `https://www.omdbapi.com/?${option}=${name.split(" ").join("+")}${process.env.API_KEY}`;
        const request = https.request(url, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data = data + chunk.toString();
          });
          response.on("end", async () => {
            const body = JSON.parse(data);
            await this.sendPhoto(chatId, bot, body.Poster);
            return await this.sendMessage(chatId, bot, Commands.filmSchema(body), { parse_mode: "HTML" })
          });
        });
        request.on("error", (error) => {
          console.log("An error", error);
        });
        request.end();
    }

    static async question(chatId, bot, text, option) {
      let a = await bot.sendMessage(chatId, text, {
        reply_markup: JSON.stringify({ force_reply: true }),
      })

      bot.onReplyToMessage(
          a.chat.id,
          a.message_id,
          async msg => {
            console.log(msg);
            text = msg.text
            await this.getFilm(chatId, bot, text, option);
          }
        )
    }
}

module.exports = Controller