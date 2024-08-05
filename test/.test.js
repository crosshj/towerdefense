export function expect(actual) {
	return {
		toBe(expected) {
			return actual === expected;
		},
		not: {
			toBe(expected) {
				return actual !== expected;
			}
		}
	};
}

export function it(description, testFunction) {
	const result = testFunction ? testFunction({ expect }) : undefined;
	return {
		description,
		result,
		skip: false,
		todo: false,
		only: false
	};
}

it.todo = function (description) {
	return {
		description,
		result: false,
		todo: true,
		skip: false,
		only: false
	};
};

it.skip = function (description, testFunction) {
	return {
		description,
		result: undefined,
		skip: true,
		todo: false,
		only: false
	};
};

it.only = function (description, testFunction) {
	return {
		description,
		testFunction,
		only: true,
		skip: false,
		todo: false
	};
};

export const xit = it.skip;

export function describe(suiteName, suiteFunction) {
	const suiteHeader = document.createElement('h3');
	suiteHeader.textContent = suiteName;
	document.body.appendChild(suiteHeader);

	const suiteResults = document.createElement('div');
	suiteResults.id = `results-${suiteName}`;
	document.body.appendChild(suiteResults);

	const testResults = [];
	const onlyTests = [];

	const boundIt = (description, testFunction) => {
		const test = it(description, testFunction);
		if (test.only) {
			onlyTests.push(test);
		} else {
			testResults.push(test);
		}
	};

	// Bind properties to boundIt
	boundIt.todo = function (description) {
		testResults.push(it.todo(description));
	};
	boundIt.skip = function (description, testFunction) {
		testResults.push(it.skip(description, testFunction));
	};
	boundIt.only = function (description, testFunction) {
		onlyTests.push(it.only(description, testFunction));
	};
	boundIt.xit = function (description, testFunction) {
		testResults.push(it.skip(description, testFunction));
	};

	suiteFunction(boundIt);

	// Handle only tests
	const finalTestResults = onlyTests.length > 0 ? onlyTests : testResults;

	const resultsDiv = document.getElementById(`results-${suiteName}`);

	finalTestResults.forEach((test) => {
		const testCase = document.createElement('div');
		if (test.todo) {
			testCase.classList.add('test-case', 'todo');
			testCase.innerHTML = `<strong>TODO: ${test.description}</strong>`;
		} else if (test.skip) {
			testCase.classList.add('test-case', 'skip');
			testCase.innerHTML = `<strong>SKIP: ${test.description}</strong>`;
		} else {
			testCase.classList.add('test-case', test.result ? 'pass' : 'fail');
			testCase.innerHTML = `<strong>${test.description}</strong>`;
		}
		resultsDiv.appendChild(testCase);
	});
}

export function setAutoRefresh(timeMs) {
	setTimeout(() => {
		window.location.reload();
	}, timeMs);
}
