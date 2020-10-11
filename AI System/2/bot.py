import telebot
import re
from datetime import date, datetime
from fileHelper import create, write, clear, read
token = "1350019173:AAGFPOSocR0SSK3vHNPAlDKFchESgcuyzQg"

bot = telebot.TeleBot(token)

file = create()

def findFirstArgIndex(message):
    minIndex = 99999
    for key in ['-c', '-d']:
        if (message.index(key) < minIndex):
            minIndex = message.index(key)
    return minIndex

def findCost(message):
    pattern = r"-c \d+\.?\d"
    return re.findall(pattern, message)

def findDate(message):
    pattern = r"-d \d\d\.\d\d\.\d{4}"
    return re.findall(pattern, message)

def findCommand(message):
    pattern = r"(\/spend)|(\/earned)|(\/my_list)|(\/delete)"
    return re.findall(pattern, message)


def operation(args, message, isSpend):
    messageDate = findDate(message.text)
    if len(messageDate) == 0:
        bot.send_message(message.chat.id, "Не указана дата")
        return
    cost = findCost(message.text)
    if len(cost) == 0:
        bot.send_message(message.chat.id, "Не указана сумма")
        return

    messageDate = messageDate[0].replace("-d ", "")
    cost = cost[0].replace("-c ", "")

    if datetime.strptime(messageDate, "%d.%m.%Y").date() > date.today():
        bot.send_message(message.chat.id, "О, вы из будущего, месье?")
        return

    minIndex = findFirstArgIndex(args)
    products = [prod.replace(",", "") for prod in args[1:minIndex]]

    write(file, messageDate, products, cost, isSpend)
    bot.send_message(message.chat.id, "Записали")


@bot.message_handler(content_types=['text'])
def send_text(message: str):
    args: list = message.text.split(" ")
    
    command = findCommand(message.text)

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
