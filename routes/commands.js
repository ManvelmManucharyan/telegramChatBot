class Commands {

    static commands = ["/start", "/info", "/film"]

    static descriptions = ["Start Bot", "Info about you", "Search Film"]

    static menu () {
        const result = [];
        for(let i = 0; i < this.commands.length; i++) {
            result.push({ command: this.commands[i], description: this.descriptions[i] })
        }
        return result;
    }
}

module.exports = Commands