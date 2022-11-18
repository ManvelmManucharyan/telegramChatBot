const Controller = require("./controller");
const Commands = require("./commands")

class Service {
    static async start (chatId, bot, _, msg) {
        await Controller.sendSticker(chatId, bot, Commands.helloPhotos[Math.floor(Math.random() * Commands.helloPhotos.length)])
        return await Controller.sendMessage(chatId, bot, `Hello ${msg.from.first_name} ${msg.from.last_name}, welcome to film searcher chat bot`)
    }

    static async film (chatId, bot) {
      await Controller.question(chatId, bot, `Write what film you want to find?`, 't')
    }

    static async getById (chatId, bot, msg) {
      await Controller.getFilm(chatId, bot, msg, 'i')
    }

    static async search (chatId, bot, text) {
      await Controller.question(chatId, bot, `Write what film you want to find?`, 's')
    }

    static async commands (chatId, bot) {
      await Controller.sendMessage(chatId, bot, "Choose an action", Commands.searchOptions)
    }

    static async default (chatId, bot, msg) {
      if(!msg.reply_to_message){
        await Controller.sendSticker(chatId, bot, Commands.errorPhotos[Math.floor(Math.random() * Commands.errorPhotos.length)])
        return await Controller.sendMessage(chatId, bot, "I don't understand your commands")
      }
    }
}

module.exports = Service