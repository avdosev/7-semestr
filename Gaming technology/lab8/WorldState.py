
def generateWorldState(width: int, height: int):
    worldState = []
    for i in range(width):
        ws = []
        for j in range(height):
            randomElement = random.choice(elements)
            if isinstance(randomElement, list):
                randomElement = random.choice(randomElement)
            ws.append(randomElement)
        worldState.append(ws)
    return worldState

worldState  = generateWorldState(5, 10)