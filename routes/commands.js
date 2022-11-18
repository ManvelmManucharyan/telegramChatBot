class Commands {

    static commands = ["/start", "/film", "/search"]

    static descriptions = ["Start Bot", "Find a film", "Search"]

    static menu () {
        const result = [];
        for(let i = 0; i < this.commands.length; i++) {
            result.push({ command: this.commands[i], description: this.descriptions[i] })
        }
        return result;
    }

    static searchOptions = {
        replay_markup: JSON.stringify({
        })
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