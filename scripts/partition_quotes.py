try:
    import ujson as json
except:
    import json

from pathlib import Path

root = Path(__file__).parent / "../public/quotes"
src = Path(__file__).parent / "../src"

with open(root / "all.json", "r") as fin_real:
    realQuotes = json.load(fin_real)

with open(root / "funny.json", "r") as fin_funny:
    funnyQuotes = json.load(fin_funny)

chunk_size = 500
amount_chunks = 0

for i in range(len(funnyQuotes) // chunk_size + 1):
    with open(root / f"{amount_chunks}.json", "w+") as fout:
        json.dump(funnyQuotes[i * chunk_size:(i + 1) * chunk_size], fout)
    amount_chunks += 1

for i in range(len(realQuotes) // chunk_size + 1):
    with open(root / f"{amount_chunks}.json", "w+") as fout:
        json.dump(realQuotes[i * chunk_size:(i + 1) * chunk_size], fout)
    amount_chunks += 1

with open(src / "meta.js", "w+") as fout:
    print(f"""
export const amountQuotes = {len(realQuotes) + len(funnyQuotes)};
export const amountChunks = {amount_chunks};
""".lstrip(), file=fout)
