import re

input_filename = "nicknames.txt"
output_filename = "nicknames_result.txt"
pattern = r"(_|<|=|\.)+\d[a-zA-ZА-Яа-я]+\d(_|>|=|\.)+"
matched = []

with open(input_filename, "r") as input_f:
    for line in input_f:
        res = re.match(pattern, line)
        print(res)
        if res:
            matched.append(res.group(0))

matched.sort()

with open(output_filename, "w") as output_f:
    for i, line in enumerate(matched):
        output_f.write(f"{i+1}. {line} \n")

