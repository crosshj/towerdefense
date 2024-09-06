/*
these should be cached by service worker

https://stackoverflow.com/questions/55729870/how-do-i-filter-out-gear-icon-xhr-requests-in-devtools
is:service-worker-initiated
is:service-worker-intercepted
-is:service-worker-initiated
-is:service-worker-intercepted (don't show files cached by SW)

*/

const assets = [
	'/index.html',
	'/index.js',
	'/index.css',

	// $data
	'/$data/unitsAll.js',
	'/$data/defaultCharacters.js',
	'/$data/drops.js',
	'/$data/enemies.js',

	//modals
	'/modals/banner/index.html',
	'/modals/banner/index.css',
	'/modals/banner/index.js',
	'/modals/buff/index.html',
	'/modals/buff/index.css',
	'/modals/buff/index.js',
	'/modals/character/detail.html',
	'/modals/character/detail.css',
	'/modals/character/detail.js',
	'/modals/character/detailDom.js',
	'/modals/event/index.html',
	'/modals/event/index.css',
	'/modals/event/index.js',
	'/modals/exp/index.html',
	'/modals/exp/index.css',
	'/modals/exp/index.js',
	'/modals/gameOver/index.html',
	'/modals/gameOver/index.css',
	'/modals/gameOver/index.js',
	'/modals/giftbox/index.html',
	'/modals/giftbox/index.css',
	'/modals/giftbox/index.js',
	'/modals/menu/index.html',
	'/modals/menu/index.css',
	'/modals/menu/index.js',
	'/modals/quest/index.html',
	'/modals/quest/index.css',
	'/modals/quest/index.js',
	'/modals/settings/index.html',
	'/modals/settings/index.css',
	'/modals/settings/index.js',
	'/modals/settings/version.js',
	'/modals/user/index.html',
	'/modals/user/index.css',
	'/modals/user/index.js',

	//pages
	'/pages/collect/bg.png',
	'/pages/friends/bg.png',

	'/pages/game/engine/ai/enemyOne.js',
	'/pages/game/engine/update/game.js',
	'/pages/game/engine/update/missile.js',
	'/pages/game/engine/update/player.js',
	'/pages/game/engine/update/team.js',
	'/pages/game/engine/actions.js',
	'/pages/game/engine/controls.css',
	'/pages/game/engine/controls.js',
	'/pages/game/engine/engine.js',
	'/pages/game/engine/init.js',
	'/pages/game/engine/menuPause.js',
	'/pages/game/engine/mineral.js',
	'/pages/game/engine/render.js',
	'/pages/game/engine/state.js',
	'/pages/game/results/gameResultsBg.svg',
	'/pages/game/selectHelp/bg.png',
	'/pages/game/selectTeam/bg.png',

	'/assets/home/background.png',
	'/assets/home/background_clicks.png',
	// '/pages/lab/background.png',
	'/pages/my-team/bg.png',
	'/pages/pass/bg.png',
	'/pages/pvp/bg.png',
	'/pages/shop/bg.png',
	'/pages/specialStage/background.png',
	'/pages/startup/bg.png',
	'/pages/upgrade/bg.png',

	'/pages/home/index.html',
	'/pages/home/index.css',
	'/pages/home/index.js',

	'/pages/mainStage/index.html',
	'/pages/mainStage/index.js',
	'/pages/mainStage/background.png',
	'/pages/mainStage/background_clicks.png',

	'/pages/my-team/index.html',
	'/pages/my-team/index.css',
	'/pages/my-team/index.js',
	'/pages/my-team/allChars.css',
	'/pages/my-team/allChars.js',
	'/pages/my-team/components.js',
	'/pages/my-team/handlePointerEvents.js',

	'/pages/pvp/',
	'/pages/pvp/index.html',
	'/pages/pvp/index.css',
	'/pages/pvp/index.js',

	'/pages/tower/',
	'/pages/tower/index.css',
	'/pages/tower/index.html',
	'/pages/tower/index.js',
	'/pages/tower/towerBackground.png',

	'/pages/unit/levelUp/',
	'/pages/unit/levelUp/index.html',
	'/pages/unit/levelUp/index.css',
	'/pages/unit/levelUp/index.js',

	// user
	'/user/characters.js',
	'/user/effects.js',
	'/user/getCollection.js',
	'/user/getFriends.js',
	'/user/pvp.js',
	'/user/settings.js',
	'/user/stats.js',
	'/user/teams.js',
	'/user/tower.js',
	'/user/user.js',

	//utils
	'/utils/cache.js',
	'/utils/calculateStats.js',
	'/utils/compress.js',
	'/utils/debounce.js',
	'/utils/disableSwipe.js',
	'/utils/experience.js',
	'/utils/flipCanvasHorizontal.js',
	'/utils/getCharacter.js',
	'/utils/getTeam.js',
	'/utils/getViewportDimensions.js',
	'/utils/htmlToElement.js',
	'/utils/installable.js',
	'/utils/locations.js',
	'/utils/scrollable.js',
	'/utils/session.js',
	'/utils/teams.js',
	'/utils/units.js',
	'/utils/utils.js',

	// visuals
	'/visuals/assets/assets.js',
	'/visuals/components.css',
	'/visuals/assets/character.js',
	'/visuals/stats/components.js',
	'/visuals/stats/stats.css',
	'/visuals/stats/stats.js',
	'/visuals/canvas.css',
	'/visuals/canvas.js',
	'/visuals/components/custom-select.js',
	'/visuals/fading.css',

	// assets
	'/assets/favicon.png',
	'/assets/icons.svg.js',

	// audio
	'/assets/audio/AsianScene.wav',
	'/assets/audio/coreSounds.wav',
	'/assets/audio/EtherealTraverse.wav',
	'/assets/audio/explosion1.wav',
	'/assets/audio/march.wav',
	'/assets/audio/slowedSurf.wav',
	'/assets/audio/SunnyField.wav',
	'/assets/audio/TropicalShadows.wav',

	// backgrounds
	'/assets/background/forest1.png',
	'/assets/background/highlands1.png',
	'/assets/background/forest1.png',
	'/assets/background/oasis1.png',
	'/assets/background/industrial1.png',
	'/assets/background/tundra1.png',
	'/assets/bg-ghost1.png',

	// characters
	'/assets/character/FighterBase/FighterBase_ske.json',
	'/assets/character/FighterBase/FighterBase_tex.json',
	'/assets/character/FighterBase/FighterBase_tex.png',
	'/assets/character/FighterBase/Elements/Poison_tex.png',
	'/assets/teamDragImage.png',

	'/assets/character/FighterBase/skins/0-guide_tex.png',

	'/assets/character/FighterBase/skins/1-benny_tex.png',
	'/assets/character/FighterBase/skins/1-macho_tex.png',
	'/assets/character/FighterBase/skins/1-pete_tex.png',
	'/assets/character/FighterBase/skins/1-skye_tex.png',
	'/assets/character/FighterBase/skins/1-zoe_tex.png',

	'/assets/character/FighterBase/skins/2-coco_tex.png',
	'/assets/character/FighterBase/skins/2-foxie_tex.png',
	'/assets/character/FighterBase/skins/2-jet_tex.png',
	'/assets/character/FighterBase/skins/2-momoka_tex.png',
	'/assets/character/FighterBase/skins/2-ogre_tex.png',
	'/assets/character/FighterBase/skins/2-pande_tex.png',
	'/assets/character/FighterBase/skins/2-tom_tex.png',
	'/assets/character/FighterBase/skins/2-toto_tex.png',
	'/assets/character/FighterBase/skins/2-zerosix_tex.png',

	'/assets/character/FighterBase/skins/3-arcus_tex.png',
	'/assets/character/FighterBase/skins/3-corpus_tex.png',
	'/assets/character/FighterBase/skins/3-poki_tex.png',
	'/assets/character/FighterBase/skins/3-pismud_tex.png',
	'/assets/character/FighterBase/skins/3-rose_tex.png',
	'/assets/character/FighterBase/skins/3-timmy_tex.png',
	'/assets/character/FighterBase/skins/3-twinkle_tex.png',
	'/assets/character/FighterBase/skins/3-zar_tex.png',

	'/assets/character/FighterBase/skins/4-antonio_tex.png',
	'/assets/character/FighterBase/skins/4-aynstine_tex.png',
	'/assets/character/FighterBase/skins/4-boar_tex.png',
	'/assets/character/FighterBase/skins/4-bumpier_tex.png',
	'/assets/character/FighterBase/skins/4-crimson_tex.png',
	'/assets/character/FighterBase/skins/4-liz_tex.png',
	'/assets/character/FighterBase/skins/4-openhyman_tex.png',
	'/assets/character/FighterBase/skins/4-pineman_tex.png',
	'/assets/character/FighterBase/skins/4-ruby_tex.png',
	'/assets/character/FighterBase/skins/4-slabb_tex.png',
	'/assets/character/FighterBase/skins/4-tabi_tex.png',
	'/assets/character/FighterBase/skins/4-violet_tex.png',
	'/assets/character/FighterBase/skins/4-vispi_tex.png',

	'/assets/character/FighterBase/skins/5-barbell_tex.png',
	'/assets/character/FighterBase/skins/5-bibly_tex.png',
	'/assets/character/FighterBase/skins/5-blanko_tex.png',
	'/assets/character/FighterBase/skins/5-crack9_tex.png',
	'/assets/character/FighterBase/skins/5-drat_tex.png',
	'/assets/character/FighterBase/skins/5-electopus_tex.png',
	'/assets/character/FighterBase/skins/5-kelvin_tex.png',
	'/assets/character/FighterBase/skins/5-liz_tex.png',
	'/assets/character/FighterBase/skins/5-multo_tex.png',
	'/assets/character/FighterBase/skins/5-popo_tex.png',
	'/assets/character/FighterBase/skins/5-prickles_tex.png',
	'/assets/character/FighterBase/skins/5-robia_tex.png',
	'/assets/character/FighterBase/skins/5-santelmo_tex.png',
	'/assets/character/FighterBase/skins/5-wap_tex.png',
];

const vendor = [
	'/assets/teeGames.png',
	'/vendor/DragonBones/dragonBones.js',
	'/vendor/DragonBones/POJFactory.js',
	'/vendor/DragonBones/Animateable.js',
	'/vendor/gif-js/gif.js',
	'/vendor/gif-js/gif.worker.js',
	'/vendor/DragDropTouch.js',
	'/vendor/rxjs.bundle.7.8.1.js',
	'/vendor/gif-js/gif.js',
	'/vendor/gif-js/gif.worker.js',
	'/vendor/gif-js/gifjs.0.2.0.js',
];

const external = [
	//fonts/css
	'https://unpkg.com/nes.css@2.3.0/css/nes.min.css',
	'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap',
	'https://fonts.gstatic.com/s/passionone/v18/PbynFmL8HhTPqbjUzux3JEuR9lvC6poU.woff2',
	'https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap',
	'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap',
	//misc
	'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm',
];

export const nonLocal = [
	...vendor,
	...external,
	//
];

export const depends = [
	...assets,
	...vendor,
	...external,
	//
];

//console.log(depends.length);
