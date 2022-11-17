require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const Text = require("./routes/text");

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

function run() {
  bot.setMyCommands([
    { command: "/start", description: "Start" },
    { command: "/info", description: "Your name and surname" },
    { command: "/film", description: "Your faivorite film" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    if (text === "/start") {
      Text.start(msg, bot);
    } else if (text === "/info") {
        Text.info(msg, bot)
    } else if (text === "/film") {
        Text.film(msg, bot)
    } else {
      return await bot.sendMessage(chatId, `I dont understand`);
    }
  });
}

run();