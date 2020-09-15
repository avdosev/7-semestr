
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

import argparse
import numpy as np
import string
from parseArgs import parseArgs


charset = string.ascii_letters + string.punctuation + string.digits
 

parser = argparse.ArgumentParser(description='Создает рандомные числа.')
parser.add_argument('dataCount', type=int, help='Количество генерируемых данных')
parser.add_argument('output', nargs='?', help='Путь к выходному файлу, по умолчанию - консоль')


parser.add_argument('-seed', default=0, help='Значения инициализции генератора')
parser.add_argument('-t', '-type', default='int', dest="type", help='Тип данных, которые мы подаем')
parser.add_argument('-d', '-distribution', dest="distibution")
parser.add_argument('-mean', dest="mean", type=float)
parser.add_argument('-std', dest="std", type=float)
parser.add_argument('-min_value', dest="min_value", type=int)
parser.add_argument('-max_value', dest="max_value", type=int)
parser.add_argument('-c', '-charset', default=charset, dest="charset")
parser.add_argument('-timeit', action='store_true', dest="timeit")
args = parser.parse_args()


parseArgs(args)

np.random.seed(args.seed)

resultedData = []

for i in range(0, args.dataCount):
    if args.type == 'int':
        data = np.random.randint(args.dataCount)

        resultedData.append(data)
    elif args.type == 'float':
        # print(np.random.normal(args.mean, args.std, [args.min_value, args.max_value]))
        # print(np.random.uniform(args.mean, args.std, [args.min_value, args.max_value]))

        data = np.random.random()
        resultedData.append(data)
    elif args.type == "str":
        pass
    else:
         raise Exception("Unknown type")


if args.output:
    with open(args.output, 'w') as f:
        f.writelines(str(resultedData))
else:
    print(resultedData)


