"""
create a js array containing the data from `6-dimensions.csv`
"""

def lineToJson(line):
  splitted = line.strip().split(';')[1:]
  ans = f'{{\n"name":"{splitted[0]}",\n'
  values = str(splitted[1:]).replace("'", "")
  ans += f'"values":{values}\n}}'
  return ans

countries = []
with open("6-dimensions.csv", "r") as file:
  lines = file.readlines()
  for line in lines[1:]:
    countries.append(lineToJson(line))

with open("countries.js", "w") as file:
  result = 'countries = [\n'
  for i in range(len(countries)):
    result += countries[i]
    if i != len(countries)-1:
      result += ','
    result += '\n'
  result += "];\n"
  file.write(result)
