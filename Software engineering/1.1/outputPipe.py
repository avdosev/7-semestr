from timer import timeTest


def writeResult(outputPipe, resultedData, timeit, outputTimeit):
    @timeTest(timeit, outputTimeit)
    def writeResultInner():
        if outputPipe:
            with open(outputPipe, 'w') as f:
                f.writelines(str(resultedData))
        else:
            print(resultedData)
    return writeResultInner()
