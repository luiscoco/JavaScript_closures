'use strict';
// # debugger

// 🕮 <ltc> 7a933d6e-fd5b-416e-80b5-26fcd412b3a8.md

// ~ outer closure

globalThis.TEST = 'I am globalThis prop'; // Global => TEST

console.log(TEST);

const globalVar = 'I am global variable'; // Local => globalVar

console.log(globalVar);

{
	// ~ outer block
	console.log('THIS', this);

	const outerBlockVar = 'I am outer block variable';
	const unusedOuterBlockVar = 'I am unused outer block variable';

	function test(a, b, c) {
		// ~ test closure
		// ~ test locals:
		const localVar = 'I am a local variable';
		const sum = a + b + c;
		const result = `local value: ${localVar}. Sum of the arguments: ${sum}`;

		// if variables are not used in the scope, they won't be listed by debugger;
		console.log(globalVar); // taken from outer Closure
		console.log(outerBlockVar); // taken from outer Block
		// unusedOuterBlockVar is not listed in debugger cause it's not used

		console.log(arguments); // arguments are Local
		console.log(this); // undefined

		{
			// ~ inner block (test block)
			const innerBlockVar = 'I am inner block variable';

			const print = () => {
				// ~ print locals:
				console.log(arguments); // 'arguments' is taken from Closure
				console.log(this); // undefined

				console.log(sum);
				console.log(innerBlockVar);
			};

			print(1, 2);
		}

		return result;
	}

	test(1, 2, 3);
	test(4, 5, 6);
	test(7, 8, 9);
}
