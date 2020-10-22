
# 1.	Генерация случайных чисел и строк. 
# Необходимо сгенерировать случайные числа или строки и записать их в файл или вывести на консоль. 

# Параметры: 
#+ •	количество данных, которые надо сгенерировать (первый позиционный параметр);
#+ •	путь к выходному файлу (второй позиционный параметр), если не задан – результат выводится на консоль;
#+ •	значение инициализации генератора (-seed), для одного и того же значения должны генерироваться идентичные данные, по умолчанию 0;
# •	тип данных (-t, -type) - строка, задающая тип данных, возможные значения: “int” - целые числа, “float” - вещественные числа, “str” – строки. По умолчанию генерируются целые числа.
# Для чисел: 	
# •	распределение (-d, -distribution), возможные значения: uniform (равномерное), normal (нормальное распределение);
# •	параметры распределения (-mean, -std, -min_value, -max_value).
# Для строк:
# •	длина стрый набор символов (-c, -charset) - по умолчанию все буквы и цифры латинского алфавита и знаки препинания.

import sys
import numpy as np
from parseArgs import validateArgs, parseArgs
from outputPipe import writeResult
from randomizer import getRandomData


def main(defaultArgs=None):
    if not defaultArgs:
        args = parseArgs(sys.argv[1:])
    else:
        args = parseArgs(defaultArgs)

    validateArgs(args, args.timeit, "Время парсинга аргументов: ")

    np.random.seed(args.seed)

    resultedData = getRandomData(args.dataCount, args.type, args.distribution, args.min_value,
                                 args.max_value, args.std, args.mean, args.charset, args.strLength, args.timeit,
                                 "Время генерации: ")

    writeResult(args.output, resultedData, args.timeit, "Время вывода: ")


if __name__ == '__main__':
    main()