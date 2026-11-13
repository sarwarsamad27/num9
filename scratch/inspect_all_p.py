import glob
import re

files = glob.glob("src/**/*.jsx", recursive=True)
p_records = []

for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        lines = fp.readlines()
    for idx, line in enumerate(lines):
        # find lines with <p or paragraph-like descriptions that have grey text classes
        if re.search(r'<p\b', line):
            # check this line and next 3 lines for className
            chunk = "".join(lines[idx:idx+5])
            if any(k in chunk for k in ['text-[#', 'text-gray', 'text-slate', 'text-black/', 'dark:text-[']):
                p_records.append((f, idx + 1, chunk[:200].replace('\n', ' ')))

print(f"Total <p> with color classes: {len(p_records)}")
for r in p_records:
    print(f"{r[0]}:{r[1]}: {r[2]}")

