const chars = {
	prevChars: [
		{
			index: '0',
			id: '0-localid',
			code: 'u0001-1-macho',
			experience: 250800,
			uncappedLevel: 0,
			professorPoints: 10,
			uuid: '01916e03-60c9-7988-591-d3f658'
		},
		{
			index: '1',
			id: '1-localid',
			code: 'u0001-2-toto',
			experience: 576000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7705-5d1-a9718e'
		},
		{
			index: '2',
			id: '2-localid',
			code: 'u0001-3-twinkle',
			experience: 19692000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a28-b54-2aa90a'
		},
		{
			index: '3',
			id: '3-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cef-19c-1250fb'
		},
		{
			index: '4',
			id: '4-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7307-d4d-caed66'
		},
		{
			index: '5',
			id: '5-localid',
			code: 'u0001-4-antonio',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7d85-88d-06e94e'
		},
		{
			index: '6',
			id: '6-localid',
			code: 'u0001-4-bumpier',
			experience: 14022000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f74-f41-6156dc'
		},
		{
			index: '7',
			id: '7-localid',
			code: 'u0001-4-tabi',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7eff-d55-1f0296'
		},
		{
			index: '8',
			id: '8-localid',
			code: 'u0001-5-electopus',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c97-94a-088a28'
		},
		{
			index: '9',
			id: '9-localid',
			code: 'u0001-5-santelmo',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7748-8ca-8328ab'
		},
		{
			index: 'A',
			id: '10-localid',
			code: 'u0001-5-multo',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71b0-088-13bf11'
		},
		{
			index: 'B',
			id: '11-localid',
			code: 'u0001-5-kelvin',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-77c6-df9-2cc5aa'
		},
		{
			index: 'C',
			id: '12-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b79-21b-ed04d5'
		},
		{
			index: 'D',
			id: '13-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7891-131-bbd225'
		},
		{
			index: 'E',
			id: '14-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-72c3-23c-8c74d5'
		},
		{
			index: 'F',
			id: '15-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71ce-546-657025'
		},
		{
			index: 'G',
			id: '16-localid',
			code: 'u0001-5-barbell',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cb8-de3-396582'
		},
		{
			index: 'H',
			id: '17-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f4e-f09-1b7514'
		},
		{
			index: 'I',
			id: '18-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70e3-f12-712c8b'
		},
		{
			index: 'J',
			id: '19-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a5f-5d3-b66f63'
		},
		{
			index: 'K',
			id: '20-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-707e-472-6ad555'
		},
		{
			index: 'L',
			id: '21-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fcc-86f-a34f22'
		},
		{
			index: 'M',
			id: '22-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-790e-f49-738732'
		},
		{
			index: 'N',
			id: '23-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7ee1-3fc-2de656'
		},
		{
			index: 'O',
			id: '24-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71de-923-16a391'
		},
		{
			index: 'P',
			id: '25-localid',
			code: 'u0001-1-benny',
			experience: 216400,
			uncappedLevel: 4,
			professorPoints: 10,
			uuid: '01916e03-60ca-7c9c-b03-c3ba04'
		},
		{
			index: 'Q',
			id: '26-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-786c-075-dbd964'
		},
		{
			index: 'R',
			id: '27-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a37-68b-99470d'
		},
		{
			index: 'S',
			id: '28-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-792f-675-219ab8'
		},
		{
			index: 'T',
			id: '29-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-715b-427-bdae7a'
		},
		{
			index: 'U',
			id: '30-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a30-bf1-90c314'
		},
		{
			index: 'V',
			id: '31-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e90-6bb-766f0f'
		},
		{
			index: 'W',
			id: '32-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7d6b-cb9-01a8a6'
		},
		{
			index: 'X',
			id: '33-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b91-ba8-d46389'
		},
		{
			index: 'Y',
			id: '34-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7481-45b-6ecfed'
		},
		{
			index: 'Z',
			id: '35-localid',
			code: 'u0001-4-slabb',
			experience: 15978000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e3b-753-c244d6'
		},
		{
			index: '10',
			id: '36-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b78-869-1b6573'
		},
		{
			index: '11',
			id: '37-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7471-b10-8cb444'
		},
		{
			index: '12',
			id: '38-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7883-d93-4742b1'
		},
		{
			index: '13',
			id: '39-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7037-baf-54e405'
		},
		{
			index: '14',
			id: '40-localid',
			code: 'u0001-3-zar',
			experience: 1309833269717799700,
			uncappedLevel: 4,
			professorPoints: 6,
			uuid: '01916e03-60ca-7519-4c7-051696'
		},
		{
			index: '15',
			id: '41-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-716b-361-0801ce'
		},
		{
			index: '16',
			id: '42-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-73fd-fda-300151'
		},
		{
			index: '17',
			id: '43-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7dd9-d74-3d98af'
		},
		{
			index: '18',
			id: '44-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f39-38f-a044a2'
		},
		{
			index: '19',
			id: '45-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70fa-70f-015d42'
		},
		{
			index: '1A',
			id: '46-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-786e-762-a00820'
		},
		{
			index: '1B',
			id: '47-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e70-fbb-791402'
		},
		{
			index: '1C',
			id: '48-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-72e4-a00-818e06'
		},
		{
			index: '1D',
			id: '49-localid',
			code: 'u0001-3-rose',
			experience: 2784000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b32-c8c-c4e37c'
		},
		{
			index: '1E',
			id: '50-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71c8-48e-570212'
		},
		{
			index: '1F',
			id: '51-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71be-3a9-14376c'
		},
		{
			index: '1G',
			id: '52-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-710c-f44-218f55'
		},
		{
			index: '1H',
			id: '53-localid',
			code: 'u0001-4-slabb',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-715f-221-805017'
		},
		{
			index: '1I',
			id: '54-localid',
			code: 'u0001-4-violet',
			experience: 1045777382379918000,
			uncappedLevel: 4,
			professorPoints: 6,
			uuid: '01916e03-60ca-74e1-b0b-33ea68'
		},
		{
			index: '1J',
			id: '55-localid',
			code: 'u0001-2-ogre',
			experience: 548133594704679500,
			uncappedLevel: 0,
			professorPoints: 7,
			uuid: '01916e03-60ca-7fe2-231-e754c3'
		},
		{
			index: '1K',
			id: '56-localid',
			code: 'u0001-4-crimson',
			experience: 1045777382379918000,
			uncappedLevel: 4,
			professorPoints: 6,
			uuid: '01916e03-60ca-7f8d-4a9-0d785e'
		},
		{
			index: '1L',
			id: '57-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cd8-af8-9e6e19'
		},
		{
			index: '1M',
			id: '58-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a60-f44-90fe22'
		},
		{
			index: '1N',
			id: '59-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70dd-473-192106'
		},
		{
			index: '1O',
			id: '60-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7019-5d2-514dc6'
		},
		{
			index: '1P',
			id: '61-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-793d-19f-d661d7'
		},
		{
			index: '1Q',
			id: '62-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fdf-e46-7ee562'
		},
		{
			index: '1R',
			id: '63-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-74e5-b09-9b6e29'
		},
		{
			index: '1S',
			id: '64-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b69-19e-b2f38e'
		},
		{
			index: '1T',
			id: '65-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7807-ecb-1806cc'
		},
		{
			index: '1U',
			id: '66-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7177-dc2-b95cfc'
		},
		{
			index: '1V',
			id: '67-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71f3-3f7-3cdae9'
		},
		{
			index: '1W',
			id: '68-localid',
			code: 'u0001-4-slabb',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75a1-ab3-83444d'
		},
		{
			index: '1X',
			id: '69-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-783e-ff8-02c4a2'
		},
		{
			index: '1Y',
			id: '70-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7be2-2b6-69598f'
		},
		{
			index: '1Z',
			id: '71-localid',
			code: 'u0001-2-toto',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7d6e-d2c-2e4b43'
		},
		{
			index: '20',
			id: '72-localid',
			code: 'u0001-4-bumpier',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cfa-98c-c5bb44'
		},
		{
			index: '21',
			id: '73-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-714b-d55-a79cba'
		},
		{
			index: '22',
			id: '74-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-703e-ad7-e2c819'
		},
		{
			index: '23',
			id: '75-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7196-487-501fc1'
		},
		{
			index: '24',
			id: '76-localid',
			code: 'u0001-5-robia',
			experience: 15354000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7660-b3c-866a84'
		},
		{
			index: '25',
			id: '77-localid',
			code: 'u0001-4-aynstine',
			experience: 5790000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f10-792-f786cb'
		},
		{
			index: '26',
			id: '78-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-799d-831-0dd5c7'
		},
		{
			index: '27',
			id: '79-localid',
			code: 'u0001-4-antonio',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75c6-118-3920d1'
		},
		{
			index: '28',
			id: '80-localid',
			code: 'u0001-4-openhyman',
			experience: 19848000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b00-1f7-8835c0'
		},
		{
			index: '29',
			id: '81-localid',
			code: 'u0001-4-pineman',
			experience: 6078000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-72dd-aaa-759546'
		},
		{
			index: '2A',
			id: '82-localid',
			code: 'u0001-4-boar',
			experience: 6078000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7596-f84-2835b6'
		},
		{
			index: '2B',
			id: '83-localid',
			code: 'u0001-4-crimson',
			experience: 11442000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7398-1d6-013353'
		},
		{
			index: '2C',
			id: '84-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76df-68d-eb464b'
		},
		{
			index: '2D',
			id: '85-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7577-034-5deb47'
		},
		{
			index: '2E',
			id: '86-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b7a-fbd-116e8a'
		},
		{
			index: '2F',
			id: '87-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7731-c6e-782088'
		},
		{
			index: '2G',
			id: '88-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b17-ff2-98ed85'
		},
		{
			index: '2H',
			id: '89-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e06-4b4-8e715b'
		},
		{
			index: '2I',
			id: '90-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c0b-e10-7cfc75'
		},
		{
			index: '2J',
			id: '91-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71b6-720-d83d75'
		},
		{
			index: '2K',
			id: '92-localid',
			code: 'u0001-4-aynstine',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7301-f6a-598796'
		},
		{
			index: '2L',
			id: '93-localid',
			code: 'u0001-1-pete',
			experience: 30540000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7ac7-2dc-468e14'
		},
		{
			index: '2M',
			id: '94-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f3f-984-16387d'
		},
		{
			index: '2N',
			id: '95-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7dc2-1cf-8e7fa6'
		},
		{
			index: '2O',
			id: '96-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7499-5f9-9eef45'
		},
		{
			index: '2P',
			id: '97-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7801-cfa-0b9e22'
		},
		{
			index: '2Q',
			id: '98-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7896-9ed-9d61af'
		},
		{
			index: '2R',
			id: '99-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71a3-73e-e26a02'
		},
		{
			index: '2S',
			id: '100-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7208-967-618c0e'
		},
		{
			index: '2T',
			id: '101-localid',
			code: 'u0001-5-bibly',
			experience: 20602,
			uncappedLevel: 0,
			professorPoints: 1,
			uncapped: 0,
			uuid: '01916e03-60ca-79f3-8f6-29c915'
		},
		{
			index: '2U',
			id: '102-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b49-efd-f41519'
		},
		{
			index: '2V',
			id: '103-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fd3-74b-d03715'
		},
		{
			index: '2W',
			id: '104-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-712b-f83-4a1062'
		},
		{
			index: '2X',
			id: '105-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cdf-b61-9098ac'
		},
		{
			index: '2Y',
			id: '106-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c1b-e14-58b311'
		},
		{
			index: '2Z',
			id: '107-localid',
			code: 'u0001-2-zerosix',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7dcf-9ec-173ea9'
		},
		{
			index: '30',
			id: '108-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7664-bb8-5d1f83'
		},
		{
			index: '31',
			id: '109-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7ed6-5c5-b9a663'
		},
		{
			index: '32',
			id: '110-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-763a-14c-78e7f5'
		},
		{
			index: '33',
			id: '111-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7efe-98a-3ae6bc'
		},
		{
			index: '34',
			id: '112-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-73d3-053-6b199d'
		},
		{
			index: '35',
			id: '113-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7662-738-cb69c5'
		},
		{
			index: '36',
			id: '114-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78a3-7b0-eefe97'
		},
		{
			index: '37',
			id: '115-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f10-e42-f85e5d'
		},
		{
			index: '38',
			id: '116-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a31-ee6-2ae983'
		},
		{
			index: '39',
			id: '117-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-742a-931-3322a0'
		},
		{
			index: '3A',
			id: '118-localid',
			code: 'u0001-2-tom',
			experience: 578601581705204400,
			uncappedLevel: 0,
			professorPoints: 7,
			uuid: '01916e03-60ca-726c-939-f2640e'
		},
		{
			index: '3B',
			id: '119-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7bf6-db0-a46335'
		},
		{
			index: '3C',
			id: '120-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-776a-513-749de0'
		},
		{
			index: '3D',
			id: '121-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75a8-7ba-b705e7'
		},
		{
			index: '3E',
			id: '122-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fb5-527-f2896c'
		},
		{
			index: '3F',
			id: '123-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7363-290-51bc8f'
		},
		{
			index: '3G',
			id: '124-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-782c-57c-122f05'
		},
		{
			index: '3H',
			id: '125-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76f4-351-4e7521'
		},
		{
			index: '3I',
			id: '126-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-73fe-994-b91ae6'
		},
		{
			index: '3J',
			id: '127-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7517-bb8-d11347'
		},
		{
			index: '3K',
			id: '128-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b5e-a1e-2ac096'
		},
		{
			index: '3L',
			id: '129-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a9c-d39-873161'
		},
		{
			index: '3M',
			id: '130-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7357-5e5-70be49'
		},
		{
			index: '3N',
			id: '131-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7566-61c-97f3ca'
		},
		{
			index: '3O',
			id: '132-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78e4-e09-c8a578'
		},
		{
			index: '3P',
			id: '133-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71e3-b3a-45f167'
		},
		{
			index: '3Q',
			id: '134-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79a1-d1d-badeeb'
		},
		{
			index: '3R',
			id: '135-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70d7-831-e1e132'
		},
		{
			index: '3S',
			id: '136-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f5d-403-daa850'
		},
		{
			index: '3T',
			id: '137-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71e3-9c6-3faf08'
		},
		{
			index: '3U',
			id: '138-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-751a-243-73508c'
		},
		{
			index: '3V',
			id: '139-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-739d-f39-2e5d86'
		},
		{
			index: '3W',
			id: '140-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f3e-06c-5918e7'
		},
		{
			index: '3X',
			id: '141-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c21-6e7-29d662'
		},
		{
			index: '3Y',
			id: '142-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76d1-b0b-8967fb'
		},
		{
			index: '3Z',
			id: '143-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f40-5c9-bf2866'
		},
		{
			index: '40',
			id: '144-localid',
			code: 'u0001-1-zoe',
			experience: 19146000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71da-d8c-954df2'
		},
		{
			index: '41',
			id: '145-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a47-821-406922'
		},
		{
			index: '42',
			id: '146-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-74d1-d69-b445b3'
		},
		{
			index: '43',
			id: '147-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7ea7-051-5cf75c'
		},
		{
			index: '44',
			id: '148-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-762d-d26-a8b16c'
		},
		{
			index: '45',
			id: '149-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7aa9-59f-a0d951'
		},
		{
			index: '46',
			id: '150-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-714c-b48-40e857'
		},
		{
			index: '47',
			id: '151-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-74e0-7c4-26f21a'
		},
		{
			index: '48',
			id: '152-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7768-f77-f97bcf'
		},
		{
			index: '49',
			id: '153-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-707e-048-5afea7'
		},
		{
			index: '4A',
			id: '154-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f26-126-e99eef'
		},
		{
			index: '4B',
			id: '155-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78e3-dd4-69defa'
		},
		{
			index: '4C',
			id: '156-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cd8-f4c-6e06a7'
		},
		{
			index: '4D',
			id: '157-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f6b-f8d-960373'
		},
		{
			index: '4E',
			id: '158-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7eca-b28-12270a'
		},
		{
			index: '4F',
			id: '159-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75c7-523-53ccc1'
		},
		{
			index: '4G',
			id: '160-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a8b-eaf-4bd77e'
		},
		{
			index: '4H',
			id: '161-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b73-6ee-95e7b3'
		},
		{
			index: '4I',
			id: '162-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7722-b79-d2a9a6'
		},
		{
			index: '4J',
			id: '163-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b90-455-5f35be'
		},
		{
			index: '4K',
			id: '164-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76e9-a77-a9877f'
		},
		{
			index: '4L',
			id: '165-localid',
			code: 'u0001-3-zar',
			experience: 7302000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-780d-2af-7588dc'
		},
		{
			index: '4M',
			id: '166-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fcb-114-3312d3'
		},
		{
			index: '4N',
			id: '167-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e2a-8e3-7ecfbb'
		},
		{
			index: '4O',
			id: '168-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f3e-f9c-0c9be3'
		},
		{
			index: '4P',
			id: '169-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79d6-3d3-57d5cc'
		},
		{
			index: '4Q',
			id: '170-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fbb-deb-4baa9f'
		},
		{
			index: '4R',
			id: '171-localid',
			code: 'u0001-5-multo',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7045-e6a-c0ef95'
		},
		{
			index: '4S',
			id: '172-localid',
			code: 'u0001-4-bumpier',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c4b-b90-2ca8ce'
		},
		{
			index: '4T',
			id: '173-localid',
			code: 'u0001-3-corpus',
			experience: 28170000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78bd-ff6-ae5ce4'
		},
		{
			index: '4U',
			id: '174-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71f3-e85-994236'
		},
		{
			index: '4V',
			id: '175-localid',
			code: 'u0001-4-liz',
			experience: 17466000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-72fd-567-20a8f0'
		},
		{
			index: '4W',
			id: '176-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-73b4-f06-dbac75'
		},
		{
			index: '4X',
			id: '177-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78f1-6b4-faeee8'
		},
		{
			index: '4Y',
			id: '178-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75e5-792-91fcbf'
		},
		{
			index: '4Z',
			id: '179-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-770c-e16-cc611f'
		},
		{
			index: '50',
			id: '180-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75e4-dfb-6c7958'
		},
		{
			index: '51',
			id: '181-localid',
			code: 'u0001-3-arcus',
			experience: 8004000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7527-5b6-52531e'
		},
		{
			index: '52',
			id: '182-localid',
			code: 'u0001-4-openhyman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7677-5d0-8d372e'
		},
		{
			index: '53',
			id: '183-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-71c2-eb4-e80e47'
		},
		{
			index: '54',
			id: '184-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79a4-a0b-e00a12'
		},
		{
			index: '55',
			id: '185-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-762c-527-525101'
		},
		{
			index: '56',
			id: '186-localid',
			code: 'u0001-4-openhyman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e2a-d84-1f405f'
		},
		{
			index: '57',
			id: '187-localid',
			code: 'u0001-3-pismud',
			experience: 7248000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7796-859-62568a'
		},
		{
			index: '58',
			id: '188-localid',
			code: 'u0001-3-pismud',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76eb-40c-9fe967'
		},
		{
			index: '59',
			id: '189-localid',
			code: 'u0001-4-crimson',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e04-14c-16194b'
		},
		{
			index: '5A',
			id: '190-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7ef2-89a-6fa246'
		},
		{
			index: '5B',
			id: '191-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70d3-c18-88581e'
		},
		{
			index: '5C',
			id: '192-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e8e-c60-454422'
		},
		{
			index: '5D',
			id: '193-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e63-298-9f1266'
		},
		{
			index: '5E',
			id: '194-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76d1-d82-04feb2'
		},
		{
			index: '5F',
			id: '195-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7217-130-587f4b'
		},
		{
			index: '5G',
			id: '196-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-724f-bc8-a2c7a3'
		},
		{
			index: '5H',
			id: '197-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7863-50f-f1d480'
		},
		{
			index: '5I',
			id: '198-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f97-878-7b3a9b'
		},
		{
			index: '5J',
			id: '199-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a54-841-fd7a03'
		},
		{
			index: '5K',
			id: '200-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7d1c-c14-632be4'
		},
		{
			index: '5L',
			id: '201-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7043-0a7-86688f'
		},
		{
			index: '5M',
			id: '202-localid',
			code: 'u0001-4-antonio',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7aa7-eb1-19d2ec'
		},
		{
			index: '5N',
			id: '203-localid',
			code: 'u0001-4-ruby',
			experience: 8796000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7870-005-78345e'
		},
		{
			index: '5O',
			id: '204-localid',
			code: 'u0001-3-timmy',
			experience: 7716000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7493-c57-1f2612'
		},
		{
			index: '5P',
			id: '205-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b2b-3bf-484367'
		},
		{
			index: '5Q',
			id: '206-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7907-71f-595f4a'
		},
		{
			index: '5R',
			id: '207-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7865-361-32e907'
		},
		{
			index: '5S',
			id: '208-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7601-c6c-4bbe54'
		},
		{
			index: '5T',
			id: '209-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b94-b84-59a2d9'
		},
		{
			index: '5U',
			id: '210-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7f53-fab-ab4b7e'
		},
		{
			index: '5V',
			id: '211-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c07-7fb-4af900'
		},
		{
			index: '5W',
			id: '212-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-754b-170-1620b4'
		},
		{
			index: '5X',
			id: '213-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79f9-234-35d77a'
		},
		{
			index: '5Y',
			id: '214-localid',
			code: 'u0001-4-ruby',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-734f-b39-829ede'
		},
		{
			index: '5Z',
			id: '215-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-748e-4f6-0b1d48'
		},
		{
			index: '60',
			id: '216-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7c93-650-83c387'
		},
		{
			index: '61',
			id: '217-localid',
			code: 'u0001-4-ruby',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7bbf-d23-93099b'
		},
		{
			index: '62',
			id: '218-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-721c-b38-08750f'
		},
		{
			index: '63',
			id: '219-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7219-a84-dca22e'
		},
		{
			index: '64',
			id: '220-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7d6d-a60-2daf42'
		},
		{
			index: '65',
			id: '221-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7448-d75-710afc'
		},
		{
			index: '66',
			id: '222-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e5d-f3e-ac2a67'
		},
		{
			index: '67',
			id: '223-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79a1-d6d-b5066c'
		},
		{
			index: '68',
			id: '224-localid',
			code: 'u0001-1-zoe',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79e4-fe0-73c24a'
		},
		{
			index: '69',
			id: '225-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7628-3d8-09f09e'
		},
		{
			index: '6A',
			id: '226-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7070-bd7-16fe38'
		},
		{
			index: '6B',
			id: '227-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79d3-824-4e0c39'
		},
		{
			index: '6C',
			id: '228-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-74d5-225-10af3a'
		},
		{
			index: '6D',
			id: '229-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75ce-c20-388524'
		},
		{
			index: '6E',
			id: '230-localid',
			code: 'u0001-2-coco',
			experience: 2076000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76d4-71a-245273'
		},
		{
			index: '6F',
			id: '231-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-76d4-d63-bf9464'
		},
		{
			index: '6G',
			id: '232-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a08-85e-cc6720'
		},
		{
			index: '6H',
			id: '233-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78a5-a7e-a5b80a'
		},
		{
			index: '6I',
			id: '234-localid',
			code: 'u0001-1-zoe',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-796d-8bf-65eadc'
		},
		{
			index: '6J',
			id: '235-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7723-68e-f617d3'
		},
		{
			index: '6K',
			id: '236-localid',
			code: 'u0001-3-poki',
			experience: 5004000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7bfc-d6c-862a6b'
		},
		{
			index: '6L',
			id: '237-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7478-ef8-78607f'
		},
		{
			index: '6M',
			id: '238-localid',
			code: 'u0001-1-skye',
			experience: 5328000,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7537-5b6-8021bc'
		},
		{
			index: '6N',
			id: '239-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7673-01b-112d3d'
		},
		{
			index: '6O',
			id: '240-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7b78-448-5d8b03'
		},
		{
			index: '6P',
			id: '241-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-79b2-846-088a72'
		},
		{
			index: '6Q',
			id: '242-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e9a-825-08ba2b'
		},
		{
			index: '6R',
			id: '243-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7478-28b-cfe1db'
		},
		{
			index: '6S',
			id: '244-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-758f-473-e0f400'
		},
		{
			index: '6T',
			id: '245-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75e0-f66-37f77f'
		},
		{
			index: '6U',
			id: '246-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7a9f-ae2-97284a'
		},
		{
			index: '6V',
			id: '247-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-73f1-dca-4eb584'
		},
		{
			index: '6W',
			id: '248-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-77ab-1a3-3bd31c'
		},
		{
			index: '6X',
			id: '249-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70d0-062-8606d7'
		},
		{
			index: '6Y',
			id: '250-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7fd1-792-823db0'
		},
		{
			index: '6Z',
			id: '251-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-75f1-080-dd1d3b'
		},
		{
			index: '70',
			id: '252-localid',
			code: 'u0001-4-ruby',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-72c2-86e-882235'
		},
		{
			index: '71',
			id: '253-localid',
			code: 'u0001-3-arcus',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7d63-1c6-6774cb'
		},
		{
			index: '72',
			id: '254-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-70c1-2aa-7f371f'
		},
		{
			index: '73',
			id: '255-localid',
			code: 'u0001-1-zoe',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7084-ee3-379370'
		},
		{
			index: '74',
			id: '256-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7425-8f4-e48cbc'
		},
		{
			index: '75',
			id: '257-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-747c-619-fb22b6'
		},
		{
			index: '76',
			id: '258-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7be1-2d5-d6d33f'
		},
		{
			index: '77',
			id: '259-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-717a-3c4-6ddf70'
		},
		{
			index: '78',
			id: '260-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7567-42e-0cad72'
		},
		{
			index: '79',
			id: '261-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-799a-e1e-0c179f'
		},
		{
			index: '7A',
			id: '262-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7e85-f58-d8df95'
		},
		{
			index: '7B',
			id: '263-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78e5-209-435589'
		},
		{
			index: '7C',
			id: '264-localid',
			code: 'u0001-3-arcus',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7de2-79d-443dec'
		},
		{
			index: '7D',
			id: '265-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7507-a8c-b6b797'
		},
		{
			index: '7E',
			id: '266-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7260-eb3-9121ce'
		},
		{
			index: '7F',
			id: '267-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7511-91b-82366d'
		},
		{
			index: '7G',
			id: '268-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78aa-390-41c5aa'
		},
		{
			index: '7H',
			id: '269-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-74f1-65d-4af931'
		},
		{
			index: '7I',
			id: '270-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-78ba-cad-8695ef'
		},
		{
			index: '7J',
			id: '271-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7cec-9dc-987bd1'
		},
		{
			index: '7K',
			id: '272-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60ca-7940-315-beea0f'
		},
		{
			index: '7L',
			id: '273-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-775c-028-05a77b'
		},
		{
			index: '7M',
			id: '274-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-78c3-9dd-48decd'
		},
		{
			index: '7N',
			id: '275-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-752c-08a-96a689'
		},
		{
			index: '7O',
			id: '276-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7dcd-c95-922449'
		},
		{
			index: '7P',
			id: '277-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-76f6-aa7-8dccde'
		},
		{
			index: '7Q',
			id: '278-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7f2b-227-871a11'
		},
		{
			index: '7R',
			id: '279-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7c13-53c-c91af0'
		},
		{
			index: '7S',
			id: '280-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-77a5-4e3-03c505'
		},
		{
			index: '7T',
			id: '281-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7aa5-646-e80f27'
		},
		{
			index: '7U',
			id: '282-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-751c-ace-3a34fc'
		},
		{
			index: '7V',
			id: '283-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7daa-177-7a1a25'
		},
		{
			index: '7W',
			id: '284-localid',
			code: 'u0001-5-popo',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-72bf-64c-c54aa7'
		},
		{
			index: '7X',
			id: '285-localid',
			code: 'u0001-4-violet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7f5a-c3c-57c142'
		},
		{
			index: '7Y',
			id: '286-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7842-323-49045d'
		},
		{
			index: '7Z',
			id: '287-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7358-164-214ed2'
		},
		{
			index: '80',
			id: '288-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-764d-288-6ec3ff'
		},
		{
			index: '81',
			id: '289-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-72ab-9a8-1a2dfd'
		},
		{
			index: '82',
			id: '290-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-75b0-91b-4a4eee'
		},
		{
			index: '83',
			id: '291-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7003-9eb-74cc1f'
		},
		{
			index: '84',
			id: '292-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7390-ae8-548e55'
		},
		{
			index: '85',
			id: '293-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-703d-2a9-917ce3'
		},
		{
			index: '86',
			id: '294-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7bc3-6b8-0ec76f'
		},
		{
			index: '87',
			id: '295-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-78ec-a40-8257cf'
		},
		{
			index: '88',
			id: '296-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7c42-a5a-6a8bae'
		},
		{
			index: '89',
			id: '297-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-73f4-cf9-85cdee'
		},
		{
			index: '8A',
			id: '298-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7b8f-612-06ef98'
		},
		{
			index: '8B',
			id: '299-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7950-896-eabd7c'
		},
		{
			index: '8C',
			id: '300-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7b90-8a8-392fe5'
		},
		{
			index: '8D',
			id: '301-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-73d8-347-aa9b32'
		},
		{
			index: '8E',
			id: '302-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7291-616-d46451'
		},
		{
			index: '8F',
			id: '303-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-779e-e5e-39143b'
		},
		{
			index: '8G',
			id: '304-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-731c-d04-194ca0'
		},
		{
			index: '8H',
			id: '305-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7dd4-782-6cd59a'
		},
		{
			index: '8I',
			id: '306-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7508-b11-0f94ac'
		},
		{
			index: '8J',
			id: '307-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7316-783-ecbf1b'
		},
		{
			index: '8K',
			id: '308-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-78af-5b1-c782d8'
		},
		{
			index: '8L',
			id: '309-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7f19-b71-a81dac'
		},
		{
			index: '8M',
			id: '310-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7f84-0a2-e2b8dd'
		},
		{
			index: '8N',
			id: '311-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7dfa-ef6-82499a'
		},
		{
			index: '8O',
			id: '312-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7a04-07b-c42aaa'
		},
		{
			index: '8P',
			id: '313-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-72d4-f20-0aa8c3'
		},
		{
			index: '8Q',
			id: '314-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7da1-4fa-a32a57'
		},
		{
			index: '8R',
			id: '315-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7d51-287-892378'
		},
		{
			index: '8S',
			id: '316-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7620-943-ae6aa8'
		},
		{
			index: '8T',
			id: '317-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-794f-ba5-e6dc70'
		},
		{
			index: '8U',
			id: '318-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-78df-ccf-b2bdb3'
		},
		{
			index: '8V',
			id: '319-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-74e5-69e-be8a23'
		},
		{
			index: '8W',
			id: '320-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7dfb-67f-9dabf7'
		},
		{
			index: '8X',
			id: '321-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-74bd-f9f-3d8537'
		},
		{
			index: '8Y',
			id: '322-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7177-57d-a2757e'
		},
		{
			index: '8Z',
			id: '323-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-7192-ed1-41b3e8'
		},
		{
			index: '90',
			id: '324-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1,
			uuid: '01916e03-60cb-78b4-3c4-910ff1'
		}
	],
	newChars: [
		{
			index: '01916e03-60c9-7988-591-d3f658',
			id: '0-localid',
			code: 'u0001-1-macho',
			experience: 250800,
			uncappedLevel: 0,
			professorPoints: 10
		},
		{
			index: '01916e03-60ca-7705-5d1-a9718e',
			id: '1-localid',
			code: 'u0001-2-toto',
			experience: 576000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a28-b54-2aa90a',
			id: '2-localid',
			code: 'u0001-3-twinkle',
			experience: 19692000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7cef-19c-1250fb',
			id: '3-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7307-d4d-caed66',
			id: '4-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7d85-88d-06e94e',
			id: '5-localid',
			code: 'u0001-4-antonio',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f74-f41-6156dc',
			id: '6-localid',
			code: 'u0001-4-bumpier',
			experience: 14022000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7eff-d55-1f0296',
			id: '7-localid',
			code: 'u0001-4-tabi',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c97-94a-088a28',
			id: '8-localid',
			code: 'u0001-5-electopus',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7748-8ca-8328ab',
			id: '9-localid',
			code: 'u0001-5-santelmo',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-77c6-df9-2cc5aa',
			id: '10-localid',
			code: 'u0001-5-kelvin',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b79-21b-ed04d5',
			id: '11-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7891-131-bbd225',
			id: '12-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-72c3-23c-8c74d5',
			id: '13-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71ce-546-657025',
			id: '14-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7cb8-de3-396582',
			id: '15-localid',
			code: 'u0001-5-barbell',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f4e-f09-1b7514',
			id: '16-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70e3-f12-712c8b',
			id: '17-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a5f-5d3-b66f63',
			id: '18-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-707e-472-6ad555',
			id: '19-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fcc-86f-a34f22',
			id: '20-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-790e-f49-738732',
			id: '21-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7ee1-3fc-2de656',
			id: '22-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71de-923-16a391',
			id: '23-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c9c-b03-c3ba04',
			id: '24-localid',
			code: 'u0001-1-benny',
			experience: 216400,
			uncappedLevel: 4,
			professorPoints: 10
		},
		{
			index: '01916e03-60ca-786c-075-dbd964',
			id: '25-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a37-68b-99470d',
			id: '26-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-792f-675-219ab8',
			id: '27-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-715b-427-bdae7a',
			id: '28-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a30-bf1-90c314',
			id: '29-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e90-6bb-766f0f',
			id: '30-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7d6b-cb9-01a8a6',
			id: '31-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b91-ba8-d46389',
			id: '32-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7481-45b-6ecfed',
			id: '33-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e3b-753-c244d6',
			id: '34-localid',
			code: 'u0001-4-slabb',
			experience: 15978000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b78-869-1b6573',
			id: '35-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7471-b10-8cb444',
			id: '36-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7883-d93-4742b1',
			id: '37-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7037-baf-54e405',
			id: '38-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7519-4c7-051696',
			id: '39-localid',
			code: 'u0001-3-zar',
			experience: 1309833269717799700,
			uncappedLevel: 4,
			professorPoints: 6
		},
		{
			index: '01916e03-60ca-716b-361-0801ce',
			id: '40-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-73fd-fda-300151',
			id: '41-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7dd9-d74-3d98af',
			id: '42-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f39-38f-a044a2',
			id: '43-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70fa-70f-015d42',
			id: '44-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-786e-762-a00820',
			id: '45-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e70-fbb-791402',
			id: '46-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-72e4-a00-818e06',
			id: '47-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b32-c8c-c4e37c',
			id: '48-localid',
			code: 'u0001-3-rose',
			experience: 2784000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71c8-48e-570212',
			id: '49-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71be-3a9-14376c',
			id: '50-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-710c-f44-218f55',
			id: '51-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-715f-221-805017',
			id: '52-localid',
			code: 'u0001-4-slabb',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-74e1-b0b-33ea68',
			id: '53-localid',
			code: 'u0001-4-violet',
			experience: 1045777382379918000,
			uncappedLevel: 4,
			professorPoints: 6
		},
		{
			index: '01916e03-60ca-7fe2-231-e754c3',
			id: '54-localid',
			code: 'u0001-2-ogre',
			experience: 548133594704679500,
			uncappedLevel: 0,
			professorPoints: 7
		},
		{
			index: '01916e03-60ca-7f8d-4a9-0d785e',
			id: '55-localid',
			code: 'u0001-4-crimson',
			experience: 1045777382379918000,
			uncappedLevel: 4,
			professorPoints: 6
		},
		{
			index: '01916e03-60ca-7cd8-af8-9e6e19',
			id: '56-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a60-f44-90fe22',
			id: '57-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70dd-473-192106',
			id: '58-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7019-5d2-514dc6',
			id: '59-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-793d-19f-d661d7',
			id: '60-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fdf-e46-7ee562',
			id: '61-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-74e5-b09-9b6e29',
			id: '62-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b69-19e-b2f38e',
			id: '63-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7807-ecb-1806cc',
			id: '64-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7177-dc2-b95cfc',
			id: '65-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71f3-3f7-3cdae9',
			id: '66-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75a1-ab3-83444d',
			id: '67-localid',
			code: 'u0001-4-slabb',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-783e-ff8-02c4a2',
			id: '68-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7be2-2b6-69598f',
			id: '69-localid',
			code: 'u0001-5-crack9',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7d6e-d2c-2e4b43',
			id: '70-localid',
			code: 'u0001-2-toto',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7cfa-98c-c5bb44',
			id: '71-localid',
			code: 'u0001-4-bumpier',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-714b-d55-a79cba',
			id: '72-localid',
			code: 'u0001-3-rose',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-703e-ad7-e2c819',
			id: '73-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7196-487-501fc1',
			id: '74-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7660-b3c-866a84',
			id: '75-localid',
			code: 'u0001-5-robia',
			experience: 15354000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f10-792-f786cb',
			id: '76-localid',
			code: 'u0001-4-aynstine',
			experience: 5790000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-799d-831-0dd5c7',
			id: '77-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75c6-118-3920d1',
			id: '78-localid',
			code: 'u0001-4-antonio',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b00-1f7-8835c0',
			id: '79-localid',
			code: 'u0001-4-openhyman',
			experience: 19848000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-72dd-aaa-759546',
			id: '80-localid',
			code: 'u0001-4-pineman',
			experience: 6078000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7596-f84-2835b6',
			id: '81-localid',
			code: 'u0001-4-boar',
			experience: 6078000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7398-1d6-013353',
			id: '82-localid',
			code: 'u0001-4-crimson',
			experience: 11442000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76df-68d-eb464b',
			id: '83-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7577-034-5deb47',
			id: '84-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b7a-fbd-116e8a',
			id: '85-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7731-c6e-782088',
			id: '86-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b17-ff2-98ed85',
			id: '87-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e06-4b4-8e715b',
			id: '88-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c0b-e10-7cfc75',
			id: '89-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71b6-720-d83d75',
			id: '90-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7301-f6a-598796',
			id: '91-localid',
			code: 'u0001-4-aynstine',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7ac7-2dc-468e14',
			id: '92-localid',
			code: 'u0001-1-pete',
			experience: 30540000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f3f-984-16387d',
			id: '93-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7dc2-1cf-8e7fa6',
			id: '94-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7499-5f9-9eef45',
			id: '95-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7801-cfa-0b9e22',
			id: '96-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7896-9ed-9d61af',
			id: '97-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71a3-73e-e26a02',
			id: '98-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7208-967-618c0e',
			id: '99-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79f3-8f6-29c915',
			id: '100-localid',
			code: 'u0001-5-bibly',
			experience: 50489807029441100,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b49-efd-f41519',
			id: '101-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fd3-74b-d03715',
			id: '102-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-712b-f83-4a1062',
			id: '103-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7cdf-b61-9098ac',
			id: '104-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c1b-e14-58b311',
			id: '105-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7dcf-9ec-173ea9',
			id: '106-localid',
			code: 'u0001-2-zerosix',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7664-bb8-5d1f83',
			id: '107-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7ed6-5c5-b9a663',
			id: '108-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-763a-14c-78e7f5',
			id: '109-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7efe-98a-3ae6bc',
			id: '110-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-73d3-053-6b199d',
			id: '111-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7662-738-cb69c5',
			id: '112-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78a3-7b0-eefe97',
			id: '113-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f10-e42-f85e5d',
			id: '114-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a31-ee6-2ae983',
			id: '115-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-742a-931-3322a0',
			id: '116-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-726c-939-f2640e',
			id: '117-localid',
			code: 'u0001-2-tom',
			experience: 578601581705204400,
			uncappedLevel: 0,
			professorPoints: 7
		},
		{
			index: '01916e03-60ca-7bf6-db0-a46335',
			id: '118-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-776a-513-749de0',
			id: '119-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75a8-7ba-b705e7',
			id: '120-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fb5-527-f2896c',
			id: '121-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7363-290-51bc8f',
			id: '122-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-782c-57c-122f05',
			id: '123-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76f4-351-4e7521',
			id: '124-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-73fe-994-b91ae6',
			id: '125-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7517-bb8-d11347',
			id: '126-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b5e-a1e-2ac096',
			id: '127-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a9c-d39-873161',
			id: '128-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7357-5e5-70be49',
			id: '129-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7566-61c-97f3ca',
			id: '130-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78e4-e09-c8a578',
			id: '131-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71e3-b3a-45f167',
			id: '132-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79a1-d1d-badeeb',
			id: '133-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70d7-831-e1e132',
			id: '134-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f5d-403-daa850',
			id: '135-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71e3-9c6-3faf08',
			id: '136-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-751a-243-73508c',
			id: '137-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-739d-f39-2e5d86',
			id: '138-localid',
			code: 'u0001-4-pineman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f3e-06c-5918e7',
			id: '139-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c21-6e7-29d662',
			id: '140-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76d1-b0b-8967fb',
			id: '141-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f40-5c9-bf2866',
			id: '142-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71da-d8c-954df2',
			id: '143-localid',
			code: 'u0001-1-zoe',
			experience: 19146000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a47-821-406922',
			id: '144-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-74d1-d69-b445b3',
			id: '145-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7ea7-051-5cf75c',
			id: '146-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-762d-d26-a8b16c',
			id: '147-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7aa9-59f-a0d951',
			id: '148-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-714c-b48-40e857',
			id: '149-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-74e0-7c4-26f21a',
			id: '150-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7768-f77-f97bcf',
			id: '151-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-707e-048-5afea7',
			id: '152-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f26-126-e99eef',
			id: '153-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78e3-dd4-69defa',
			id: '154-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7cd8-f4c-6e06a7',
			id: '155-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f6b-f8d-960373',
			id: '156-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7eca-b28-12270a',
			id: '157-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75c7-523-53ccc1',
			id: '158-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a8b-eaf-4bd77e',
			id: '159-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b73-6ee-95e7b3',
			id: '160-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7722-b79-d2a9a6',
			id: '161-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b90-455-5f35be',
			id: '162-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76e9-a77-a9877f',
			id: '163-localid',
			code: 'u0001-5-prickles',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-780d-2af-7588dc',
			id: '164-localid',
			code: 'u0001-3-zar',
			experience: 7302000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fcb-114-3312d3',
			id: '165-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e2a-8e3-7ecfbb',
			id: '166-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f3e-f9c-0c9be3',
			id: '167-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79d6-3d3-57d5cc',
			id: '168-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fbb-deb-4baa9f',
			id: '169-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7045-e6a-c0ef95',
			id: '170-localid',
			code: 'u0001-5-multo',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c4b-b90-2ca8ce',
			id: '171-localid',
			code: 'u0001-4-bumpier',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78bd-ff6-ae5ce4',
			id: '172-localid',
			code: 'u0001-3-corpus',
			experience: 28170000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71f3-e85-994236',
			id: '173-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-72fd-567-20a8f0',
			id: '174-localid',
			code: 'u0001-4-liz',
			experience: 17466000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-73b4-f06-dbac75',
			id: '175-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78f1-6b4-faeee8',
			id: '176-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75e5-792-91fcbf',
			id: '177-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-770c-e16-cc611f',
			id: '178-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75e4-dfb-6c7958',
			id: '179-localid',
			code: 'u0001-2-jet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7527-5b6-52531e',
			id: '180-localid',
			code: 'u0001-3-arcus',
			experience: 8004000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7677-5d0-8d372e',
			id: '181-localid',
			code: 'u0001-4-openhyman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-71c2-eb4-e80e47',
			id: '182-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79a4-a0b-e00a12',
			id: '183-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-762c-527-525101',
			id: '184-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e2a-d84-1f405f',
			id: '185-localid',
			code: 'u0001-4-openhyman',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7796-859-62568a',
			id: '186-localid',
			code: 'u0001-3-pismud',
			experience: 7248000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76eb-40c-9fe967',
			id: '187-localid',
			code: 'u0001-3-pismud',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e04-14c-16194b',
			id: '188-localid',
			code: 'u0001-4-crimson',
			experience: 288000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7ef2-89a-6fa246',
			id: '189-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70d3-c18-88581e',
			id: '190-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e8e-c60-454422',
			id: '191-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e63-298-9f1266',
			id: '192-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76d1-d82-04feb2',
			id: '193-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7217-130-587f4b',
			id: '194-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-724f-bc8-a2c7a3',
			id: '195-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7863-50f-f1d480',
			id: '196-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f97-878-7b3a9b',
			id: '197-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a54-841-fd7a03',
			id: '198-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7d1c-c14-632be4',
			id: '199-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7043-0a7-86688f',
			id: '200-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7aa7-eb1-19d2ec',
			id: '201-localid',
			code: 'u0001-4-antonio',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7870-005-78345e',
			id: '202-localid',
			code: 'u0001-4-ruby',
			experience: 8796000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7493-c57-1f2612',
			id: '203-localid',
			code: 'u0001-3-timmy',
			experience: 7716000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b2b-3bf-484367',
			id: '204-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7907-71f-595f4a',
			id: '205-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7865-361-32e907',
			id: '206-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7601-c6c-4bbe54',
			id: '207-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b94-b84-59a2d9',
			id: '208-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7f53-fab-ab4b7e',
			id: '209-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c07-7fb-4af900',
			id: '210-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-754b-170-1620b4',
			id: '211-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79f9-234-35d77a',
			id: '212-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-734f-b39-829ede',
			id: '213-localid',
			code: 'u0001-4-ruby',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-748e-4f6-0b1d48',
			id: '214-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7c93-650-83c387',
			id: '215-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7bbf-d23-93099b',
			id: '216-localid',
			code: 'u0001-4-ruby',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-721c-b38-08750f',
			id: '217-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7219-a84-dca22e',
			id: '218-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7d6d-a60-2daf42',
			id: '219-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7448-d75-710afc',
			id: '220-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e5d-f3e-ac2a67',
			id: '221-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79a1-d6d-b5066c',
			id: '222-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79e4-fe0-73c24a',
			id: '223-localid',
			code: 'u0001-1-zoe',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7628-3d8-09f09e',
			id: '224-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7070-bd7-16fe38',
			id: '225-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79d3-824-4e0c39',
			id: '226-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-74d5-225-10af3a',
			id: '227-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75ce-c20-388524',
			id: '228-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76d4-71a-245273',
			id: '229-localid',
			code: 'u0001-2-coco',
			experience: 2076000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-76d4-d63-bf9464',
			id: '230-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a08-85e-cc6720',
			id: '231-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78a5-a7e-a5b80a',
			id: '232-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-796d-8bf-65eadc',
			id: '233-localid',
			code: 'u0001-1-zoe',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7723-68e-f617d3',
			id: '234-localid',
			code: 'u0001-1-pete',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7bfc-d6c-862a6b',
			id: '235-localid',
			code: 'u0001-3-poki',
			experience: 5004000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7478-ef8-78607f',
			id: '236-localid',
			code: 'u0001-3-zar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7537-5b6-8021bc',
			id: '237-localid',
			code: 'u0001-1-skye',
			experience: 5328000,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7673-01b-112d3d',
			id: '238-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7b78-448-5d8b03',
			id: '239-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-79b2-846-088a72',
			id: '240-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e9a-825-08ba2b',
			id: '241-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7478-28b-cfe1db',
			id: '242-localid',
			code: 'u0001-4-aynstine',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-758f-473-e0f400',
			id: '243-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75e0-f66-37f77f',
			id: '244-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7a9f-ae2-97284a',
			id: '245-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-73f1-dca-4eb584',
			id: '246-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-77ab-1a3-3bd31c',
			id: '247-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70d0-062-8606d7',
			id: '248-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7fd1-792-823db0',
			id: '249-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-75f1-080-dd1d3b',
			id: '250-localid',
			code: 'u0001-4-vispi',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-72c2-86e-882235',
			id: '251-localid',
			code: 'u0001-4-ruby',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7d63-1c6-6774cb',
			id: '252-localid',
			code: 'u0001-3-arcus',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-70c1-2aa-7f371f',
			id: '253-localid',
			code: 'u0001-5-blanko',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7084-ee3-379370',
			id: '254-localid',
			code: 'u0001-1-zoe',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7425-8f4-e48cbc',
			id: '255-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-747c-619-fb22b6',
			id: '256-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7be1-2d5-d6d33f',
			id: '257-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-717a-3c4-6ddf70',
			id: '258-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7567-42e-0cad72',
			id: '259-localid',
			code: 'u0001-3-poki',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-799a-e1e-0c179f',
			id: '260-localid',
			code: 'u0001-2-coco',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7e85-f58-d8df95',
			id: '261-localid',
			code: 'u0001-5-wap',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78e5-209-435589',
			id: '262-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7de2-79d-443dec',
			id: '263-localid',
			code: 'u0001-3-arcus',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7507-a8c-b6b797',
			id: '264-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7260-eb3-9121ce',
			id: '265-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7511-91b-82366d',
			id: '266-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78aa-390-41c5aa',
			id: '267-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-74f1-65d-4af931',
			id: '268-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-78ba-cad-8695ef',
			id: '269-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7cec-9dc-987bd1',
			id: '270-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60ca-7940-315-beea0f',
			id: '271-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-775c-028-05a77b',
			id: '272-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-78c3-9dd-48decd',
			id: '273-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-752c-08a-96a689',
			id: '274-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7dcd-c95-922449',
			id: '275-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-76f6-aa7-8dccde',
			id: '276-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7f2b-227-871a11',
			id: '277-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7c13-53c-c91af0',
			id: '278-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-77a5-4e3-03c505',
			id: '279-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7aa5-646-e80f27',
			id: '280-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-751c-ace-3a34fc',
			id: '281-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7daa-177-7a1a25',
			id: '282-localid',
			code: 'u0001-4-boar',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-72bf-64c-c54aa7',
			id: '283-localid',
			code: 'u0001-5-popo',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7f5a-c3c-57c142',
			id: '284-localid',
			code: 'u0001-4-violet',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7842-323-49045d',
			id: '285-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7358-164-214ed2',
			id: '286-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-764d-288-6ec3ff',
			id: '287-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-72ab-9a8-1a2dfd',
			id: '288-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-75b0-91b-4a4eee',
			id: '289-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7003-9eb-74cc1f',
			id: '290-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7390-ae8-548e55',
			id: '291-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-703d-2a9-917ce3',
			id: '292-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7bc3-6b8-0ec76f',
			id: '293-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-78ec-a40-8257cf',
			id: '294-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7c42-a5a-6a8bae',
			id: '295-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-73f4-cf9-85cdee',
			id: '296-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7b8f-612-06ef98',
			id: '297-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7950-896-eabd7c',
			id: '298-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7b90-8a8-392fe5',
			id: '299-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-73d8-347-aa9b32',
			id: '300-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7291-616-d46451',
			id: '301-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-779e-e5e-39143b',
			id: '302-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-731c-d04-194ca0',
			id: '303-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7dd4-782-6cd59a',
			id: '304-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7508-b11-0f94ac',
			id: '305-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7316-783-ecbf1b',
			id: '306-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-78af-5b1-c782d8',
			id: '307-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7f19-b71-a81dac',
			id: '308-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7f84-0a2-e2b8dd',
			id: '309-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7dfa-ef6-82499a',
			id: '310-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7a04-07b-c42aaa',
			id: '311-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-72d4-f20-0aa8c3',
			id: '312-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7da1-4fa-a32a57',
			id: '313-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7d51-287-892378',
			id: '314-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7620-943-ae6aa8',
			id: '315-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-794f-ba5-e6dc70',
			id: '316-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-78df-ccf-b2bdb3',
			id: '317-localid',
			code: 'u0001-5-drat',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-74e5-69e-be8a23',
			id: '318-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7dfb-67f-9dabf7',
			id: '319-localid',
			code: 'u0001-3-twinkle',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-74bd-f9f-3d8537',
			id: '320-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7177-57d-a2757e',
			id: '321-localid',
			code: 'u0001-5-robia',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-7192-ed1-41b3e8',
			id: '322-localid',
			code: 'u0001-5-bibly',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		},
		{
			index: '01916e03-60cb-78b4-3c4-910ff1',
			id: '323-localid',
			code: 'u0001-4-crimson',
			experience: 0,
			uncappedLevel: 0,
			professorPoints: 1
		}
	]
};

const teams = {
	prevTeams: {
		'Team 1': {
			a: [
				{
					id: '175-localid'
				},
				{
					id: '54-localid'
				},
				{
					id: '93-localid'
				},
				{
					id: '25-localid'
				},
				{
					id: '173-localid'
				}
			],
			b: [
				{
					id: '6-localid'
				},
				{
					id: '35-localid'
				},
				{
					id: '2-localid'
				},
				{
					id: '80-localid'
				},
				{
					id: '76-localid'
				}
			]
		},
		'Team 2': {
			a: [
				{
					id: '187-localid'
				},
				{
					id: '1-localid'
				},
				{
					id: '107-localid'
				},
				{
					id: '40-localid'
				},
				{
					id: '181-localid'
				}
			],
			b: [
				{
					id: '5-localid'
				},
				{
					id: '6-localid'
				},
				{
					id: '7-localid'
				},
				{
					id: '8-localid'
				},
				{
					id: '56-localid'
				}
			]
		},
		'Team 3': {
			a: [
				{
					id: '203-localid'
				},
				{
					id: '15-localid'
				},
				{
					id: '54-localid'
				},
				{
					id: '49-localid'
				},
				{
					id: '60-localid'
				}
			],
			b: [
				{
					id: '3-localid'
				},
				{
					id: '6-localid'
				},
				{
					id: '7-localid'
				},
				{
					id: '8-localid'
				},
				{
					id: '4-localid'
				}
			]
		},
		'Team 4': {
			a: [
				{
					id: '4-localid'
				},
				{
					id: '0-localid'
				},
				{
					id: '2-localid'
				},
				{
					id: '14-localid'
				},
				{
					id: '55-localid'
				}
			],
			b: [
				{
					id: '5-localid'
				},
				{
					id: '6-localid'
				},
				{
					id: '54-localid'
				},
				{
					id: '76-localid'
				},
				{
					id: '13-localid'
				}
			]
		},
		'Team 5': {
			a: [
				{
					id: '175-localid'
				},
				{
					id: '80-localid'
				},
				{
					id: '81-localid'
				},
				{
					id: '82-localid'
				},
				{
					id: '92-localid'
				}
			],
			b: [
				{
					id: '9-localid'
				},
				{
					id: '25-localid'
				},
				{
					id: '54-localid'
				},
				{
					id: '55-localid'
				},
				{
					id: '56-localid'
				}
			]
		},
		Defense: {
			a: [
				{
					id: '2-localid'
				},
				{
					id: '25-localid'
				},
				{
					id: '35-localid'
				},
				{
					id: '54-localid'
				},
				{
					id: '175-localid'
				}
			],
			b: [
				{
					id: '56-localid'
				},
				{
					id: '93-localid'
				},
				{
					id: '76-localid'
				},
				{
					id: '144-localid'
				},
				{
					id: '173-localid'
				}
			]
		}
	},
	newTeams: {
		'Team 1': {
			a: [
				{
					id: '170-localid'
				},
				{
					id: '49-localid'
				},
				{
					id: '88-localid'
				},
				{
					id: '20-localid'
				},
				{
					id: '168-localid'
				}
			],
			b: [
				{
					id: '6-localid'
				},
				{
					id: '30-localid'
				},
				{
					id: '2-localid'
				},
				{
					id: '75-localid'
				},
				{
					id: '71-localid'
				}
			]
		},
		'Team 2': {
			a: [
				{
					id: '182-localid'
				},
				{
					id: '1-localid'
				},
				{
					id: '102-localid'
				},
				{
					id: '35-localid'
				},
				{
					id: '176-localid'
				}
			],
			b: [
				{
					id: '5-localid'
				},
				{
					id: '6-localid'
				},
				{
					id: '7-localid'
				},
				{
					id: '8-localid'
				},
				{
					id: '51-localid'
				}
			]
		},
		'Team 3': {
			a: [
				{
					id: '198-localid'
				},
				{
					id: '0-localid'
				},
				{
					id: '49-localid'
				},
				{
					id: '44-localid'
				},
				{
					id: '55-localid'
				}
			],
			b: [
				{
					id: '3-localid'
				},
				{
					id: '6-localid'
				},
				{
					id: '7-localid'
				},
				{
					id: '8-localid'
				},
				{
					id: '4-localid'
				}
			]
		},
		'Team 4': {
			a: [
				{
					id: '4-localid'
				},
				{
					id: '0-localid'
				},
				{
					id: '2-localid'
				},
				{
					id: '0-localid'
				},
				{
					id: '50-localid'
				}
			],
			b: [
				{
					id: '5-localid'
				},
				{
					id: '6-localid'
				},
				{
					id: '49-localid'
				},
				{
					id: '71-localid'
				},
				{
					id: '0-localid'
				}
			]
		},
		'Team 5': {
			a: [
				{
					id: '170-localid'
				},
				{
					id: '75-localid'
				},
				{
					id: '76-localid'
				},
				{
					id: '77-localid'
				},
				{
					id: '87-localid'
				}
			],
			b: [
				{
					id: '9-localid'
				},
				{
					id: '20-localid'
				},
				{
					id: '49-localid'
				},
				{
					id: '50-localid'
				},
				{
					id: '51-localid'
				}
			]
		},
		Defense: {
			a: [
				{
					id: '2-localid'
				},
				{
					id: '20-localid'
				},
				{
					id: '30-localid'
				},
				{
					id: '49-localid'
				},
				{
					id: '170-localid'
				}
			],
			b: [
				{
					id: '51-localid'
				},
				{
					id: '88-localid'
				},
				{
					id: '71-localid'
				},
				{
					id: '139-localid'
				},
				{
					id: '168-localid'
				}
			]
		}
	}
};
