import pygame   # Provides what we need to make a game
import random   # Can generate random numbers


WHITE = 0
BLACK = 1


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
    
    colours = []

    # current_generation = [[WHITE for y in range(YCELLS)] for x in range(XCELLS)]
    # next_generation    = [[WHITE for y in range(YCELLS)] for x in range(XCELLS)]
    
    @property
    def current_generation(self):
        return [[WHITE for y in range(self.YCELLS)] for x in range(self.XCELLS)]
    
    @property
    def next_generation(self):
        return [[WHITE for y in range(self.YCELLS)] for x in range(self.XCELLS)]
    
    
    # Create a Live cell
    def init_game(self):
        # Initialise pygame
        pygame.init()

        # Set the window title
        pygame.display.set_caption("Game of Life")

        # Create the window
        self.screen = pygame.display.set_mode(self.displaySize)

        # Blank screen
        self.screen.fill(BLACK)
        
        self.colours.append((255, 255, 255))
        self.colours.append((  0,   0,   0))

    
    def createLiveCell(self, x,y):
        self.next_generation[x][y] = BLACK

    # Kill a Live cell
    def killLiveCell(self, x,y):
        self.next_generation[x][y] = WHITE
        
    # Define a function to breed the next generation of cells
    def breedNextGeneration(self):
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                # If cell is live, count neighbouring live cells
                n = self.countCellNeighbours(x,y)
                c = self.current_generation[x][y]
                # If cell is live check rules 1, 2 and 3
                if c == BLACK:
                    if (n < 2) or (n > 3):
                        # Cell dies (rules 1 and 3)
                        self.next_generation[x][y] = WHITE
                    else:
                        # Cell lives on (rule 2)
                        self.next_generation[x][y] = BLACK
                else:
                    if (n == 3):
                        # Cell is reborn (rule 4)
                        self.next_generation[x][y] = BLACK
            
        
        # Define a function to initialise all the cells
    def initGeneration(self, generation):
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                color = WHITE if random.randint(0,1) == 1 else BLACK
                generation[x][y] = color
            


    def run(self, ):
        self.initGeneration(self.current_generation)

        # Update the full display surface to the screen
        pygame.display.flip()
            
        # Create a clock to manage time
        clock = pygame.time.Clock()

        # Initialise variables
        done = False
        breedCells = False

        self.initGeneration(self.next_generation)

        historical_generation = []

        # Runs the game loop
        while not done:
            self.breedNextGeneration()

            
            for i, gen in enumerate(historical_generation):
                if i != 0 and i!=1 and gen == self.next_generation:
                    # done = True
                    print("Такой уже был", i, len(historical_generation))
                    break

            historical_generation.append(self.next_generation)

            # The code here runs when every frame is drawn
            # Get any events that have occurred, like close button(X) clicked
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True

                # Check for q, g, s or w keys
                if event.type == pygame.KEYUP:
                    if event.key == pygame.K_q:
                        done = True
                
            if breedCells:
                self.breedNextGeneration()
                
            # Update and draw 
            self.update()

            # Update the full display surface to the screen
            pygame.display.flip()

            # Limit the game to 30 frames per second
            clock.tick(60)
            print('Quitting')
            pygame.quit()
          


    # Define a function to draw a square of colour(c) at coordinates, x and y
    def drawCell(self, x, y, c):
        pygame.draw.rect(self.screen, self.colours[c], pygame.Rect(x * self.SIZE, y * self.SIZE, self.SIZE-1, self.SIZE-1))

    # Define a function to update cells on screen from next_generation array
    def update(self, ):
        global current_generation
        for y in range(self.YCELLS):
            for x in range(self.XCELLS):
                c = self.next_generation[x][y]
                self.drawCell(x, y, c)
        # Update current_generation
        current_generation = list(self.next_generation)

        
    # Function to check neighbour cell
    def checkNeighbour(self, x, y):
        # Ignore cell off the edge of the grid
        if (x < 0) or (y < 0): return 0
        if (x >= self.XCELLS) or (y >= self.YCELLS): return 0
        # Check if cell is live
        if self.current_generation[x][y] == BLACK:
            return 1
        else:
            return 0
        
    # Define a function to count neigbouring 8 cells if live
    def countCellNeighbours(self, x,y):
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