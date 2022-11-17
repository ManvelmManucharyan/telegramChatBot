require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const Text = require("./routes/service");
const Commands = require("./routes/commands");
const bot = new TelegramApi(process.env.TOKEN, { polling: true });

function run() {
  bot.setMyCommands(Commands.menu());

  bot.on("message", async (msg) => {
    try {
      const text = msg.text;
      Commands.commands.includes(text) ? Text[text.slice(1)](msg, bot) : Text.default(msg, bot);
    } catch (error) {
      console.log(error);
    }
  });
}

run();