import { getCollection } from '../../user/getCollection.js';
import { getOpponentTeamCache } from '/utils/cache.js';
import { generateTableHTML } from '/utils/utils.js';

const pageTitle = 'DEFENSE TEAM';
const pageDone = ({ params }) => {
	document.title = `TD: ${pageTitle}`;
	window.parent.postMessage({
		_: 'stats',
		feathers: false,
		gems: false,
		coins: false,
		friendPoints: false,
	});
	window.parent.postMessage({
		_: 'title',
		title: '&nbsp;',
		visibility: 'visible',
		back: params.back,
	});
	window.parent.postMessage({ _: 'loaded' });
};

const attachBasicTable = ({ defense, opponent }) => {
	console.log({ opponent });
	document.body.innerHTML = `
		<div class="flex-col" style="gap:10px;min-width: 600px;">
			<div>${opponent.name}</div>
			Team A:
			<div>
				${defense?.a ? generateTableHTML(defense.a) : 'no team'}
			</div>
			Team B:
			<div>
				${defense?.b ? generateTableHTML(defense.b) : 'no team'}
			</div>
		</div>
	`;
};

const updateTeam = ({ teamSlots, team, characters }) => {
	// console.log({ characters });
	for (const [index, slot] of Object.entries(teamSlots)) {
		const unit = team[index];
		const unitCharacter = characters.find((x) => x.code == unit.code);
		const { gear = {} } = unit || {};
		let gearHTML = {
			weapon: gear?.weapon?.image
				? `<img src="${gear.weapon.image}">` //
				: '',
			armor: gear?.armor?.image
				? `<img src="${gear.armor.image}">` //
				: '',
			accessory: gear.accessory
				? `<img src="${gear.accessory.image}">` //
				: '',
		};

		slot.innerHTML = `
			<div class="unitImage">
				${unitCharacter?.image ? `<img src="${unitCharacter?.image}">` : ''}
			</div>
			<div class="platform"></div>
			<div class="gear">
				<div class="gearSlot weapon">
					${gearHTML.weapon}
				</div>
				<div class="gearSlot armor">
					${gearHTML.armor}
				</div>
				<div class="gearSlot accessory">
					${gearHTML.accessory}
				</div>
			</div>
		`;
	}
};

const attachTeam = ({ params, characters, defense, opponent }) => {
	const teamSlots = Array.from(document.querySelectorAll('.slot.team'));
	let selectedTeam = 'a';
	if (!defense?.a) return;

	const switchTeam = () => {
		selectedTeam = selectedTeam === 'a' ? 'b' : 'a';
		updateTeam({ teamSlots, team: defense[selectedTeam], characters });
	};

	const teamSwitch = document.querySelector('.team-switch');
	teamSwitch.addEventListener('pointerup', () => {
		const children = Array.from(teamSwitch.children);
		for (const child of children) {
			child.classList.toggle('selected');
		}
		switchTeam && switchTeam();
	});

	updateTeam({ teamSlots, team: defense[selectedTeam], characters });
};

const attachUserInfo = ({ player }) => {
	console.log({ player });
	const playerName = document.querySelector('.playerName');
	playerName.innerHTML = player.name;
};

const setup = async () => {
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search)
	);
	console.log({ params });

	let characters = await getCollection();
	const { defense, ...opponent } = await getOpponentTeamCache();
	//TODO: if opponent is not set, must be "ME"

	//attachBasicTable({ defense, opponent });

	attachUserInfo({ player: opponent });
	attachTeam({ params, characters, defense, opponent });

	pageDone({ params });
};

document.addEventListener('DOMContentLoaded', setup);
