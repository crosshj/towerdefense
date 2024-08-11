/*
these should be cached by service worker

https://stackoverflow.com/questions/55729870/how-do-i-filter-out-gear-icon-xhr-requests-in-devtools
is:service-worker-initiated
is:service-worker-intercepted
-is:service-worker-initiated
-is:service-worker-intercepted (don't show files cached by SW)
*/

const assets = [
	// audio
	'/assets/audio/AsianScene.wav',
	'/assets/audio/coreSounds.wav',
	'/assets/audio/EtherealTraverse.wav',
	'/assets/audio/explosion1.wav',
	'/assets/audio/march.wav',
	'/assets/audio/slowedSurf.wav',
	'/assets/audio/SunnyField.wav',
	'/assets/audio/TropicalShadows.wav',

	// user
	'/user/characters.js',
	'/user/effects.js',
	'/user/getCollection.js',
	'/user/getFriends.js',
	'/user/settings.js',
	'/user/stats.js',
	'/user/teams.js',
	'/user/tower.js',
	'/user/user.js',

	//utils
	'/utils/compress.js',
	'/utils/utils.js',
	'/utils/experience.js',
	'/utils/debounce.js',
	'/utils/scrollable.js',
	'/utils/session.js',

	// $data
	'$data/unitsAll.js',
	'$data/drops.js',

	// visuals
	'/visuals/assets/assets.js',
	'/visuals/components.css',
	'/visuals/assets/character.js',
	'/visuals/stats/components.js',
	'/visuals/stats/stats.css',
	'/visuals/stats/stats.js',
	'/visuals/canvas.css',
	'/visuals/canvas.js',

	// backgrounds
	'/assets/background/forest1.png',
	'/assets/background/highlands1.png',
	'/assets/background/forest1.png',
	'/assets/background/oasis1.png',
	'/assets/background/industrial1.png',
	'/assets/background/tundra1.png',
	'/assets/bg-ghost1.png',

	//pages
	'/pages/_utils/getCharacter.js',
	'/pages/_utils/getTeam.js',
	'/pages/collect/bg.png',
	'/pages/friends/bg.png',
	'/pages/game/results/bg.png',
	'/pages/game/selectHelp/bg.png',
	'/pages/game/selectTeam/bg.png',
	'/pages/home/background.png',
	'/pages/home/background_clicks.png',
	'/pages/lab/background.png',

	'/pages/mainStage/index.html',
	'/pages/mainStage/index.js',
	'/pages/mainStage/background.png',
	'/pages/mainStage/background_clicks.png',

	'/pages/my-team/bg.png',
	'/pages/pass/bg.png',
	'/pages/pvp/bg.png',
	'/pages/shop/bg.png',
	'/pages/specialStage/background.png',
	'/pages/startup/bg.png',
	'/pages/upgrade/bg.png',

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

	// characters
	'/characters/index.js',
	'/characters/units/calculateStats.js',
	'/characters/units/units.js',

	'/assets/character/FighterBase/FighterBase_ske.json',
	'/assets/character/FighterBase/FighterBase_tex.json',
	'/assets/character/FighterBase/FighterBase_tex.png',
	'/assets/character/FighterBase/Elements/Poison_tex.png',
	'/assets/teamDragImage.png',

	'/assets/character/FighterBase/skins/1-benny_tex.png',
	'/assets/character/FighterBase/skins/1-macho_tex.png',
	'/assets/character/FighterBase/skins/1-pete_tex.png',
	'/assets/character/FighterBase/skins/1-skye_tex.png',
	'/assets/character/FighterBase/skins/1-zoe_tex.png',

	'/assets/character/FighterBase/skins/2-coco_tex.png',
	'/assets/character/FighterBase/skins/2-foxie_tex.png',
	'/assets/character/FighterBase/skins/2-jet_tex.png',
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
	'/assets/character/FighterBase/skins/5-wap_tex.png'
];

const vendor = [
	'/assets/teeGames.png',
	'/vendor/DragonBones/dragonBones.js',
	'/vendor/DragonBones/POJFactory.js',
	'/vendor/DragonBones/Animateable.js',
	'/vendor/gif-js/gif.js',
	'/vendor/gif-js/gif.worker.js',
	'/vendor/DragDropTouch.js'
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
	//mathjs
	'https://cdn.jsdelivr.net/npm/mathjs@13.0.3/+esm',
	'https://cdn.jsdelivr.net/npm/@babel/runtime@7.24.8/helpers/extends/+esm',
	'https://cdn.jsdelivr.net/npm/typed-function@4.2.1/+esm',
	'https://cdn.jsdelivr.net/npm/tiny-emitter@2.1.0/+esm',
	'https://cdn.jsdelivr.net/npm/complex.js@2.1.1/+esm',
	'https://cdn.jsdelivr.net/npm/fraction.js@4.3.7/+esm',
	'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/+esm',
	'https://cdn.jsdelivr.net/npm/@babel/runtime@7.24.8/helpers/defineProperty/+esm',
	'https://cdn.jsdelivr.net/npm/javascript-natural-sort@0.7.1/+esm',
	'https://cdn.jsdelivr.net/npm/escape-latex@1.2.0/+esm',
	'https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm',
	//rxjs
	'https://cdn.skypack.dev/rxjs',
	'https://cdn.skypack.dev/rxjs/operators',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/operators.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/Observable-d1433fce.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/zipWith-4249f287.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/VirtualTimeScheduler-a9ac54a9.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/Subject-d51513a8.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/BehaviorSubject.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/ReplaySubject.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/AsyncSubject.js',
	'https://cdn.skypack.dev/-/tslib@v2.5.0-Q2Yl7gdP11l6eAyFnQRG/dist=es2019,mode=imports/optimized/tslib.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/AsyncScheduler-f316237e.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/Scheduler.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/Subscription-226cce4f.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/Subscriber-8a6181d2.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/Notification-c06ad47e.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/lastValueFrom.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/firstValueFrom.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/EmptyError-3e4d38d5.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/innerFrom-90c56926.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/OperatorSubscriber-577d6556.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/config.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/map-0874aedc.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/lift-2ef3bc25.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/createErrorClass-8a0126da.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/common/dateTimestampProvider-e3eee0f2.js',
	'https://cdn.skypack.dev/-/rxjs@v7.8.1-gMYNr0D48Ik3Uz0dDbiK/dist=es2019,mode=imports/optimized/rxjs/internal/NotificationFactories.js',
	'https://cdn.skypack.dev/-/tslib@v2.5.0-Q2Yl7gdP11l6eAyFnQRG/dist=es2019,mode=imports/optimized/common/tslib-93083d2c.js',
	//gifjs
	'https://cdn.skypack.dev/gif.js',
	'https://cdn.skypack.dev/-/gif.js@v0.2.0-e7wk4xRP763nJNI3SHHF/dist=es2019,mode=imports/optimized/gifjs.js'
];

export const depends = [
	...assets,
	...vendor,
	...external
	//
];

//console.log(depends.length);
