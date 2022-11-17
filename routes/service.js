const Controller = require("./controller");

class Text {
    static async start (msg, bot) {
        const chatId = msg.chat.id
        await Controller.sendSticker(chatId, bot, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp")
        return await Controller.sendMessage(chatId, bot, "Welcome to chat bot")
    }
    
    static async info (msg, bot) {
        const chatId = msg.chat.id
        return await Controller.sendMessage(chatId, bot, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
    }

    static async film (msg, bot) {
      const chatId = msg.chat.id
      return await Controller.getOneFilm(chatId, bot, "The Dark Knight")
    }

    static async search (msg, bot, text) {
      const chatId = msg.chat.id
      return await Controller.search(chatId, bot, text)
    }

    static async default (msg, bot) {
      const chatId = msg.chat.id
      return await Controller.sendMessage(chatId, bot, "I don't understand your commands")
    }
}

module.exports = Text