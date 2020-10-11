import telebot
import re
from datetime import date, datetime
from fileHelper import create, write, clear, read
token = "1350019173:AAGFPOSocR0SSK3vHNPAlDKFchESgcuyzQg"

bot = telebot.TeleBot(token)

keys = ['-c', '-d']
file = create()


def findFirstArgIndex(message):
    minIndex = 99999
    for key in keys:
        if (message.index(key) < minIndex):
            minIndex = message.index(key)
    return minIndex


def findCost(message):
    i = message.index(keys[0])+1
    return message[i]

def findDate(message):
    i = message.index(keys[1])+1
    return message[i]

def operation(args, message, isSpend):
    minIndex = findFirstArgIndex(args)

    products = [prod.replace(",", "") for prod in args[1:minIndex]]

    messageDate = findDate(args)
    cost = findCost(args)

    if datetime.strptime(messageDate, "%d.%m.%Y").date() > date.today():
        bot.send_message(message.chat.id, "О, вы из будущего, месье?")
        return
    write(file, messageDate, products, cost, isSpend)
    bot.send_message(message.chat.id, "Записали")


@bot.message_handler(content_types=['text'])
def send_text(message: str):
    args: list = message.text.split(" ")
    
    command = args[0]

    if command == "/spend":
        operation(args, message, True)
    if command == "/delete":
        clear(file)
        bot.send_message(message.chat.id, "История забыта, снова все сначала")
    if command == "/earned":
        operation(args, message, False)
    if command == "/my_cost":
        records = read(file)
        res_str = []
        finalSum = 0
        for prod in records:
            cost_date, products, cost, isSpend = prod
            if isSpend:
                finalSum -= cost
                res_str.append(f"За {cost}руб. было куплено {products}. Дата покупки: {cost_date} ")
            else:
                finalSum += cost
                res_str.append(f"{cost}руб. было получено {products}. Дата получения: {cost_date} ")

        res_str.append(f"Оставшийся бюджет: {finalSum}")
        bot.send_message(message.chat.id, "\n".join(res_str))

bot.polling()
