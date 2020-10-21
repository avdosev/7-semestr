import matplotlib.pyplot as plt
from config import charset, eachStringLength
import randomizer
from Plot import Plot
import time


def testFactory(testCount, randomizer, startDataCount, *args):
    resTimes = []
    dataArray = []
    for i in range(testCount):  # N замеров
        start_time = time.time()
        randomData = randomizer(startDataCount, *args) # тут мы от
        delta_time = time.time() - start_time
        resTimes.append(delta_time)
        dataArray.append(startDataCount)
        startDataCount*=2
    return resTimes, dataArray


def drawPlot(timeArray, dataArray, title):
    print(timeArray, dataArray)
    plt.plot(dataArray, timeArray)
    plt.ylabel("Время в секундах")
    plt.xlabel("Количество данных")
    plt.title(title)
    plt.show()


def normalFloatTest(testCount, startDataCount):
    (timeArray, dataArray) = testFactory(testCount, randomizer.getNormalFloat, startDataCount, 0.1, 0.5)
    drawPlot(timeArray, dataArray, "normal float")


def uniformNumbersTest(testCount, startDataCount):
    plot = Plot()

    (timeArray, dataArray) = testFactory(testCount, randomizer.getUniformFloat, startDataCount, 0, 1)
    plot.addPlot(timeArray, dataArray, "float")

    (timeArray, dataArray) = testFactory(testCount, randomizer.getUniformInt, startDataCount, 0, 150)
    plot.addPlot(timeArray, dataArray, "int")

    plot.setLabels("Количество данных", "Время в секундах")
    plot.draw("Uniform")


def stringTest(testCount, startDataCount):
    plot = Plot()
    strLength = 5
    for i in range(5):
        (timeArray, dataArray) = testFactory(testCount, randomizer.getRandomStrings, startDataCount, charset, strLength)
        plot.addPlot(timeArray, dataArray, strLength)
        strLength*=5
    plot.setLabels("Количество данных", "Время в секундах")
    plot.draw("Strings")



if __name__ == '__main__':
    testCount = 20
    startDataCount = 1000
    normalFloatTest(testCount, startDataCount)
    uniformNumbersTest(testCount, startDataCount)
    stringTest(10, 100)


