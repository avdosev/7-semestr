

class WorldState:
    data = []
    def __init__(self, worldStateArray):
        self.data = worldStateArray
    
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
        

        unit = self.data[oldX][oldY] 
        self.data[oldX][oldY] = Empty()
        self.data[resX][resY] = unit
        print(f"{unit.impl} переместился с {oldX}:{oldY} на {resX}:{resY}")



    def hasNearEnemy(self, row, cell):
        for i in range(-1, 2):
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
        self.data[row][cell] = Empty()
        print(f"Dyied {self.data[row][cell].impl}")

    def attack(self, row, cell):
        self.data[row][cell].health -= 1
        print(f"Клетка {self.data[row][cell].impl} атакована. Здоровье: {self.data[row][cell].health}")

    def getFrom(self, oldX, oldY, newX, newY):
        if (abs(newX - oldX) <= 1 and abs(newY - oldY) <= 0):
            item = self.data[newX][newY]
            unit = self.data[oldX][oldY]
            if (item.impl == "+"):
                unit.health += 3
                print(f"{unit.impl} вылечил 3 здоровья, его здоровье")
            elif (item.impl == "O"):
                cost = random.randint(1, 3)
                unit.points += cost
                print(f"{unit.impl} подобрал монетку {cost}, его счет: {unit.points}")    
        
        self.moveUnit(oldX, oldY, newX, newY)
        
        
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
        for row in self.data:
            for cell in row:
                print(f"\'{cell.impl}\'", end=", ")
            print()
