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
        resX = 0
        resY = 0
        if (newX < oldX):
            resX = oldX-1
        else:
            resX = oldX + 1

        if (newY < oldY):
            resY = oldY-1
        else:
            resY = oldY + 1

        unit = self.data[oldX][oldY] 
        self.data[oldX][oldY] = Empty()
        self.data[resX][resY] = unit
        print(f"{unit.impl} переместился с {oldX}:{oldY} на {resX}:{resY}")



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
                    if (itemDirection):
                        worldState.moveUnit(row, cell, *itemDirection)

                time.sleep(1)
                worldState.print()

