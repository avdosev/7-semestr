from collections import OrderedDict

store = OrderedDict()

countGoods = int(input())

for i in range(countGoods):
    (itemName, netPrice) = input().rsplit(" ", 1)
    price = int(netPrice)
    if itemName in store:
        store[itemName] += price 
    else:
        store[itemName] = price 


print()
print("In store:")
for item in store:
    print(item, store[item])

