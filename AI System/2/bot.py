import telebot
import re
from datetime import date, datetime
import sqlite3

token = "1350019173:AAGFPOSocR0SSK3vHNPAlDKFchESgcuyzQg"

bot = telebot.TeleBot(token)

keys = ['-c', '-d']
conn = sqlite3.connect('example.db', check_same_thread=False)
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS costs
             (transferDate date, products text, price real)''')
             

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


@bot.message_handler(content_types=['text'])
def send_text(message: str):
    args: list = message.text.split(" ")
    
    command = args[0]


    if command == "/spend":
        minIndex = findFirstArgIndex(args)

        products = [prod.replace(",", "") for prod in args[1:minIndex]]

        messageDate = findDate(args)
        cost = findCost(args)
        print(command)
        print(products)
        print(cost)
        print(messageDate)

        if datetime.strptime(messageDate, "%d.%m.%Y").date() > date.today():
            bot.send_message(message.chat.id, "О, вы из будущего, месье?")
            return

        c.execute('INSERT INTO costs VALUES (?, ?, ?)', (messageDate, ", ".join(products), cost))
        bot.send_message(message.chat.id, "Записали")
    if command == "/delete":
        c.execute('TRUNCATE costs')
        bot.send_message(message.chat.id, "История забыта, снова все сначала")
    if command == "/earned":
        pass
    if command == "/my_cost":
        c.execute('SELECT * FROM costs')
        records = c.fetchall()
        res_str = []
        for prod in records:
            cost_date, products, cost = prod
            res_str.append(f"За {cost}руб. было куплено {products}. Дата покупки: {cost_date} ")
        res_str.append("Оставшийся бюджет: ")
        bot.send_message(message.chat.id, "\n".join(res_str))

bot.polling()
