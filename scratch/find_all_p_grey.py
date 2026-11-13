import glob
import re

for filepath in sorted(glob.glob('src/**/*.jsx', recursive=True)):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for idx, line in enumerate(lines, start=1):
        if '<p' in line:
            # check if line or next few lines have color classes
            combined = line
            if not '>' in line:
                for j in range(1, 5):
                    if idx - 1 + j < len(lines):
                        combined += " " + lines[idx - 1 + j]
                        if '>' in lines[idx - 1 + j]:
                            break
            # check for grey-ish color classes
            grey_keywords = [
                'text-[#', 'text-gray-', 'text-slate-', 'text-zinc-', 'text-neutral-', 
                'text-black/', 'text-white/'
            ]
            if any(k in combined for k in grey_keywords):
                print(f"{filepath}:{idx}: {combined.strip()[:140]}")

