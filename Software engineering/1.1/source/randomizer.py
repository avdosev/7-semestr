import numpy as np
import scipy.stats as ss
from timer import timeTest
import sys


def getUniformInt(dataCount: int, minValue, maxValue):
    """
    :param dataCount: Size of result data
    :param minValue: Lowest (signed) integer to be drawn from the distribution
    :param maxValue: One above the largest (signed) integer to be drawn from the distribution
    :return: random integers from the "discrete uniform" distribution
    """
    return np.random.randint(minValue, maxValue, dataCount)


def getNormalInt(dataCount, mean, std, minValue, maxValue):
    """
    Compute normal distributed integer values

    .. deprecated:: 0.1
        Not required now
    """
    x = np.arange(minValue, maxValue)
    xU, xL = x + 0.5, x - 0.5
    prob = ss.norm.cdf(xU, scale=3) - ss.norm.cdf(xL, scale=3) # Cumulative distribution function of the given RV.
    prob = prob / prob.sum()  # normalize the probabilities so their sum is 1
    nums = np.random.choice(x, size=dataCount, p=prob)
    return nums


def getNormalFloat(dataCount, mean, std):
    """
    :param mean: float or array_like of floats Mean ("centre") of the distribution.
    :param std: float or array_like of floats Standard deviation (spread or "width") of the distribution. Must be non-negative.
    :param dataCount: int Size of output data
    :return: Normal distributed floated values"""

    return np.random.normal(mean, std, dataCount)


def getUniformFloat(dataCount, minValue, maxValue):
    """
    :param dataCount: int Size of output data
    :param minValue: integer, minimum value for uniform distribution
    :param maxValue: integer, maximum value for uniform distribution
    :return: Uniform distributed floated values
    """
    return np.random.uniform(minValue, maxValue, dataCount)


def getRandomString(charset, symbolsCountOfEachString: int):
    """
    :param charset: List of symbols, which will be included in resulted string
    :param symbolsCountOfEachString: int, resulted string length
    :return: Random string
    """
    return "".join(np.random.choice(list(charset), symbolsCountOfEachString))


def getRandomStrings(dataCount, charset, symbolsCountOfEachString):
    """
    :param dataCount: int Size of output data
    :param charset: List of symbols, which will be included in resulted string
    :param symbolsCountOfEachString: int, resulted string length
    :return: Array of random strings
    """
    return [getRandomString(charset, symbolsCountOfEachString) for i in range(dataCount)]


def getRandomData(dataCount: int, type: str, distribution, minValue: int, maxValue: int, std, mean, charset, strLength,  timeit=False, outputTimeit=""):
    """
    Dispatcher for random data, calls functions depending on arguments

    :param dataCount: integer, Size of output data
    :param type: string, type of generation data, available values - int, float, str
    :param minValue: integer, minimum value for uniform distribution
    :param maxValue: integer, maximum value for uniform distribution
    :param strLength: int, strLength length of each string for string generation
    :param timeit: boolean, if true, print time of function executed
    :param outputTimeit: str, if :timeit is true, print this string before printing time

    :return: Array of random data
    """
    np.set_printoptions(threshold=sys.maxsize)

    @timeTest(timeit, outputTimeit)
    def getRandomDataInner():
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
            randomNumber = getRandomStrings(dataCount, charset, strLength)
        else:
            raise Exception("Unknown type")

        return randomNumber
    return getRandomDataInner()