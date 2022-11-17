const https = require("https");
const Commands = require("./commands")

class Controller {
    static async sendMessage(chatId, bot, text, button) {
      try{
        return await bot.sendMessage(chatId, text, button);
      }catch (error){
        console.log(error);
      }
    }

    static async sendSticker(chatId, bot, url) {
      try{
        return await bot.sendSticker(chatId, url);
      }catch (error){
        console.log(error);
      }
    }

    static async sendPhoto(chatId, bot, url) {
      try{
        let picture = url.slice(0, url.lastIndexOf("_") + 1) + "webp";
        return await bot.sendPhoto(chatId, picture);
      }catch (error){
        console.log(error);
      }
    }

    static async getOneFilm(chatId, bot, name) {
      try{
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
      }catch (error){
        console.log(error);
      }
    }

    static async search(chatId, bot, text) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }

    static async botAnswer (bot) {
      await bot.on("callback_query", async msg => {
        return await msg;
      });
    }

    static async button (chatId, bot, text) {
        try {
          await this.sendMessage(chatId, bot, "Choose one", Commands.searchOptions);
        } catch (error) {
          console.log(error);
        }
    }

    static async onText (chatId, bot, text) {
      await bot.onText(/search/, async msg => {
        const r = await this.sendMessage(chatId, bot, "Write film", Commands.search);
        bot.onReplyToMessage(chatId, r.message_id, msg => {
          console.log(msg);
        })
      });
    }

}

module.exports = Controller