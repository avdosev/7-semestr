import sys
from Cell import Empty
import random
import curses


class WorldState:
    data = []
    stdscr = None
    fieldHeight = 0

    def __init__(self, worldStateArray):
        self.data = worldStateArray
        self.stdscr = curses.initscr()
        self.fieldHeight = len(worldStateArray)
        curses.noecho()
        curses.cbreak()
    
    def moveUnit(self, oldX, oldY, newX, newY):
        resX = 0
        resY = 0
        if (newX < oldX):
            resX = oldX-1
        elif (newX > oldX):
            resX = oldX + 1
        else:
            resX = oldX

        if (newY < oldY):
            resY = oldY-1
        elif (newY > oldY):
            resY = oldY + 1
        else:
            resY = oldY
        

        if (self.data[resX][resY].isEmpty()):
            unit = self.data[oldX][oldY] 
            self.data[oldX][oldY] = Empty()
            self.data[resX][resY] = unit
            self.printLine(f"{unit.impl} переместился с {oldX}:{oldY} на {resX}:{resY}")

    def printLine(self, printableLine, row=None):
        if (row is None): 
            row = self.fieldHeight + 1
        self.stdscr.addstr(row, 0, printableLine)

    def hasNearEnemy(self, row, cell):
        for i in range(-3, 6):
            if i == 0:
                continue

            if row+i < len(self.data):
                if (self.data[row+i][cell].isUnit()):
                    return (row+i, cell)

            if cell + i < len(self.data[row]):
                if (self.data[row][cell+i].isUnit()):
                    return (row, cell+i)
        return None

    def die(self, row, cell):
        self.printLine(f"Dyied {self.data[row][cell].impl}")
        self.data[row][cell] = Empty()

    def attack(self, row, cell):
        self.data[row][cell].health -= 1
        self.printLine(f"Клетка {self.data[row][cell].impl} атакована. Здоровье: {self.data[row][cell].health}")


    def getFrom(self, oldX, oldY, newX, newY):
        if (abs(newX - oldX) <= 1 and abs(newY - oldY) <= 0):
            item = self.data[newX][newY]
            unit = self.data[oldX][oldY]
            if (item.impl == "+"):
                unit.health += 3
                self.printLine(f"{unit.impl} вылечил 3 здоровья, его здоровье")
            elif (item.impl == "O"):
                cost = random.randint(1, 3)
                unit.points += cost
                self.printLine(f"{unit.impl} подобрал {cost}, его счет: {unit.points}")    
        
        self.moveUnit(oldX, oldY, newX, newY)
        
        
    def hasItemNear(self, row, cell):
        return self.hasObjectNear(row, cell, False)
    
    def hasHealerNear(self, row, cell):
        return self.hasObjectNear(row, cell, True)

    def hasObjectNear(self, row, cell, isSearchHealer):
        for i in range(-3, 6):
            if i == 0:
                continue
            if row+i < len(self.data):
                operation = None
                if (isSearchHealer):
                    operation = self.data[row+i][cell].isIncludesHealer()
                else:
                    operation = self.data[row+i][cell].isIncludesItem()
            
                if (operation):
                    return (row+i, cell)

            if cell + i < len(self.data[row]):
                operation = None
                if (isSearchHealer):
                    operation = self.data[row][cell+i].isIncludesHealer()
                else:
                    operation = self.data[row][cell+i].isIncludesItem()
                
                if (operation):
                    return (row, cell+i)
        return None

    
    def print(self):
        for i, row in enumerate(self.data):
            printableRow = ""
            for cell in row:
                printableRow += f"{cell.impl} "
            self.stdscr.addstr(i+1, 0, printableRow)
        self.stdscr.refresh()
