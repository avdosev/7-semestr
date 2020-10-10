import telebot
import re
token = "1251052833:AAE-ttwFtoCGpmnikPl2L3p6Hvld1iFIa54"
pattern = r"^(_|<|=|\.)+\d[a-zA-ZА-Яа-я]+\d(_|>|=|\.)+$"
bot = telebot.TeleBot(token)

@bot.message_handler(content_types=['text'])
def send_text(message):
    res = re.match(pattern, message.text)
    if res:
        bot.send_message(message.chat.id, "Такой никнейм доступен")
    else:
        bot.send_message(message.chat.id, "Никнейм не верен")
bot.polling()
