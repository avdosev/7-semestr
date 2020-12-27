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