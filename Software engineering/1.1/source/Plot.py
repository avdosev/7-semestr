import matplotlib.pyplot as plt


class Plot:
    """
    Small superset for matplotlib.pyplot.
    """

    newPlot: plt

    def __init__(self):
        self.newPlot = plt

    def addPlot(self, yData: list, xData: list, label: str):
        self.newPlot.plot(xData, yData, label=label)
        self.newPlot.legend(loc='upper left')

    def setLabels(self, xlabel: str, ylabel: str):
        self.newPlot.xlabel(xlabel)
        self.newPlot.ylabel(ylabel)

    def draw(self, title):
        self.newPlot.title(title)
        self.newPlot.show()
