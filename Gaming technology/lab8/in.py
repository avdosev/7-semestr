import time
from WorldState import WorldState
from Unit import Unit
import sys
from Cell import Empty, Coin, Wall, Healer
import curses
from constants import fullHealth

worldState1 = [
    [Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), ],
    [Wall(), Healer(), Empty(), Empty(), Empty(), Coin(), Coin(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Empty(), Wall(), Unit("2"), Unit("3"), Empty(), Empty(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Empty(), Wall(), Empty(), Empty(), Coin(), Empty(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Empty(), Coin(), Empty(), Empty(), Healer(), Empty(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Empty(), Empty(), Empty(), Empty(), Empty(), Empty(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Coin(), Empty(), Empty(), Empty(), Empty(), Coin(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Empty(), Empty(), Empty(), Empty(), Empty(), Empty(), Empty(), Unit("1"), Empty(), Wall()],
    [Wall(), Unit("4"), Empty(), Empty(), Empty(), Empty(), Healer(), Empty(), Empty(), Empty(), Wall()],
    [Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall(), Wall()],    

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

                        if (currentUnit.health < fullHealth - 3): # после 7 жизней, юнит пойдет за хп
                            healerDirection = worldState.hasHealerNear(row, cell)
                            if (healerDirection):
                                worldState.getFrom(row, cell, *healerDirection)
                                continue

                        attackDirection = worldState.hasNearEnemy(row, cell)
                        if (attackDirection):
                            worldState.attack(*attackDirection)                  
                            continue

                        itemDirection = worldState.hasItemNear(row, cell)
                        if (itemDirection):
                            worldState.getFrom(row, cell, *itemDirection)
                            continue

                        if (cell + 1 < len(worldState.data[row]) + 1):
                            worldState.moveUnit(row, cell, row, cell+1)
                        else:
                            worldState.moveUnit(row, cell, row, cell-1)

                        time.sleep(1)
                        worldState.print()
        finally:
            curses.echo()
            curses.nocbreak()
            curses.endwin()
