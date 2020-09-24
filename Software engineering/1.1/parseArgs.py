from timer import timeTest
from config import types


def validateArgs(args, timeit, outputTimeit):
    @timeTest(timeit, outputTimeit)
    def validateArgsInner(args):
        if args.type not in types:
            raise Exception("Не распознан тип, допустимые значения: int, str, float")

        if args.type == 'int' or args.type == 'float':
            if not args.distribution:
                raise Exception("Не задано распределение, допустимые значения: normal, uniform")
            if args.distribution == 'normal' and args.type == 'int':
                raise Exception("Нормальное распределение временно не поддерживается для целых чисел")
            if args.distribution == "uniform" and not args.min_value and not args.max_value:
                raise Exception("Не заданы параметры равномерного распределения")
            if args.distribution == "normal" and not args.mean and not args.std:
                raise Exception("Не заданы параметры нормального распределения")
            if args.std < 0:
                raise Exception("Scale должен быть не негативным")
    return validateArgsInner(args)

