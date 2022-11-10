class Commands {

    static commands = ["/start", "/info", "/film", "/search"]

    static descriptions = ["Start Bot", "Info about you", "Find a film", "Search"]

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
}

module.exports = Commands