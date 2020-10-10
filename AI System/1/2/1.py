from math import sqrt


def isOdd(number): # не четное
    return number % 2 != 0

def isPositive(number):
    return number > 0


N = int(input())

if isOdd(N) and isPositive(N) and sqrt(N) > 10:
    print("Weird")


if not isOdd(N) and N in range(2,5):
    print("Not Weird")

if not isOdd(N) and not isPositive(N) and N**2 in range(60, 101):
    print("Weird")

if isOdd(N) and N >= 20 and N < 50 or N > 70 and N <= 100:
    print("Not Weird")

