const Controller = require("./controller");

class Service {
    static async start (chatId, bot) {
        await Controller.sendSticker(chatId, bot, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp")
        return await Controller.sendMessage(chatId, bot, "Welcome to chat bot")
    }
    
    static async info (chatId, bot, msg) {
        return await Controller.sendMessage(chatId, bot, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
    }

    static async film (chatId, bot) {
      return await Controller.getOneFilm(chatId, bot, "The Dark Knight")
    }

    static async search (chatId, bot, text) {
      await Controller.onText(chatId, bot, "Write name");
    }

    static async button (chatId, bot, text) {
      await Controller.button(chatId, bot, text)
    }

    static async default (chatId, bot) {
      return await Controller.sendMessage(chatId, bot, "I don't understand your commands")
    }
}

module.exports = Service