import numpy as np
from config import eachStringLength
import random
import scipy.stats as ss


def getUniformInt(dataCount, minValue, maxValue):  # Return random integers from the "discrete uniform" distribution
    return np.random.randint(minValue, maxValue, dataCount)


def getNormalInt(dataCount, mean, std, minValue, maxValue):
    x = np.arange(minValue, maxValue)
    xU, xL = x + 0.5, x - 0.5
    prob = ss.norm.cdf(xU, scale=3) - ss.norm.cdf(xL, scale=3) # Cumulative distribution function of the given RV.
    prob = prob / prob.sum()  # normalize the probabilities so their sum is 1
    nums = np.random.choice(x, size=dataCount, p=prob)
    return nums


def getNormalFloat(dataCount, mean, std):
    return np.random.normal(mean, std, dataCount)


def getUniformFloat(dataCount, minValue, maxValue):
    return np.random.uniform(minValue, maxValue, dataCount)


def getRandomString(dataCount, charset, symbolsCountOfEachString):
    res = []

    for i in range(dataCount):
        data = [np.random.choice(list(charset)) for i in range(symbolsCountOfEachString)]
        s_data = "".join(data)
        res.append(s_data)

    return res




def getRandomData(dataCount, type, distribution, minValue, maxValue, std, mean, charset):
    randomNumber = []

    if type == 'int':
        if distribution == 'uniform':
            randomNumber = getUniformInt(dataCount, minValue, maxValue)
        elif distribution == 'normal':
            randomNumber = getNormalInt(dataCount, mean, std, minValue, maxValue)
    elif type == 'float':
        if distribution == 'uniform':
            randomNumber = getUniformFloat(dataCount, minValue, maxValue)
        elif distribution == 'normal':
            randomNumber = getNormalFloat(dataCount, mean, std)
    elif type == "str":
        randomNumber = getRandomString(dataCount, charset, eachStringLength)
    else:
        raise Exception("Unknown type")

    return randomNumber
