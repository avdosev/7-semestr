import pygame   
import random 
import utils
from config import ALIVE, DEAD



class GameOfLife:
    # Define dimensions of grid
    DISPLAY_WIDTH = 640
    DISPLAY_HEIGHT = 480
    HALF_DISPLAY_WIDTH = DISPLAY_WIDTH / 2
    HALF_DISPLAY_HEIGHT = DISPLAY_HEIGHT / 2
    displaySize = (DISPLAY_WIDTH, DISPLAY_HEIGHT)

    # Define size and number of cells
    SIZE = 16
    XCELLS = int(DISPLAY_WIDTH/SIZE)
    YCELLS = int(DISPLAY_HEIGHT/SIZE)


    currentGeneration = []
    nextGeneration = []

    def __init__(self, displayWidth=640, displayHeight=480, size=16):
        self.currentGeneration = self.allocateGenerationSize()
        self.nextGeneration = self.allocateGenerationSize()
        self.DISPLAY_HEIGHT = displayHeight
        self.DISPLAY_WIDTH = displayWidth
        self.HALF_DISPLAY_HEIGHT = displayHeight / 2
        self.HALF_DISPLAY_WIDTH = displayWidth / 2
        self.displaySize = (displayWidth, displayHeight)
        self.SIZE = size
        self.XCELLS = int(displayWidth/size)
        self.YCELLS = int(displayHeight/size)


    def allocateGenerationSize(self):
        return [[ALIVE for y in range(self.YCELLS)] for x in range(self.XCELLS)]

    def createLiveCell(self, x, y):
        self.nextGeneration[x][y] = DEAD

    def killLiveCell(self, x, y):
        self.nextGeneration[x][y] = ALIVE


    def breedNextGeneration(self):
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                liveNeightbours = self.countCellNeighbours(x, y)
                c = self.currentGeneration[x][y]
                # If cell is live check rules 1, 2 and 3
                if c == DEAD:
                    if (liveNeightbours < 2) or (liveNeightbours > 3):
                        # Cell dies (rules 1 and 3)
                        self.nextGeneration[x][y] = ALIVE
                    else:
                        # Cell lives on (rule 2)
                        self.nextGeneration[x][y] = DEAD
                else:
                    if (liveNeightbours == 3):
                        # Cell is reborn (rule 4)
                        self.nextGeneration[x][y] = DEAD


    def initGeneration(self, generation):
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                color = ALIVE if random.randint(0, 1) == 1 else DEAD
                generation[x][y] = color

    def isNotAliveCells(self):
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                if self.currentGeneration[x][y] == ALIVE:
                    return False
        return True
                    

    def prerun(self):
        pygame.init()
        pygame.display.set_caption("Conway's Game of Life")

        self.screen = pygame.display.set_mode(self.displaySize)
        self.screen.fill(DEAD)
        self.initGeneration(self.currentGeneration)
        pygame.display.flip()


    def runIteration(self, historicalGenerations):
        self.breedNextGeneration()
        if self.isNotAliveCells():
            print("All cells are dead")
            return True
        
        if self.nextGeneration == self.currentGeneration:
            print("System in a stable position")  
            return True  
        
        for i,gen in enumerate(historicalGenerations):
            if gen == self.currentGeneration:
                print(f"Repeat on {i} iteration")
                return True
        historicalGenerations.append(self.currentGeneration)
        return False

    def startGameLoop(self):
        self.prerun()
        clock = pygame.time.Clock()
        # self.initGeneration(self.nextGeneration)

        done = False
        breedCells = False
        historicalGenerations = []
        
        while not done:

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True
                # handle Mouse
                if event.type == pygame.MOUSEBUTTONDOWN:
                    pos = pygame.mouse.get_pos()
                    x = int(pos[0] / self.SIZE)
                    y = int(pos[1] / self.SIZE)
                    if self.nextGeneration[x][y] == ALIVE:
                        self.createLiveCell(x, y)
                    else:
                        self.killLiveCell(x, y)

                # Check for q, g, s or w keys
                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_q:
                        done = True
                    elif event.key == pygame.K_SPACE:
                        done = self.runIteration(historicalGenerations)
                    elif event.key == pygame.K_g:
                        breedCells = True
                    elif event.key == pygame.K_s:
                        breedCells = False
                    elif event.key == pygame.K_w:
                        breedCells = False
                        self.initGeneration(self.nextGeneration)

            if breedCells:
                done = self.runIteration(historicalGenerations)

            # Update and draw
            self.update()
            pygame.display.flip()

            # Limit the game to 30 frames per second
            clock.tick(60)

        
        isQuit = False
        while not isQuit:
             for event in pygame.event.get():
                if event.type == pygame.QUIT or event.type == pygame.KEYUP:
                    isQuit = True
        pygame.quit()
                    
        


    def drawCell(self, x, y, cellState):
        pygame.draw.rect(self.screen, utils.getColors()[cellState], pygame.Rect(
            x * self.SIZE, y * self.SIZE, self.SIZE-1, self.SIZE-1))

    def update(self):
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                cellState = self.nextGeneration[x][y]
                self.drawCell(x, y, cellState)
        self.currentGeneration = list(self.nextGeneration)

    def checkNeighbour(self, x, y):
        # Ignore cell off the edge of the grid
        if (x < 0) or (y < 0):
            return 0
        if (x >= self.XCELLS) or (y >= self.YCELLS):
            return 0

        return self.currentGeneration[x][y] == DEAD

    # Define a function to count neigbouring 8 cells if live
    def countCellNeighbours(self, x, y):
        n = 0
        n += self.checkNeighbour(x-1, y-1)
        n += self.checkNeighbour(x-1, y)
        n += self.checkNeighbour(x-1, y+1)

        n += self.checkNeighbour(x, y-1)
        n += self.checkNeighbour(x, y+1)

        n += self.checkNeighbour(x+1, y-1)
        n += self.checkNeighbour(x+1, y)
        n += self.checkNeighbour(x+1, y+1)
        return(n)
