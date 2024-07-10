/*
ALL CHARACTERS THAT THE USER HAS AVAILABLE
*/

const LEGACY_DEPRECATE = [
	{
		id: '019079cf-cb56-7e71-cbf-8c0a55',
		displayName: 'Tiana',
		level: 140,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7ca8-dc0-78fc46',
		displayName: 'Snow White',
		level: 100,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7eea-718-19f719',
		displayName: 'Jasmine',
		level: 150,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7af9-efc-82ab47',
		displayName: 'Aladdin',
		level: 155,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-7000-b9b-4b1e11',
		displayName: 'Hercules',
		level: 145,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7d59-7f8-84eaeb',
		displayName: 'Mickey',
		level: 130,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7804-d4f-74ff2c',
		displayName: 'Minnie',
		level: 125,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7af5-b6a-95cf69',
		displayName: 'Goofy',
		level: 120,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-77d7-db9-efc3da',
		displayName: 'Donald',
		level: 135,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7709-71b-069644',
		displayName: 'Daisy',
		level: 130,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-76b3-f2c-e9dcdb',
		displayName: 'Pluto',
		level: 115,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7408-7e0-687c66',
		displayName: 'Simba',
		level: 145,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7971-d65-dd7c8c',
		displayName: 'Nala',
		level: 140,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7f3e-c00-2b20b7',
		displayName: 'Scar',
		level: 150,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7ee1-f65-88f817',
		displayName: 'Mufasa',
		level: 155,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-76b2-688-c6f515',
		displayName: 'Timon',
		level: 120,
		mineralCost: 500,
		stars: 1
	},
	{
		id: '019079cf-cb56-7373-cbf-3801bd',
		displayName: 'Pumbaa',
		level: 125,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-73cc-b0d-4f4921',
		displayName: 'Zazu',
		level: 110,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7507-e29-a44e77',
		displayName: 'Rafiki',
		level: 140,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7c0e-46d-40746b',
		displayName: 'Shenzi',
		level: 130,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7ee9-fc7-e75641',
		displayName: 'Banzai',
		level: 125,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7e80-856-904532',
		displayName: 'Ed',
		level: 115,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7ded-b44-3f4bef',
		displayName: 'Woody',
		level: 150,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-735b-647-6b1970',
		displayName: 'Buzz',
		level: 155,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-78f8-dbd-003a17',
		displayName: 'Jessie',
		level: 145,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-744f-5cb-31d3e2',
		displayName: 'Bullseye',
		level: 130,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7ebe-b51-14846b',
		displayName: 'Rex',
		level: 125,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7589-c23-ebf63f',
		displayName: 'Hamm',
		level: 120,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-72de-35b-bfe138',
		displayName: 'Slinky',
		level: 135,
		mineralCost: 1000,
		stars: 3
	},
	{
		id: '019079cf-cb56-79c7-e50-8086dc',
		displayName: 'Bo Peep',
		level: 130,
		mineralCost: 1200,
		stars: 4
	},
	{
		id: '019079cf-cb56-7553-1e0-7b869e',
		displayName: 'Forky',
		level: 115,
		mineralCost: 800,
		stars: 2
	},
	{
		id: '019079cf-cb56-7160-e28-fbd149',
		displayName: 'Lotso',
		level: 160,
		mineralCost: 600,
		stars: 1
	},
	{
		id: '019079cf-cb56-7b2a-4ed-d6a815',
		displayName: 'Mr. Potato Head',
		level: 145,
		mineralCost: 700,
		stars: 2
	},
	{
		id: '019079cf-cb56-7182-111-6e10f5',
		displayName: 'Mrs. Potato Head',
		level: 140,
		mineralCost: 1400,
		stars: 5
	},
	{
		id: '019079cf-cb56-7071-5d7-ac6dd0',
		displayName: 'Andy',
		level: 150,
		mineralCost: 1000,
		stars: 3
	}
];

export const getCharacters = async () => [
	{
		id: '019079cf-cb56-7f47-f03-7ef27d',
		displayName: 'Macho',
		element: 'Fighting',
		level: 150,
		stars: 1,
		rank: 1,
		mineralCost: 100,
		hp: 3000,
		attack: 20,
		range: 450
	},
	{
		id: '019079cf-cb56-7f2b-f72-56f0fd',
		displayName: 'Toto Bato',
		element: 'Rock',
		level: 120,
		stars: 2,
		rank: 2,
		mineralCost: 150,
		hp: 20000,
		attack: 15,
		range: 350
	},
	{
		id: '019079cf-cb56-74e4-310-d79f9e',
		displayName: 'Twinkle',
		element: 'Fairy',
		level: 100,
		stars: 3,
		rank: 3,
		mineralCost: 250,
		hp: 4000,
		attack: 40,
		range: 800
	},
	{
		id: '019079cf-cb56-7d7b-469-3b4bb5',
		displayName: 'Vispi',
		element: 'Air',
		level: 130,
		stars: 4,
		rank: 4,
		mineralCost: 350,
		hp: 6000,
		attack: 60,
		range: 600
	},
	{
		id: '019079cf-cb56-7211-2f3-2bc714',
		displayName: 'Drat',
		element: 'Dragon',
		level: 135,
		stars: 5,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-76cd-ff8-6d0542',
		displayName: 'Antonio',
		element: 'Bug',
		level: 140,
		stars: 4,
		rank: 4,
		mineralCost: 500,
		hp: 6000,
		attack: 60,
		range: 600
	},

	{
		id: '019079cf-cb56-76c6-e56-7459e0',
		displayName: 'Bumpier',
		element: 'Dark',
		level: 130,
		stars: 4,
		rank: 4,
		mineralCost: 550,
		hp: 6000,
		attack: 60,
		range: 600
	},
	{
		id: '019079cf-cb56-7b0b-ad4-36b3eb',
		displayName: 'Tabi-Tabi Po',
		element: 'Earth',
		level: 110,
		stars: 4,
		rank: 4,
		mineralCost: 600,
		hp: 6000,
		attack: 60,
		range: 600
	},
	{
		id: '019079cf-cb56-7020-725-206b2f',
		displayName: 'Electopus',
		element: 'Electric',
		level: 160,
		stars: 5,
		rank: 5,
		mineralCost: 700,
		hp: 7000,
		attack: 80,
		range: 1000
	},

	{
		id: '019079cf-cb56-7ea0-337-0ad0de',
		displayName: 'Santelmo',
		element: 'Fire',
		level: 170,
		stars: 5,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-7777-53f-64e88d',
		displayName: 'Multo',
		element: 'Ghost',
		level: 180,
		stars: 5,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-7a7f-741-8f5588',
		displayName: 'Kelvin',
		element: 'Ice',
		level: 150,
		stars: 3,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-7004-2bb-144d0e',
		displayName: 'Blanko',
		element: 'Normal',
		level: 155,
		stars: 4,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-71dd-1d6-d8a311',
		displayName: 'Prickles',
		element: 'Plant',
		level: 140,
		stars: 2,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-7358-a31-edf4b2',
		displayName: 'Crack9',
		element: 'Poison',
		level: 145,
		stars: 2,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-7661-466-8868c6',
		displayName: 'Robia',
		element: 'Psychic',
		level: 150,
		stars: 5,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-71e2-738-b6d9c2',
		displayName: 'Barbell',
		element: 'Steel',
		level: 125,
		stars: 3,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	{
		id: '019079cf-cb56-7b4d-652-890dd9',
		displayName: 'Wap Wap',
		element: 'Water',
		level: 160,
		stars: 4,
		rank: 5,
		mineralCost: 450,
		hp: 7000,
		attack: 80,
		range: 1000
	},
	...LEGACY_DEPRECATE
];
