import matplotlib.pyplot as plt
from config import charset, eachStringLength
from randomizer import getRandomData
from timer import timeTest
import time


def testFactory(testCount, dataCount, type, distribution, min_value, max_value, std, mean, charset, strLength):
    resTimes = []
    dataArray = []
    for i in range(testCount):  # N замеров
        start_time = time.time()
        randomData = getRandomData(dataCount, type, distribution, min_value, max_value, std, mean, charset, strLength)
        delta_time = time.time() - start_time
        resTimes.append(delta_time)
        dataArray.append(dataCount)
        dataCount*=2
    return resTimes, dataArray


def drawPlot(timeArray, dataArray, title):
    print(timeArray, dataArray)
    plt.plot(dataArray, timeArray)
    plt.ylabel("Время в секундах")
    plt.xlabel("Количество данных")
    plt.title(title)
    plt.show()

def drawAccumulatedPlot():
    pass


def normalFloatTest():
    (timeArray, dataArray) = testFactory(17, 1000, "float", "normal", 0, 1, 0.2, 0.5, charset, 25)
    drawPlot(timeArray, dataArray, "normal float")


def stringTest():
    (timeArray, dataArray) = testFactory(17, 1000, "str", "normal", 0, 1, 0.2, 0.5, charset, 25)
    drawPlot(timeArray, dataArray, "string")


if __name__ == '__main__':
    normalFloatTest()
    stringTest()


