export const nodeTree = {
	background: undefined,
	container: {
		containerBg: undefined,
		closeButton: undefined,
		content: {
			left: {
				loading: undefined,
				stars: undefined,
				name: {
					first: undefined,
					second: undefined,
				},
				element: {
					icon: undefined,
					name: undefined,
					help: undefined,
				},
				character: {
					background: undefined,
					image: undefined,
				},
				gear: {
					weapon: undefined,
					armor: undefined,
					accessory: undefined,
					more: undefined,
				},
				actions: {
					levelUp: undefined,
					potentialUp: undefined,
				},
			},
			right: {
				loading: undefined,
				rowOne: {
					level: {
						current: undefined,
						slash: undefined,
						max: undefined,
					},
					cap: undefined,
					percent: {
						bar: undefined,
						number: undefined,
					},
					professorPoints: {
						icon: undefined,
						amount: undefined,
					},
				},
				rowTwo: {
					type: {
						icon: undefined,
						name: undefined,
						help: undefined,
					},
					mineral: {
						icon: undefined,
						amount: undefined,
					},
					details: undefined,
				},
				separator: undefined,
				details: {
					basic: {
						metrics: {
							attack: {
								icon: undefined,
								value: undefined,
							},
							health: {
								icon: undefined,
								value: undefined,
							},
							defense: {
								icon: undefined,
								value: undefined,
							},
						},
						speed: {
							attackSpeed: { value: undefined },
							moveSpeed: { value: undefined },
						},
						skill: {
							skillOne: undefined,
							skillTwo: undefined,
							skillThree: undefined,
						},
						ability: {
							abilityOne: undefined,
							abilityTwo: undefined,
						},
					},
					advanced: undefined,
				},
				actions: {
					evolve: undefined,
					ultraEvolve: undefined,
					hyperEvolve: undefined,
					switchEvolve: undefined,
					lock: undefined,
				},
			},
		},
	},
};

export function populateNodeTree(obj, path = '') {
	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			populateNodeTree(obj[key], `${path} .${key}`);
		} else {
			obj[key] = document.querySelector(`${path} .${key}`);
		}
	}
}
