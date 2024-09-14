import { listAvailableUnits } from '../utils/units.js';
import { getAllThumbnails } from '../visuals/assets/character.js';

export const getCollection = async () => {
	const collection = listAvailableUnits();
	const thumbnails = await getAllThumbnails();
	for (const unit of collection) {
		//TODO: mark whether or not user has this
		unit.image = thumbnails[unit.code];
		unit.collected = false;
	}
	return collection;
};
