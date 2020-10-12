import sqlite3

def create():
    conn = sqlite3.connect('example.db', check_same_thread=False)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS costs
                (transferDate date, products text, price real, isSpend bool)''')
    return c


def write(c, messageDate, products, cost, isSpend):
    print(messageDate, products, cost)
    c.execute('INSERT INTO costs VALUES (?, ?, ?, ?)', (messageDate, ", ".join(products), cost, isSpend))

def clear(c):
    c.execute('DELETE FROM costs')

def read(c):
    c.execute('SELECT * FROM costs')
    records = c.fetchall()
    return records