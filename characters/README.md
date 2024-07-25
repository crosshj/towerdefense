### Character Creation (test animations)

1. add the character to `characters/units/units.js`

for example:

```javascript
	'u0001-4-watashi': {
		displayName: 'Openhyman',
		element: 'Normal',
		type: 'Agility',
		rank: 4,
		mineralCost: 150,
		hp: 20000,
		attack: 15,
		range: 350
	}
```

2. add the skin, for example
   `assets/character/FighterBase/skins/4-watashi_tex.png`

3. to see it in action, visit http://127.0.0.1:8000/characters/test/index.html

You should be able to select your character from first dropdown. Pick an
animation and press play!

### Add Character to Game

`this is a work in progress; come back later!`

### misc

Example: https://rangers.lerico.net/en/ranger/u003u-bella

```
HP:           17,568 - 169,092 - 388,692

ATK per sec:  547 - 5,267 - 12,107

ATK:          1,368 - 13,167 - 30,267
Physical ATK: 1,368 - 13,167 - 30,267
Magical ATK:  0 - 0 - 0

DEF:          500 - 4,847 - 11,147
Physical DEF: 196 - 1,921 - 4,421
Magical DEF:  304 - 2,926 - 6,726

changes with level:
HP, Attack Speed, Attack, Defense
```

https://www.reddit.com/r/LineRangers/comments/3wslpz/the_diference_between_physical_and_magical_attack/
