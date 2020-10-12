def findFirstArgIndex(message):
    minIndex = 99999
    for key in ['-c', '-d']:
        if (message.index(key) < minIndex):
            minIndex = message.index(key)
    return minIndex