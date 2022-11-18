class Commands {

    static commands = ["/start", "/film", "/search", "/commands"]

    static descriptions = ["Welcome", "Find a film", "Search film",  "Choose command"]

    static menu () {
        const result = [];
        for(let i = 0; i < this.commands.length; i++) {
            result.push({ command: this.commands[i], description: this.descriptions[i] })
        }
        return result;
    }

    static searchOptions = {
        reply_markup: {
            force_reply: true,
            inline_keyboard: [
                [{text: "Start", callback_data: "start"}, {text: "Find a film", callback_data: "film"}, {text: "Search film", callback_data: "search"}]
            ]
        }
    }

    static filmSchema(body) {
        return `<b>Title:</b> ${body.Title}\n\n<b>Rated:</b> ${body.Rated}\n\n<b>Type:</b> ${body.Type[0].toUpperCase()}${body.Type.substring(1)}\n\n<b>Country:</b> ${body.Country}\n\n<b>Genres:</b> ${body.Genre}\n\n<b>Director</b>: ${body.Director}\n\n<b>Writer:</b> ${body.Writer}\n\n<b>Actors:</b> ${body.Actors}\n\n<b>Synopsis:</b> ${body.Plot}\n\n<b>Released:</b> ${body.Released}\n\n<b>Awards:</b> ${body.Awards? body.Awards : "None"}\n\n<b>Ratings:</b>\nIMDB: ${body.imdbRating}${body.Ratings[1] ? '\n' + body.Ratings[1].Source + ':' + ' ' + body.Ratings[1].Value : ''}${body.Ratings[2] ? '\n' + body.Ratings[2].Source + ':' + ' ' + body.Ratings[2].Value : ''}\n\n<b>Runtime:</b> ${body.Runtime}`
    }

    static searchSchema(body) {
        return (`<b>Title:</b> ${body.Title}\n\n<b>Released:</b> ${body.Year}`)
    }

    static helloPhotos = [
        "https://tlgrm.eu/_/stickers/d2f/15f/d2f15f59-b878-3772-a07b-5aee1ce6d94d/2.webp",
        "https://tlgrm.eu/_/stickers/f60/d25/f60d2558-9ed6-3d87-9c08-28159f155901/6.webp",
        "https://tlgrm.eu/_/stickers/f8d/4be/f8d4be0f-0dbb-3e65-a6c8-d9e00d599e94/4.webp",
        "https://tlgrm.eu/_/stickers/3e5/ebd/3e5ebd66-48f9-3202-a195-a6bd19aaf939/192/16.webp",
        "https://tlgrm.eu/_/stickers/3e5/ebd/3e5ebd66-48f9-3202-a195-a6bd19aaf939/192/28.webp",
        "https://tlgrm.eu/_/stickers/193/c9b/193c9bed-34e4-3547-b71f-72c54319e1d6/9.webp",
        "https://tlgrm.eu/_/stickers/8dc/431/8dc43104-5d6c-3f40-abb0-90e09b7575b6/192/40.webp",
        "https://tlgrm.eu/_/stickers/8dc/431/8dc43104-5d6c-3f40-abb0-90e09b7575b6/192/25.webp",
        "https://tlgrm.eu/_/stickers/d2f/15f/d2f15f59-b878-3772-a07b-5aee1ce6d94d/5.webp",
        "https://tlgrm.eu/_/stickers/d2f/15f/d2f15f59-b878-3772-a07b-5aee1ce6d94d/4.webp",
        "https://tlgrm.eu/_/stickers/bf6/05b/bf605b4f-3b20-451f-9909-69befb421384/5.webp",
        "https://tlgrm.eu/_/stickers/193/c9b/193c9bed-34e4-3547-b71f-72c54319e1d6/7.webp",
        "https://tlgrm.eu/_/stickers/193/c9b/193c9bed-34e4-3547-b71f-72c54319e1d6/1.webp",
        "https://tlgrm.eu/_/stickers/4e9/fd3/4e9fd3d3-6cb0-3fea-910b-682562749cf2/7.webp",
        "https://tlgrm.eu/_/stickers/3e5/ebd/3e5ebd66-48f9-3202-a195-a6bd19aaf939/1.webp",
        "https://tlgrm.eu/_/stickers/82e/b34/82eb3473-33a5-494a-bcc2-afcc852cb573/2.webp"
    ]

    static errorPhotos = [
        "https://tlgrm.eu/_/stickers/c55/f51/c55f510c-1222-31d1-90c9-0b75e29439aa/192/16.webp",
        "https://tlgrm.eu/_/stickers/c55/f51/c55f510c-1222-31d1-90c9-0b75e29439aa/5.webp",
        "https://tlgrm.eu/_/stickers/8dc/431/8dc43104-5d6c-3f40-abb0-90e09b7575b6/192/34.webp",
        "https://tlgrm.eu/_/stickers/e42/2fe/e422fe0a-a025-39b1-94bd-359625e6db47/7.webp",
        "https://tlgrm.eu/_/stickers/bf6/05b/bf605b4f-3b20-451f-9909-69befb421384/4.webp",
        "https://tlgrm.eu/_/stickers/193/c9b/193c9bed-34e4-3547-b71f-72c54319e1d6/192/14.webp",
        "https://tlgrm.eu/_/stickers/4e9/fd3/4e9fd3d3-6cb0-3fea-910b-682562749cf2/4.webp",
        "https://tlgrm.eu/_/stickers/4e9/fd3/4e9fd3d3-6cb0-3fea-910b-682562749cf2/10.webp",
        "https://tlgrm.eu/_/stickers/3f1/130/3f113095-1997-460c-8544-0dd663ec9c8d/8.webp",
        "https://tlgrm.eu/_/stickers/f8d/4be/f8d4be0f-0dbb-3e65-a6c8-d9e00d599e94/192/15.webp",
        "https://tlgrm.eu/_/stickers/3e5/ebd/3e5ebd66-48f9-3202-a195-a6bd19aaf939/11.webp",
        "https://tlgrm.eu/_/stickers/82e/b34/82eb3473-33a5-494a-bcc2-afcc852cb573/192/14.webp",
        "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp"
    ]
}

module.exports = Commands