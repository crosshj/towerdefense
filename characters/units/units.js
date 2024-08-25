import { unitsAll } from '/$data/unitsAll.js';

const animations = [
	{ code: 'idle', displayName: 'Idle' },
	{ code: 'jumping', displayName: 'Jumping' },
	{ code: 'sprite_swap', displayName: 'Swapping 1' },
	{ code: 'sprite_swap2', displayName: 'Swapping 2' }
];

export const listAvailableUnits = () => {
	return Object.entries(unitsAll).map(([code, v]) => ({ code, ...v }));
};

export const listAvailableAnimations = () => {
	return animations;
};

export const unitsMapper = ({ withLevelInfo }) => {
	const mapped = {};
	for (const [key, value] of Object.entries(unitsAll)) {
		mapped[key] = (thisUnit) => {
			const { experience, uncappedLevel = 0, id } = thisUnit;
			const withId = {
				...thisUnit,
				id,
				code: key,
				uncappedLevel,
				...value
			};
			return withLevelInfo(withId, experience);
		};
	}
	return mapped;
};
