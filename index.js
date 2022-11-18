require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const Service = require("./routes/service");
const Commands = require("./routes/commands");
const bot = new TelegramApi(process.env.TOKEN, { polling: true });

function run() {
  bot.setMyCommands(Commands.menu());

  bot.on("message", async (msg) => {
    try {
      const text = msg.text;
      const chatId = msg.chat.id
      Commands.commands.includes(text) ? Text[text.slice(1)](chatId, bot, text, msg) : Text.default(chatId, bot, msg);
    } catch (error) {
      console.log(error);
    }
  });

  bot.on("callback_query", async msg => {
    const text = msg.message.text;
    const chatId = msg.message.chat.id
    Service[msg.data](chatId, bot, msg) 
  });
}

run();