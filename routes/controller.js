const https = require("https");

class Controller {
    static async sendMessage(chatId, bot, text) {
        return await bot.sendMessage(chatId, text);
    }

    static async sendSticker(chatId, bot, url) {
        return await bot.sendSticker(chatId, url);
    }

    static async sendPhoto(chatId, bot, url) {
        let picture = url.slice(0, url.lastIndexOf("_") + 1) + "webp";
        return await bot.sendPhoto(chatId, picture);
    }

    static async getOneFilm(chatId, bot, name) {
        const url = `https://www.omdbapi.com/?t=${name.split(" ").join("+")}${process.env.API_KEY}`;
        const request = https.request(url, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data = data + chunk.toString();
          });
          response.on("end", async () => {
            const body = JSON.parse(data);
            await this.sendPhoto(chatId, bot, body.Poster);
            return await this.sendMessage(chatId, bot, `Name - ${body.Title} Actors - ${body.Actors} Year - ${body.Year}`)
          });
        });
        request.on("error", (error) => {
          console.log("An error", error);
        });
        request.end();
    }

    static async search(chatId, bot, text) {
        await this.sendMessage(chatId, bot, "Write film name")
        const url = `https://www.omdbapi.com/?s=${text.split(" ").join("+")}${process.env.API_KEY}`;
        const request = https.request(url, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data = data + chunk.toString();
          });
          response.on("end", async () => {
            const body = JSON.parse(data);
            await this.sendPhoto(chatId, bot, body.Poster);
            return await this.sendMessage(chatId, bot, `Name - ${body.Title} Actors - ${body.Actors} Year - ${body.Year}`)
          });
        });
        request.on("error", (error) => {
          console.log("An error", error);
        });
        request.end();
    }

}

module.exports = Controller