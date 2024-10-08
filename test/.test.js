function arraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

export function expect(actual) {
	return {
		toBe(expected) {
			if (actual === expected) {
				return true;
			}
			if (Array.isArray(actual) && Array.isArray(expected)) {
				return arraysEqual(actual, expected);
			}

			console.error(`Expected ${actual} to be ${expected}`);
			return false;
		},
		not: {
			toBe(expected) {
				if (actual !== expected) {
					return true;
				} else {
					console.error(`Expected ${actual} not to be ${expected}`);
					return false;
				}
			},
		},
	};
}

export function it(description, testFunction) {
	const isAsync = testFunction.constructor.name === 'AsyncFunction';

	const runTest = async () => {
		try {
			const result = isAsync
				? await testFunction({ expect })
				: testFunction({ expect });
			return {
				description,
				result,
				skip: false,
				todo: false,
				only: false,
			};
		} catch (error) {
			console.error(`Test failed: ${description}`, error);
			return {
				description,
				result: false,
				skip: false,
				todo: false,
				only: false,
			};
		}
	};

	return isAsync ? runTest() : runTest();
}

it.todo = function (description) {
	return {
		description,
		result: false,
		todo: true,
		skip: false,
		only: false,
	};
};

it.skip = function (description, testFunction) {
	return {
		description,
		result: undefined,
		skip: true,
		todo: false,
		only: false,
	};
};

it.only = function (description, testFunction) {
	const isAsync = testFunction.constructor.name === 'AsyncFunction';

	const runTest = async () => {
		try {
			const result = isAsync
				? await testFunction({ expect })
				: testFunction({ expect });
			return {
				description,
				result,
				skip: false,
				todo: false,
				only: true,
			};
		} catch (error) {
			console.error(`Test failed: ${description}`, error);
			return {
				description,
				result: false,
				skip: false,
				todo: false,
				only: true,
			};
		}
	};

	return isAsync ? runTest() : runTest();
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
		if (test instanceof Promise) {
			testResults.push(test);
		} else {
			if (test.only) {
				onlyTests.push(test);
			} else {
				testResults.push(test);
			}
		}
	};

	boundIt.todo = function (description) {
		testResults.push(it.todo(description));
	};
	boundIt.skip = function (description, testFunction) {
		testResults.push(it.skip(description, testFunction));
	};
	boundIt.only = function (description, testFunction) {
		const test = it.only(description, testFunction);
		if (test instanceof Promise) {
			onlyTests.push(test);
		} else {
			onlyTests.push(it.only(description, testFunction));
		}
	};
	boundIt.xit = function (description, testFunction) {
		testResults.push(it.skip(description, testFunction));
	};

	suiteFunction(boundIt, {
		xit: boundIt.skip,
	});

	const finalTestResults = onlyTests.length > 0 ? onlyTests : testResults;

	Promise.all(finalTestResults).then((resolvedTestResults) => {
		const resultsDiv = document.getElementById(`results-${suiteName}`);

		resolvedTestResults.forEach((test) => {
			const testCase = document.createElement('div');
			if (test.todo) {
				testCase.classList.add('test-case', 'todo');
				testCase.innerHTML = `<strong>TODO: ${test.description}</strong>`;
			} else if (test.skip) {
				testCase.classList.add('test-case', 'skip');
				testCase.innerHTML = `<strong>SKIP: ${test.description}</strong>`;
			} else {
				testCase.classList.add(
					'test-case',
					test.result ? 'pass' : 'fail'
				);
				testCase.innerHTML = `<strong>${test.description}</strong>`;
			}
			resultsDiv.appendChild(testCase);
		});
	});
}

export function setAutoRefresh(timeMs) {
	setTimeout(() => {
		window.location.reload();
	}, timeMs);
}
