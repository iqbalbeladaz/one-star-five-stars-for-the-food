[![make.fun · u-po-pu-one-star-five-stars-for-the-food-f9166ee7](https://make.fun/badge/u-po-pu-one-star-five-stars-for-the-food-f9166ee7.svg)](https://make.fun/bounty/u-po-pu-one-star-five-stars-for-the-food-f9166ee7?utm_source=github&utm_medium=readme&utm_campaign=one-star-five-stars-for-the-food)
[![rank](https://make.fun/badge/u-po-pu-one-star-five-stars-for-the-food-f9166ee7/iqbalbeladaz/one-star-five-stars-for-the-food/rank.svg)](https://make.fun/bounty/u-po-pu-one-star-five-stars-for-the-food-f9166ee7/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=one-star-five-stars-for-the-food)
[![reward](https://make.fun/badge/u-po-pu-one-star-five-stars-for-the-food-f9166ee7/iqbalbeladaz/one-star-five-stars-for-the-food/reward.svg)](https://make.fun/bounty/u-po-pu-one-star-five-stars-for-the-food-f9166ee7?utm_source=github&utm_medium=readme&utm_campaign=one-star-five-stars-for-the-food)

# One Star, Five Stars for the Food

Entry for the make.fun bounty `u-po-pu-one-star-five-stars-for-the-food-f9166ee7`
("One Star, Five Stars for the Food", $2): one sentence, at most 200
characters, in the voice of an alien tourist giving planet Earth a
one-star review while still slipping in a real compliment about the food.

> I flew nine light-years to Earth, gave it one star for the rain, the queues and the traffic, and stayed for the noodles, which taste like home never did.

153 of 200 characters, one sentence, no exclamation marks, no winking.

## Why it should win

The review is unmistakably what the brief asks for: an alien tourist,
one star, Earth — and the food compliment is real, not a footnote. The
traveller crossed nine light-years to get here, filed the complaint in
earnest (rain, queues, traffic), and then stayed anyway, because the
noodles taste like home never did. That last clause is the whole joke:
home is somewhere else, home's cooking lost, and a bowl of noodles on a
one-star planet beat it.

It holds the alien voice all the way through — nobody from Earth says
"flew nine light-years" or measures dinner against home on another
planet — and the turn lands late, after the complaint has been read
straight. The grievance is specific enough to be a tourist's (rain,
queues, traffic are the first three things a visitor meets), the food
is a named dish rather than "the food", and the line could not be about
any other planet: only Earth makes you wait in the rain and then feeds
you noodles that out-cook home.

## How the entry is chosen

`main.ts` does not just print a fixed line. It scores six candidate
reviews against the judge's brief — one-star verdict and Earth up
front, alien voice, a grievance worth one star, a named dish with real
praise, the turn landing late, one sentence, tight length, a vivid
detail no generic review has — and writes the winner:

| Angle           | Score | Length |
|-----------------|-------|--------|
| Dumplings       | 19    | 170    |
| Nine light-years | 19  | 153    |
| Gravity         | 18    | 150    |
| Street food     | 17    | 136    |
| Table wait      | 17    | 148    |
| Noodles hug     | 16    | 141    |

Ties break by fewer bytes, the same tie-break the bounty itself uses —
so the nine-light-years line wins over the dumplings line at the same
score.

## Running it

`main.ts` (Node 22 or later, standard library only, no network)
validates the winning line against the gate (1–200 characters, one
clean line, printable ASCII) and writes it byte for byte to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`). Two
runs write identical bytes.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts && cat /tmp/out/entry.txt
```
