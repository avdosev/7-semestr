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

        
    def getFrom(self, oldX, oldY, newX, newY):
        unit = self.data[oldX][oldY] 
        self.data[oldX][oldY] = Empty()
        self.data[newX][newY] = unit
        # а также еще сделать эффект
        
    
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
    [Empty(), Wall(), Unit("2"), Empty(), Empty(), Empty()],
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
                if row+1 < len(worldState.data):
                    if worldState.data[row+1][cell].isEmpty():
                        worldState.moveUnit(row, cell, row+1, cell)
                    if worldState.data[row+1][cell].isIncludesItem():
                        worldState.moveUnit(row, cell, row+1, cell)
            
                if row -1 >= 0:
                    if worldState.data[row-1][cell].isEmpty():
                        worldState.moveUnit(row, cell, row-1, cell)
                    if worldState.data[row-1][cell].isIncludesItem():
                        worldState.moveUnit(row, cell, row-1, cell)


                if cell + 1 < len(worldState.data[row]):
                    if worldState.data[row][cell+1].isEmpty():
                        worldState.moveUnit(row, cell, row, cell+1)
                    if worldState.data[row][cell+1].isIncludesItem():
                        worldState.moveUnit(row, cell, row, cell+1)

                if cell -1 >= 0:
                    if worldState.data[row][cell-1].isEmpty():
                        worldState.moveUnit(row, cell, row, cell-1)
                    if worldState.data[row][cell-1].isIncludesItem():
                        worldState.moveUnit(row, cell, row, cell-1)
    time.sleep(1)
    worldState.print()

