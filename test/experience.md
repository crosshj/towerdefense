### LR experience data

| Grade        | Level | EXP        | EXP Required | Player      |
| ------------ | ----- | ---------- | ------------ | ----------- |
| Normal       | 98    | 2616110    | 3195000      | zora        |
| Super Master | 62    | 5687120    | 6382050      | Kuroyami    |
| Super Master | 63    | 1826175    | 6430050      | Kuroyami    |
| Super Master | 64    | 464581     | 6565650      | Kuroyami    |
| Super Master | 65    | 1549902    | 6738000      | Kuroyami    |
| Super Master | 66    | 2454087    | 6914250      | Kuroyami    |
| Ultra Master | 23    | 66346208   | 274790000    | zora        |
| Ultra Master | 49    | 460058277  | 927225070    | Rizal Arya  |
| Ultra Master | 52    | 1038331327 | 1926922898   | Lucyfer V.3 |
| Ultra Master | 72    | 622337472  | 1595980606   | zora        |
| Ultra Master | 77    | 1298430860 | 1813258621   | Rayquartz   |
| Ultra Master | 81    | 932862384  | 1849796000   | zora        |
| Ultra Master | 85    | 783267392  | 1887071020   | zora        |
| Legend       | 7     | 1031679690 | 2095808000   | JJWCO2      |
| Legend       | 22    | 1465078648 | 2259462400   | slybollie   |
| Legend       | 44    | 2194931646 | 2728553000   | zora        |

### for each unit

given:

character id  
experience amount

returns:

```json
{
	"id": "019079cf-cb56-7f47-f03-7ef27d",
	"displayName": "Macho",
	"element": "Fighting",
	"level": 150,
	"stars": 1,
	"rank": 1,
	"mineralCost": 100,
	"hp": 3000,
	"attack": 20,
	"range": 450
}
```

```
slybollie:
level 1->2= 1225
level 60 hp= 82,075
lvl60hp-lvl1hp / 1225=59
each level 1225
so i guess just max level hp minus level 1 hp divided by max level-1
level 4 hp is 13475 (9800+1225+1225+1225)
seems to work unless new rangers are different

https://rangers.lerico.net/en/ranger/u135e-dickey
```

```
LCMS:
if you're maxing a ranger on exp 2x days then the UL is enough to cover the 5 level gain so 140-145-150... but from 190-195 you need the UL + one 6* ranger then for 195-200 it's UL + two 6* rangers and so on
```

### max level by \*'s

```
1: 20 -> 40
2: 30 -> 50
3: 40 -> 60
4: 50 -> 70 (hyper/ultimate 170 & LP 100)
5: 60 -> 80 (hyper/ultimate 180 & LP 100)
6: 80 -> 100 (hyper/ultimate 200 & LP 100)
7: 100 -> 120 (hyper/ultimate 220 & LP 100)
8: 120 -> 140 (hyper/ultimate 240 & LP 100)
9: 160 -> 180
```
