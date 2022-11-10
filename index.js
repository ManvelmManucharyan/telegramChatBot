require("dotenv").config()
const TelegramApi = require("node-telegram-bot-api");

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

function start () {
    bot.setMyCommands([
        {command: "/start", description: "Start"},
        {command: "/info", description: "Your name and surname"}
    ])
    
    bot.on('message', async msg=> {
        const text = msg.text
        const chatId = msg.chat.id
        if (text === "/start") {
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp")
            return await bot.sendMessage(chatId, `Welcome to ankap bot`);
        }
        if (text === "/info") {
            return await bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text === "/game") {
            await bot.sendMessage(chatId, '')
        }
        return await bot.sendMessage(chatId, `I dont understand`)

    })
}

start()