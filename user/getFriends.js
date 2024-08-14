import { getUserLevelInfo } from '../utils/experience.js';

const gradeOrder = ['N', 'M', 'S', 'U', 'L'];
function sort(players) {
	return players.sort((a, b) => {
		const gradeComparison =
			gradeOrder.indexOf(b.grade) - gradeOrder.indexOf(a.grade);
		if (gradeComparison !== 0) {
			return gradeComparison;
		}
		return b.level - a.level;
	});
}
const PlayerToFriend = (player) => {
	const { data, ...playerRest } = player;
	const { exp, rank, ...dataRest } = data;
	const levelInfo = getUserLevelInfo(
		player?.data?.exp || 0,
		player?.data?.rank || 1
	);
	return {
		...playerRest,
		...dataRest,
		displayName: player.name,
		level: levelInfo.level,
		grade: levelInfo.gradeFriendly[0]
	};
};

export const getFriends = async () => {
	// TODO: should be a call to friends endpoin not players(?)
	let players = await fetch(
		'https://datamosh.vercel.app/api/teedee/players'
	).then((x) => x.json());
	players = players.filter((x) => typeof x.last_login === 'string');

	return players.map(PlayerToFriend);
};

//prettier-ignore
export const getFriendsX = async () => sort([
	{ displayName: 'DragonKnight82', level: 45, grade: 'M' },
	{ displayName: 'PixieDust', level: 92, grade: 'S' },
	{ displayName: 'BlazeFury', level: 36, grade: 'U' },
	{ displayName: 'ShadowWolf', level: 58, grade: 'L' },
	{ displayName: 'QuickSilver', level: 75, grade: 'M' },
	{ displayName: 'StarGazer91', level: 23, grade: 'N' },
	{ displayName: 'MysticMage', level: 81, grade: 'U' },
	{ displayName: 'EchoBlade', level: 67, grade: 'L' },
	{ displayName: 'FireFox', level: 34, grade: 'M' },
	{ displayName: 'LunaRider', level: 29, grade: 'N' },
	{ displayName: 'ThunderStrike', level: 88, grade: 'U' },
	{ displayName: 'IceQueen', level: 12, grade: 'L' },
	{ displayName: 'DarkSorcerer', level: 95, grade: 'M' },
	{ displayName: 'NebulaVoyager', level: 47, grade: 'N' },
	{ displayName: 'SilentNinja', level: 53, grade: 'U' },
	{ displayName: 'CrystalPhoenix', level: 71, grade: 'L' },
	{ displayName: 'NightHawk', level: 42, grade: 'M' },
	{ displayName: 'CosmicWizard', level: 64, grade: 'S' },
	{ displayName: 'IronGolem', level: 56, grade: 'U' },
	{ displayName: 'WildRogue', level: 19, grade: 'L' },
	{ displayName: 'GalacticHero', level: 86, grade: 'M' },
	{ displayName: 'FrostBite', level: 48, grade: 'S' },
	{ displayName: 'ZenMaster', level: 37, grade: 'U' },
	{ displayName: 'CyberSamurai', level: 14, grade: 'L' },
	{ displayName: 'DesertStorm', level: 61, grade: 'M' },
	{ displayName: 'AquaMarine', level: 52, grade: 'S' },
	{ displayName: 'DuskRaider', level: 26, grade: 'U' },
	{ displayName: 'MagicFlame', level: 49, grade: 'L' },
	{ displayName: 'SunsetSailor', level: 93, grade: 'M' },
	{ displayName: 'StormBreaker', level: 15, grade: 'S' },
	{ displayName: 'RavenClaw', level: 78, grade: 'N' },
	{ displayName: 'SolarSphinx', level: 33, grade: 'L' },
	{ displayName: 'GhostHunter', level: 87, grade: 'M' },
	{ displayName: 'VortexSeeker', level: 59, grade: 'S' },
	{ displayName: 'WindWhisper', level: 74, grade: 'U' },
	{ displayName: 'StarShadow', level: 21, grade: 'L' },
	{ displayName: 'CinderKnight', level: 65, grade: 'M' },
	{ displayName: 'RogueAgent', level: 31, grade: 'S' },
	{ displayName: 'EagleEye', level: 91, grade: 'N' },
	{ displayName: 'TwilightMage', level: 27, grade: 'L' },
	{ displayName: 'PhantomDancer', level: 84, grade: 'M' },
	{ displayName: 'GalaxyRider', level: 39, grade: 'S' },
	{ displayName: 'SpectralWarrior', level: 77, grade: 'U' },
	{ displayName: 'FrozenHeart', level: 46, grade: 'L' },
	{ displayName: 'FireDrake', level: 35, grade: 'M' },
	{ displayName: 'AbyssWanderer', level: 68, grade: 'S' },
	{ displayName: 'MagmaKing', level: 57, grade: 'U' },
	{ displayName: 'RuneCaster', level: 25, grade: 'L' },
	{ displayName: 'SkyGuardian', level: 90, grade: 'M' },
	{ displayName: 'SteelTitan', level: 38, grade: 'S' },
	{ displayName: 'MoonLight', level: 55, grade: 'U' },
	{ displayName: 'FuryKnight', level: 17, grade: 'L' },
	{ displayName: 'StarRider', level: 79, grade: 'M' },
	{ displayName: 'VoidRunner', level: 44, grade: 'S' },
	{ displayName: 'IronClad', level: 99, grade: 'U' },
	{ displayName: 'CometRacer', level: 11, grade: 'N' },
	{ displayName: 'MysticSage', level: 60, grade: 'M' },
	{ displayName: 'LightBringer', level: 13, grade: 'S' },
	{ displayName: 'DeathBringer', level: 73, grade: 'U' },
	{ displayName: 'ShadowHunter', level: 40, grade: 'L' },
	{ displayName: 'AncientOne', level: 82, grade: 'M' },
	{ displayName: 'StormKnight', level: 66, grade: 'S' },
	{ displayName: 'SkyWalker', level: 22, grade: 'N' },
	{ displayName: 'DoomSlayer', level: 85, grade: 'L' },
	{ displayName: 'SilverWraith', level: 43, grade: 'M' },
	{ displayName: 'VoidWalker', level: 30, grade: 'S' },
	{ displayName: 'IronWraith', level: 69, grade: 'U' },
	{ displayName: 'FlameKnight', level: 18, grade: 'L' },
	{ displayName: 'DarkShade', level: 96, grade: 'M' },
	{ displayName: 'CelestialMage', level: 54, grade: 'S' },
	{ displayName: 'GrimReaper', level: 76, grade: 'U' },
	{ displayName: 'PhoenixAsh', level: 32, grade: 'L' },
	{ displayName: 'SilentShadow', level: 83, grade: 'M' },
	{ displayName: 'Firestorm', level: 24, grade: 'N' },
	{ displayName: 'VoidKnight', level: 41, grade: 'U' },
	{ displayName: 'NightRaven', level: 89, grade: 'L' },
	{ displayName: 'DuskKnight', level: 51, grade: 'M' },
	{ displayName: 'CosmicKnight', level: 16, grade: 'S' },
	{ displayName: 'SunWarrior', level: 70, grade: 'U' },
	{ displayName: 'LunarKnight', level: 28, grade: 'L' },
	{ displayName: 'StarWanderer', level: 97, grade: 'M' },
	{ displayName: 'TwilightWarrior', level: 62, grade: 'S' },
	{ displayName: 'ThunderMage', level: 20, grade: 'U' },
	{ displayName: 'ShadowMage', level: 50, grade: 'L' },
	{ displayName: 'SilverKnight', level: 80, grade: 'M' },
	{ displayName: 'FireWarrior', level: 63, grade: 'N' },
	{ displayName: 'MagmaKnight', level: 9, grade: 'U' },
	{ displayName: 'StormWizard', level: 72, grade: 'L' },
	{ displayName: 'MysticKnight', level: 98, grade: 'M' },
	{ displayName: 'DarkLord', level: 49, grade: 'S' },
	{ displayName: 'SkyKnight', level: 87, grade: 'N' },
	{ displayName: 'DuskMage', level: 23, grade: 'L' },
	{ displayName: 'PhantomKnight', level: 75, grade: 'M' },
	{ displayName: 'ShadowKnight', level: 60, grade: 'S' },
	{ displayName: 'SilentMage', level: 29, grade: 'U' },
	{ displayName: 'VoidMage', level: 94, grade: 'L' },
	{ displayName: 'MysticWarrior', level: 33, grade: 'M' },
	{ displayName: 'RuneKnight', level: 71, grade: 'S' },
	{ displayName: 'CosmicWarrior', level: 27, grade: 'U' },
	{ displayName: 'StarMage', level: 55, grade: 'N' },
	{ displayName: 'TwilightWizard', level: 67, grade: 'M' },
	{ displayName: 'StormWarrior', level: 19, grade: 'S' },
	{ displayName: 'SilentKnight', level: 76, grade: 'U' },
	{ displayName: 'LunarMage', level: 44, grade: 'L' },
	{ displayName: 'StarWarrior', level: 68, grade: 'M' },
	{ displayName: 'ThunderKnight', level: 26, grade: 'S' },
	{ displayName: 'PhantomMage', level: 50, grade: 'N' },
	{ displayName: 'IronMage', level: 79, grade: 'L' },
	{ displayName: 'CelestialWarrior', level: 41, grade: 'M' },
	{ displayName: 'VoidWarrior', level: 21, grade: 'S' }
]);
