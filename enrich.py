import re

with open('src/data/vocabulary.ts', 'r') as f:
    content = f.read()

match = re.search(r'export const HSK_1_WORDS_LIST = \[(.*?)\];', content, re.DOTALL)
if match:
    words_str = match.group(1)
    print("Found words block")
else:
    print("Not found")
