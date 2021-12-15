const TelegramApi = require('node-telegram-bot-api')

const token = '2115914527:AAGqVwUSsvJ_cABngr_u3HquLksgFjwYEtM' 

const groupIdGlobal = '-1001629054956'
// https://api.telegram.org/bot2115914527:AAGqVwUSsvJ_cABngr_u3HquLksgFjwYEtM/getUpdates

const bot = new TelegramApi(token, {polling: true})


const agreedOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: 'Заказ принят', callback_data: 'Согласовано'},
                {text: 'заказ отменён', callback_data: 'Откланено'}
            ]
        ]
    })
}

const good = () => {
    bot.setMyCommands([
        {command: '/test', description: 'test'},
        {command: '/start', description: 'start'}
    ])
    bot.on('message', async msg => {
        const text = msg.text;
        const msgId = msg.message_id

        if (text === 'Заказ') {
            await bot.sendMessage(groupIdGlobal, `${text}`, agreedOptions)
        }
       
    })

    bot.on('callback_query', async msg => {
        const userName = msg.from.first_name;
        const data = msg.data
        const msgId = msg.message.message_id

        if (data === 'Согласовано') {
            await bot.sendMessage(groupIdGlobal, `Заказ принят! Пометил: ${userName}`)
        }

        if (data === 'Откланено') {
            await bot.sendMessage(groupIdGlobal, `Заказ отменён! Пометил: ${userName}`)
        }

    })
}

good()

