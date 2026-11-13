import glob
import re

matches = []

for f in glob.glob("src/**/*.jsx", recursive=True):
    with open(f, "r", encoding="utf-8") as fp:
        lines = fp.readlines()
    for idx, line in enumerate(lines):
        if re.search(r'<(p|span|div|h[1-6])\b[^>]*class(?:Name)?=[^>]*text-(?:\[#(?:4|5|6|7|8|9|a|b)[0-9a-fA-F]{3,6}\]|gray-[45678]|slate-[45678]|black\/(?:40|50|60|70))', line):
            matches.append((f, idx + 1, line.strip()))

print(f"Total matching lines across components: {len(matches)}")
for m in matches[:30]:
    print(f"{m[0]}:{m[1]}: {m[2]}")

