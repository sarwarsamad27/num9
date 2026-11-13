import glob
import re

text_classes = set()
p_tags = []

for f in glob.glob("src/**/*.jsx", recursive=True):
    with open(f, "r", encoding="utf-8") as fp:
        content = fp.read()
    # match <p ...> tags (including multiline)
    for m in re.finditer(r'<p\s+([^>]*?)>', content, re.DOTALL):
        attr = m.group(1)
        # find className="..." or className={`...`}
        cm = re.search(r'className=(?:["\']([^"\']*)["\']|{`([^`]*)`}|{["\']([^"\']*)["\']})', attr)
        if cm:
            cls_str = cm.group(1) or cm.group(2) or cm.group(3) or ""
            tokens = cls_str.split()
            grey_tokens = [t for t in tokens if 'text-' in t or 'gray' in t or 'slate' in t or 'zinc' in t or 'neutral' in t]
            if grey_tokens:
                p_tags.append((f, grey_tokens))
                for t in tokens:
                    if t.startswith('text-') or 'gray' in t or 'slate' in t or 'zinc' in t or 'neutral' in t:
                        text_classes.add(t)

print("Unique text/color classes found on <p> tags:")
for c in sorted(text_classes):
    print(c)

