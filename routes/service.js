const Controller = require("./controller");

class Text {
    static async start (chatId, bot, _, msg) {
        await Controller.sendSticker(chatId, bot, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp")
        return await Controller.sendMessage(chatId, bot, `Hello ${msg.from.first_name} ${msg.from.last_name}, welcome to film searcher chat bot`)
    }

    static async film (chatId, bot) {
      await Controller.question(chatId, bot, `Write what film you want to find?`, 't')
    }

    static async search (chatId, bot, text) {
      await Controller.question(chatId, bot, `Write what film you want to find?`, 's')
    }

    static async default (chatId, bot, msg) {
      if(!msg.reply_to_message){
        return await Controller.sendMessage(chatId, bot, "I don't understand your commands")
      }
    }
}

module.exports = Text