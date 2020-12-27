from Cell import Cell

class Unit(Cell):
    impl: str
    health: int
    points: int
    
    def __init__(self, implName):
        self.impl = implName
        self.health = 10
        self.points = 0
    
    def move(self, xdiff, ydiff):
        pass