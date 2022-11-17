class Commands {

    static commands = ["/start", "/info", "/film", "/button", "/search"]

    static descriptions = ["Start Bot", "Info about you", "Find a film", "Button", "Search film"]

    static menu () {
        const result = [];
        for(let i = 0; i < this.commands.length; i++) {
            result.push({ command: this.commands[i], description: this.descriptions[i] })
        }
        return result;
    }

    static searchOptions = {
        reply_markup: {
            inline_keyboard: [
                [{text: "Start", callback_data: "start"}, {text: "Info", callback_data: "info"}]
            ]
        }
    }

    static search = {
        reply_markup: {
            force_reply: false,
        },
      }
}

module.exports = Commands