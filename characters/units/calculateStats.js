import * as mathjs from 'https://cdn.jsdelivr.net/npm/mathjs@13.0.3/+esm';

const rankToLevels = {
	1: [1, 20, 40],
	2: [1, 30, 50],
	3: [1, 40, 60],
	4: [1, 50, 70],
	5: [1, 60, 80],
	6: [],
	7: [],
	8: [],
	9: []
};

const valuesFormat = (v) => {
	if (Array.isArray(v)) return v;
	return v.split('-').map((x) => Number(x.replaceAll(/,/g, '')));
};

// Function to perform matrix multiplication
function multiplyMatrices(A, B) {
	const result = [];
	for (let i = 0; i < A.length; i++) {
		result[i] = 0;
		for (let j = 0; j < B.length; j++) {
			result[i] += A[i][j] * B[j];
		}
	}
	return result;
}

// Function to calculate the inverse of a 3x3 matrix
function inverseMatrix3x3(matrix) {
	const m = matrix;
	const det =
		m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
		m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
		m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

	if (det === 0) {
		throw new Error('Matrix is singular and cannot be inverted.');
	}

	const invDet = 1 / det;

	const inv = [
		[
			(m[1][1] * m[2][2] - m[1][2] * m[2][1]) * invDet,
			(m[0][2] * m[2][1] - m[0][1] * m[2][2]) * invDet,
			(m[0][1] * m[1][2] - m[0][2] * m[1][1]) * invDet
		],
		[
			(m[1][2] * m[2][0] - m[1][0] * m[2][2]) * invDet,
			(m[0][0] * m[2][2] - m[0][2] * m[2][0]) * invDet,
			(m[0][2] * m[1][0] - m[0][0] * m[1][2]) * invDet
		],
		[
			(m[1][0] * m[2][1] - m[1][1] * m[2][0]) * invDet,
			(m[0][1] * m[2][0] - m[0][0] * m[2][1]) * invDet,
			(m[0][0] * m[1][1] - m[0][1] * m[1][0]) * invDet
		]
	];

	return inv;
}

export function calculateCoefficients(rank, values) {
	// Extract levels and values
	const [x1, x2, x3] = rankToLevels[rank];
	const [y1, y2, y3] = valuesFormat(values);
	const base = y1;

	const B = [y1 - base, y2 - base, y3 - base];

	const A = [
		[x1, x1 * x1],
		[x2, x2 * x2],
		[x3, x3 * x3]
	];

	// Convert A and B to mathjs.js matrices
	const A_matrix = mathjs.matrix(A);
	const B_matrix = mathjs.matrix(B);

	const A_pinv = mathjs.pinv(A_matrix);

	// Multiply the pseudo-inverse of A by B to get the coefficients [b, c]
	const coefficients = mathjs.multiply(A_pinv, B_matrix);

	return {
		base: base,
		linear: coefficients.get([0]),
		quadratic: coefficients.get([1])
	};

	// const A_inv = inverseMatrix3x3(A);

	// // Multiply the inverse of A by B to get the coefficients
	// const coefficients = multiplyMatrices(A_inv, B);

	// return {
	// 	base,
	// 	linear: coefficients[1],
	// 	quadratic: coefficients[2]
	// };
}

// export function calculateCoefficients(rank, values) {
// 	// Extract levels and values
// 	const [x1, x2, x3] = rankToLevels[rank];
// 	const [y1, y2, y3] = valuesFormat(values);

// 	// Create the matrices
// 	const A = [
// 		[1, x1, x1 * x1],
// 		[1, x2, x2 * x2],
// 		[1, x3, x3 * x3]
// 	];

// 	const B = [y1, y2, y3];

// 	// Function to perform matrix multiplication
// 	function multiplyMatrices(A, B) {
// 		const result = [];
// 		for (let i = 0; i < A.length; i++) {
// 			result[i] = 0;
// 			for (let j = 0; j < B.length; j++) {
// 				result[i] += A[i][j] * B[j];
// 			}
// 		}
// 		return result;
// 	}

// 	// Function to calculate the inverse of a 3x3 matrix
// 	function inverseMatrix(matrix) {
// 		const [[a, b, c], [d, e, f], [g, h, i]] = matrix;

// 		const A = e * i - f * h;
// 		const B = c * h - b * i;
// 		const C = b * f - c * e;
// 		const D = f * g - d * i;
// 		const E = a * i - c * g;
// 		const F = c * d - a * f;
// 		const G = d * h - e * g;
// 		const H = b * g - a * h;
// 		const I = a * e - b * d;

// 		const det = a * A + b * D + c * G;

// 		if (det === 0) {
// 			throw new Error('Matrix is singular and cannot be inverted.');
// 		}

// 		const invDet = 1 / det;

// 		return [
// 			[A * invDet, B * invDet, C * invDet],
// 			[D * invDet, E * invDet, F * invDet],
// 			[G * invDet, H * invDet, I * invDet]
// 		];
// 	}

// 	// Calculate the inverse of matrix A
// 	const A_inv = inverseMatrix(A);

// 	// Multiply the inverse of A by B to get the coefficients
// 	const coefficients = multiplyMatrices(A_inv, B);

// 	console.log({ rank, coefficients });
// 	return {
// 		linear: coefficients[1],
// 		quadratic: coefficients[2]
// 	};
// }
