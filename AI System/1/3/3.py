import re

inputFilename = "nicknames.txt"
outputFilename = "nicknames_result.txt"
pattern = r"(_|<|=|\.)+\d[a-zA-ZА-Яа-я]+\d(_|>|=|\.)+"
matched = []

with open(inputFilename, "r") as f:
    for line in f:
        res = re.match(pattern, line)
        if res:
            matched.append(res.group(0))

matched.sort()

with open(outputFilename, "w") as f:
    for i, line in enumerate(matched):
        f.write(f"{i+1}. {line} \n")

