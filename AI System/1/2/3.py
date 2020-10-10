N = list(input())

odd = []
even = []

for i in N:
    number = int(i)
    if number % 2 == 0:
        even.append(number)
    else:
        odd.append(number)


print(f"Четных: {len(even)}, сумма: {sum(even)}. Нечетных: {len(odd)}, сумма: {sum(odd)}")