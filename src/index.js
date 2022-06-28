import TelegramBot from 'node-telegram-bot-api'

const TOKEN = '5533925813:AAEnCfZmxmxc7pwTYQR7aHZE96iY-1bO9l4'
const chatId = 1554040225

const bot = new TelegramBot(TOKEN, { polling: true })

const users = {}

bot.on('message', (message) => {
    const msgChatId = message.chat.id
    const messageId = message.message_id

    const isReply = !!message.reply_to_message
    const replyMesageId = message.reply_to_message?.message_id - 1

    users[messageId] = msgChatId

    if (isReply && replyMesageId && msgChatId == chatId) {
        bot.copyMessage(
            users[replyMesageId],
            chatId,
            messageId, {
                protect_content: true,
                reply_to_message_id: replyMesageId
            }
        )
    } else if (msgChatId != chatId) {
        bot.forwardMessage(chatId, msgChatId, messageId)
    }
})


