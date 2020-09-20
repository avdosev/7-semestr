from timer import timeTest


def validateArgs(args, timeit, outputTimeit):

    @timeTest(timeit, outputTimeit)
    def validateArgsInner(args):
        print(args)

        types = ['int', 'float', 'str']

        if args.type not in types:
            raise Exception("Не распознан тип, допустимые значения: int, str, float")

        if args.type == 'int' or args.type == 'float':
            if not args.distibution:
                raise Exception("Не задано распределение, допустимые значения: normal, uniform")
            if not args.mean and not args.min_value and not args.max_value and not args.std:
                raise Exception("Не заданы параметры распределения")
    return validateArgsInner(args)


def writeResult(outputPipe, resultedData, timeit, outputTimeit):
    @timeTest(timeit, outputTimeit)
    def writeResultInner(outputPipe, resultedData):
        if outputPipe:
            with open(outputPipe, 'w') as f:
                f.writelines(str(resultedData))
        else:
            print(resultedData)
    return writeResultInner(outputPipe, resultedData)
