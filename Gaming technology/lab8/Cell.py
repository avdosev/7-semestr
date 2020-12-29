class Cell:
    impl: str
    def isUnit(self):
        return self.impl.isdigit()
    def isEmpty(self):
        return self.impl != "!" or self.impl.isdigit()   
    def isIncludesItem(self):
        return self.impl == "O"
    def isIncludesHealer(self):
        return self.impl == "+"  

class Empty(Cell):
    impl = " "

class Healer(Cell):
    impl = "+"

class Coin(Cell):
    impl = "O"

class Wall(Cell):
    impl = "!"   