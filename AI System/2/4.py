from collections import OrderedDict

store = OrderedDict()

countGoods = int(input())

for i in range(countGoods):
    (itemName, netPrice) = input().split(" ")
    price = int(netPrice)
    if itemName in store:
        store[itemName] += netPrice
    else:
        store[itemName] = netPrice


for item in store:
    print(item, store[item])

