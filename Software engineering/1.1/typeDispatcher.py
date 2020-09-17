

def typeDispatcher(type):
    if type == 'int':
        data = np.random.randint(args.dataCount)

        resultedData.append(data)
    elif args.type == 'float':
        # print(np.random.normal(args.mean, args.std, [args.min_value, args.max_value]))
        # print(np.random.uniform(args.mean, args.std, [args.min_value, args.max_value]))

        data = np.random.random()
        resultedData.append(data)
    elif args.type == "str":
        integerCharset = [ord(char) for char in args.charset]

        data = [chr(np.random.choice(integerCharset)) for i in range(eachStringLength)]
        s_data = "".join(data)

        resultedData.append(s_data)