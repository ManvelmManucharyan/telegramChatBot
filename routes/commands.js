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

    static filmSchema(body) {
        console.log(body);
        return `
        <span class="tg-spoiler"><b>${body.Title}</b></span>
        
        Genres ${body.Genre}

        ${body.Plot}
        
        `
    }
}

module.exports = Commands