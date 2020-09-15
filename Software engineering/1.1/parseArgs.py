from timer import my_timer


@my_timer
def parseArgs(args):
    print(args)

    types = ['int', 'float', 'str']

    if args.type not in types:
        raise Exception("Не распознан тип, допустимые значения: int, str, float")

    if args.type == 'int' or args.type == 'float':
        if not args.distibution:
            raise Exception("Не задано распределение, допустимые значения: normal, uniform")
        if not args.mean and not args.min_value and not args.max_value and not args.std:
            raise Exception("Не заданы параметры распределения")
