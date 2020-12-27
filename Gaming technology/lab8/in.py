import string
import random
from pprint import pprint
import time

class Cell:
    impl: str
    def isUnit(self):
        return self.impl.isdigit()
    def isEmpty(self):
        return self.impl == " "
    def isIncludesItem(self):
        return self.impl == "+" or self.impl == "O"


class Empty(Cell):
    impl = " "

class Healer(Cell):
    impl = "+"


class Coin(Cell):
    impl = "O"


class Wall(Cell):
    impl = "!"    


class Unit(Cell):
    impl: str
    health: int
    
    def __init__(self, implName):
        self.impl = implName
        self.health = 10
    
    def move(self, xdiff, ydiff):
        pass

class WorldState:
    data = []
    def __init__(self, worldStateArray):
        self.data = worldStateArray
    
    def moveUnit(self, oldX, oldY, newX, newY):
        unit = self.data[oldX][oldY] 
        self.data[oldX][oldY] = Empty()
        self.data[newX][newY] = unit

    def moveDown(self, row, cell):
        if row+1 < len(self.data):
            if self.data[row+1][cell].isEmpty():
                self.moveUnit(row, cell, row+1, cell)
            elif self.data[row+1][cell].isIncludesItem():
                self.getFrom(row, cell, row+1, cell)
        return True

    def moveUp(self, row, cell):       
        if row -1 >= 0:
            if self.data[row-1][cell].isEmpty():
                self.moveUnit(row, cell, row-1, cell)
            elif self.data[row-1][cell].isIncludesItem():
                self.getFrom(row, cell, row-1, cell)
        return True

    def moveRight(self, row, cell):
        if cell + 1 < len(self.data[row]):
            if self.data[row][cell+1].isEmpty():
                self.moveUnit(row, cell, row, cell+1)
            elif self.data[row][cell+1].isIncludesItem():
                self.getFrom(row, cell, row, cell+1)
        return True

    def moveLeft(self, row, cell):
        if cell -1 >= 0:
            if self.data[row][cell-1].isEmpty():
                self.moveUnit(row, cell, row, cell-1)
            elif self.data[row][cell-1].isIncludesItem():
                self.getFrom(row, cell, row, cell-1)
        return True

    def hasNearEnemy(self, row, cell):
        for i in range(1, 4):
            if row+i < len(self.data):
                if (self.data[row+i][cell].isUnit()):
                    return (row+i, cell)

            if cell + i < len(self.data[row]):
                if (self.data[row][cell+i].isUnit()):
                    return (row, cell+i)
        return None

    def die(self, row, cell):
        self.data[row][cell] = Empty()
        print(f"Dyied {self.data[row][cell].impl}")

    def attack(self, row, cell):
        self.data[row][cell].health -= 1
        print(f"Клетка {self.data[row][cell].impl} атакована. Здоровье: {self.data[row][cell].health}")

    def getFrom(self, oldX, oldY, newX, newY):
        unit = self.data[oldX][oldY] 
        self.data[oldX][oldY] = Empty()
        self.data[newX][newY] = unit
        # а также еще сделать эффект
        
    def hasItemNear(self, row, cell):
        for i in range(1, 4):
            if row+i < len(self.data):
                if (self.data[row+i][cell].isIncludesItem()):
                    return (row+i, cell)

            if cell + i < len(self.data[row]):
                if (self.data[row][cell+i].isIncludesItem()):
                    return (row, cell+i)
        return None
    
    def print(self):
        print("Стейт")
        for row in self.data:
            for cell in row:
                if cell.impl == ' ':
                    print("\' \'", end=", ")
                else:
                    print(cell.impl, end=", ")
            print()


units = list(string.digits)[1:]



worldState1 = [
    [Empty(), Unit("1"), Empty(), Empty(), Coin(), Empty()],
    [Empty(), Empty(), Empty(), Empty(), Coin(), Coin()],
    [Empty(), Wall(), Unit("2"), Unit("3"), Empty(), Empty()],
    [Empty(), Wall(), Empty(), Empty(), Coin(), Empty()],
    [Empty(), Coin(), Empty(), Empty(), Empty(), Empty()]
]

worldState = WorldState(worldState1)

worldState.print()

while True:
    for row in range(len(worldState.data)):
        for cell in range(len(worldState.data[row])):
            currentUnit = worldState.data[row][cell]

            if currentUnit.isUnit():

                if currentUnit.health <= 0:
                    worldState.die(row, cell)

                attackDirection = worldState.hasNearEnemy(row, cell)
                if (attackDirection):
                    worldState.attack(*attackDirection)                  
                else:
                    itemDirection = worldState.hasItemNear(row, cell)
                    if
                    print(itemDirection)

                time.sleep(1)
                worldState.print()

