import string
from pprint import pprint
import time
from WorldState import WorldState
from Unit import Unit
import sys
from Cell import Empty, Coin, Wall
import curses


worldState1 = [
    [Empty(), Unit("1"), Empty(), Empty(), Coin(), Empty()],
    [Empty(), Empty(), Empty(), Empty(), Coin(), Coin()],
    [Empty(), Wall(), Unit("2"), Unit("3"), Empty(), Empty()],
    [Empty(), Wall(), Empty(), Empty(), Coin(), Empty()],
    [Empty(), Coin(), Empty(), Empty(), Empty(), Empty()]
]


if __name__ == "__main__":


    worldState = WorldState(worldState1)

    worldState.print()

    while True:
        try:
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
                                worldState.getFrom(row, cell, *itemDirection)
                            else:
                                if (cell + 1 < len(worldState.data[row])):
                                    worldState.moveUnit(row, cell, row, cell+1)
                                else:
                                    worldState.moveUnit(row, cell, row, cell-1)

                        time.sleep(1)
                        worldState.print()
        finally:
            curses.echo()
            curses.nocbreak()
            curses.endwin()
