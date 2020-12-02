# We will use colours to define the state of a cell
# WHITE means a Dead cell
# BLACK means a Live Cell

import pygame   # Provides what we need to make a game
import random   # Can generate random numbers

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

# Create a list of colours
colours = []
colours.append((255, 255, 255))
colours.append((  0,   0,   0))
WHITE = 0
BLACK = 1

# Create 2 lists, one for each generation of cells
current_generation = [[WHITE for y in range(YCELLS)] for x in range(XCELLS)]
next_generation    = [[WHITE for y in range(YCELLS)] for x in range(XCELLS)]

# Define a function to initialise all the cells
def initGeneration(generation):
    for y in range(YCELLS):
        for x in range(XCELLS):
            color = WHITE if random.randint(0,1) == 1 else BLACK
            generation[x][y] = color
        
# Define a function to draw a square of colour(c) at coordinates, x and y
def drawCell(x, y, c):
    pygame.draw.rect(screen, colours[c], pygame.Rect(x * SIZE, y * SIZE, SIZE-1, SIZE-1))

# Define a function to update cells on screen from next_generation array
def update():
    global current_generation
    for y in range(YCELLS):
        for x in range(XCELLS):
            c = next_generation[x][y]
            drawCell(x, y, c)
    # Update current_generation
    current_generation = list(next_generation)

# Create a Live cell
def createLiveCell(x,y):
    global next_generation
    next_generation[x][y] = BLACK

# Kill a Live cell
def killLiveCell(x,y):
    global next_generation
    next_generation[x][y] = WHITE

# Function to check neighbour cell
def checkNeighbour(x, y):
    # Ignore cell off the edge of the grid
    if (x < 0) or (y < 0): return 0
    if (x >= XCELLS) or (y >= YCELLS): return 0
    # Check if cell is live
    if current_generation[x][y] == BLACK:
        return 1
    else:
        return 0
    
# Define a function to count neigbouring 8 cells if live
def countCellNeighbours(x,y):
    n = 0
    n += checkNeighbour(x-1, y-1)
    n += checkNeighbour(x-1, y)
    n += checkNeighbour(x-1, y+1)
    
    n += checkNeighbour(x, y-1)
    n += checkNeighbour(x, y+1)
    
    n += checkNeighbour(x+1, y-1)
    n += checkNeighbour(x+1, y)
    n += checkNeighbour(x+1, y+1)
    return(n)
    
# Define a function to breed the next generation of cells
def breedNextGeneration():
    global next_generation
    for y in range(YCELLS):
        for x in range(XCELLS):
            # If cell is live, count neighbouring live cells
            n = countCellNeighbours(x,y)
            c = current_generation[x][y]
            # If cell is live check rules 1, 2 and 3
            if c == BLACK:
                if (n < 2) or (n > 3):
                    # Cell dies (rules 1 and 3)
                    next_generation[x][y] = WHITE
                else:
                    # Cell lives on (rule 2)
                    next_generation[x][y] = BLACK
            else:
                if (n == 3):
                    # Cell is reborn (rule 4)
                    next_generation[x][y] = BLACK
                
# Initialise pygame
pygame.init()

# Set the window title
pygame.display.set_caption("Game of Life")

# Create the window
screen = pygame.display.set_mode(displaySize)

# Blank screen
screen.fill(BLACK)

# Initialise the generations
initGeneration(current_generation)

# Update the full display surface to the screen
pygame.display.flip()
      
# Create a clock to manage time
clock = pygame.time.Clock()

# Initialise variables
done = False
breedCells = False

initGeneration(next_generation)

historical_generation = []

# Runs the game loop
while not done:
    breedNextGeneration()

    
    for i, gen in enumerate(historical_generation):
        if i != 0 and i!=1 and gen == next_generation:
            # done = True
            print("Такой уже был", i, len(historical_generation))
            break

    historical_generation.append(next_generation)

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
        breedNextGeneration()
        
    # Update and draw 
    update()

    # Update the full display surface to the screen
    pygame.display.flip()

    # Limit the game to 30 frames per second
    clock.tick(60)


print('Quitting')
pygame.quit()
          