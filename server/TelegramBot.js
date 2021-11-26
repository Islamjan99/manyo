const TelegramApi = require('node-telegram-bot-api')

const token = '2109088878:AAE08KXx8W-JNIHFZr13k4Hy4QGrjkF6kF4'

const bot = new TelegramApi(token, {poling: true})

bot.on('message', msg => {
    const {id: id, first_name: userName} = msg.chat

    if (/Привет/gi.test(msg.text)) {
        bot.sendMessage(id,`Привет${userName}`)
    }

    console.log(msg);
})