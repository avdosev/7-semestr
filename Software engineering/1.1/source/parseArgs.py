from timer import timeTest
from config import types
import argparse
from config import charset, eachStringLength


def parseArgs(args):
    parser = argparse.ArgumentParser(description='Создает рандомные числа.')
    parser.add_argument('dataCount', type=int, help='Количество генерируемых данных')
    parser.add_argument('output', nargs='?', help='Путь к выходному файлу, по умолчанию - консоль')

    parser.add_argument('-seed', default=0, help='Значения инициализции генератора')
    parser.add_argument('-t', '-type', default='int', dest="type", help='Тип данных, которые мы подаем')
    parser.add_argument('-d', '-distribution', dest="distribution")
    parser.add_argument('-mean', dest="mean", type=float)
    parser.add_argument('-std', dest="std", type=float)  # === scale ?
    parser.add_argument('-min_value', dest="min_value", type=int)
    parser.add_argument('-max_value', dest="max_value", type=int)
    parser.add_argument('-c', '-charset', default=charset, dest="charset")
    parser.add_argument('-l', '-strLength', default=eachStringLength, dest='strLength', type=int)
    parser.add_argument('-timeit', action='store_true', dest="timeit")
    return parser.parse_args(args)


def validateArgs(args, timeit, outputTimeit):
    """Check input args."""

    @timeTest(timeit, outputTimeit)
    def validateArgsInner(args):
        if args.type not in types:
            raise Exception("Не распознан тип, допустимые значения: int, str, float")

        if args.type in types:
            if not args.distribution or args.distribution not in ['normal', 'uniform']:
                raise Exception("Не задано распределение, допустимые значения: normal, uniform")
            if args.distribution == 'normal' and args.type == 'int':
                raise Exception("Нормальное распределение временно не поддерживается для целых чисел")
            if args.distribution == "uniform" and not args.min_value and not args.max_value:
                raise Exception("Не заданы параметры равномерного распределения")
            if args.distribution == "normal" and not args.mean and not args.std:
                raise Exception("Не заданы параметры нормального распределения")
            if args.std and args.std < 0:
                raise Exception("Scale должен быть не негативным")
    return validateArgsInner(args)

