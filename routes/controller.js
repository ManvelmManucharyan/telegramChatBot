const https = require("https");
const Commands = require("./commands")

class Controller {
    static async sendMessage(chatId, bot, text, option) {
      try{
        return await bot.sendMessage(chatId, text, option);
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
        if(url === "N/A"){
          let picture = "https://depositphotos.com/297474190/stock-illustration-no-image-vector-illustration-isolated." + "webp";
          return await bot.sendPhoto(chatId, picture);
        }
        let picture = url.slice(0, url.lastIndexOf("_") + 1) + "webp";
        return await bot.sendPhoto(chatId, picture);
      }catch (error){
        console.log(error);
      }
    }

    static async getFilm(chatId, bot, name, option) {
      try {
        let url;
        const search = option === 't' || option === 'i' ? Commands.filmSchema : Commands.searchSchema;
        if(option === 'i') {
          url = `https://www.omdbapi.com/?${option}=${name}${process.env.API_KEY}`;
        } else {
          url = `https://www.omdbapi.com/?${option}=${name.split(" ").join("+")}${process.env.API_KEY}`;
        }
        const request = https.request(url, (response) => {
          let data = "";
          response.on("data", (chunk) => {
            data = data + chunk.toString();
          });
          response.on("end", async () => {
            const body = JSON.parse(data);
            if(body.Error){
              await this.sendSticker(chatId, bot, Commands.errorPhotos[Math.floor(Math.random() * Commands.errorPhotos.length)])
              return this.sendMessage(chatId, bot, `Sorry, I did't find anything`)
            }
            if(option === 't' || option === 'i'){
              await this.sendPhoto(chatId, bot, body.Poster);
              return await this.sendMessage(chatId, bot, search(body), {parse_mode: "HTML",  reply_markup: {
                inline_keyboard: [
                    [{text: "Go to IMDB", url: `https://www.imdb.com/title/${body.imdbID}`}]
                ]
            } })
            } else {
              const films = body.Search
              for(const body of films) {
                await this.sendPhoto(chatId, bot, body.Poster);
                await this.sendMessage(chatId, bot, search(body), { parse_mode: "HTML", reply_markup: {
                  inline_keyboard: [
                      [{text: "Find this one", callback_data: `${body.imdbID}`}]
                  ]
              }  })
              }
            }
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

    static async question(chatId, bot, text, option) {
      let a = await bot.sendMessage(chatId, text, {
        reply_markup: JSON.stringify({ force_reply: true }),
      })
      bot.onReplyToMessage(
          a.chat.id,
          a.message_id,
          async msg => {
            text = msg.text
            await this.getFilm(chatId, bot, text, option);
          }
        )
    }
}

module.exports = Controller