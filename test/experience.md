### LR experience data

| Grade | Level | EXP Required | Contributor         |
| ----- | ----- | ------------ | ------------------- |
| N     | 98    | 3195000      | zora                |
| SM    | 62    | 6382050      | Kuroyami            |
| SM    | 63    | 6430050      | Kuroyami            |
| SM    | 64    | 6565650      | Kuroyami            |
| SM    | 65    | 6738000      | Kuroyami            |
| SM    | 66    | 6914250      | Kuroyami            |
| UM    | 23    | 274790000    | zora                |
| UM    | 48    | 922612010    | A Pro               |
| UM    | 49    | 927225070    | Rizal Arya          |
| UM    | 52    | 1086922898   | Lucyfer V.3         |
| UM    | 67    | 1453659684   | nothelicopterrr     |
| UM    | 67    | 1453659684   | 807353e6            |
| UM    | 72    | 1595980606   | zora                |
| UM    | 77    | 1813258621   | Rayquartz           |
| UM    | 78    | 1822324914   | Yamagi              |
| UM    | 81    | 1849796000   | zora                |
| UM    | 85    | 1887071020   | zora                |
| L     | 5     | 2074902400   | LCMS                |
| L     | 7     | 2095808000   | JJWCO2              |
| L     | 22    | 2259462400   | slybollie           |
| L     | 24    | 2282227500   | LCMS                |
| L     | 25    | 2293695900   | LCMS                |
| L     | 44    | 2728553000   | zora                |
| L     | 52    | 3003421300   | LCMS                |
| L     | 55    | 3157817100   | Paul                |
| L     | 61    | 3504556900   | Adrian {LR Veteran} |
| L     | 63    | 3633021300   | LCMS                |
| L     | 64    | 3699961300   | LCMS                |
| L     | 79    | 7189100700   | LCMS                |
| L     | 87    | 15130285400  | Paul                |
| L     | 89    | 20009802400  | Paul                |
| L     | 90    | 23011272700  | Paul                |
| L     | 91    | 26462963600  | Paul                |
| L     | 92    | 30432408200  | Paul                |
| L     | 93    | 34997269400  | Paul                |
| L     | 94    | 40246859800  | Paul                |
| L     | 95    | 47491294500  | Paul                |
| L     | 96    | 56039727500  | Paul                |
| L     | 97    | 66126878500  | Paul                |

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
