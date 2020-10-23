from timer import timeTest


def writeResult(outputPipe, resultedData, timeit, outputTimeit):
    """
    Write output in file or in stdout

    :param outputPipe: path to output file
    :param resultedData: list[any], stringable values for printing
    :param timeit: boolean, if true, print time of function executed
    :param outputTimeit: str, if :timeit is true, print this string before printing time
    """
    @timeTest(timeit, outputTimeit)
    def writeResultInner():
        if outputPipe:
            with open(outputPipe, 'w') as f:
                f.writelines(str(resultedData))
        else:
            print(resultedData)
    return writeResultInner()
