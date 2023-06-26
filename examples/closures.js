// 🕮 <cyberbiont> eb158ce7-068a-4d71-891c-2753c7a556a8.md
'use strict';

// # visibility scope:
{
	let name = 'John';

	function sayHi() {
		const greeting = 'Hello';
		console.log(`${greeting},  ${name}!`);
	}

	name = 'Alex';
	const greeting = 'Hi';

	sayHi();
}

/*
Each pair of curly brackets, e.g. function body or code block, creates a separate visibility scope
Variables in this scope are not accessible from ouside
But we can access external variables from inside the scope
*/

// 🕮 <ltc> f280118f-6858-48be-8a23-ba7845dbd660.md
// ~ Example 1 - nested function return
{
	function makeFn() {
		const x = 2;

		return function closureFn() {
			// const x = 'foo';
			console.log(x);
			return x;
		};
	}

	const closureFn = makeFn();
	//  no matter how we call our function and where we call it from, value of variable from closure remains the same
	closureFn();
	[null].forEach(closureFn);
	setTimeout(closureFn, 1000);
}

// ~ Example 2 - method of object, created with constructor call
{
	function User(name) {
		this.name = name;

		this.sayHi = function () {
			console.log(this.name);
			console.log(name);
		};
	}

	const harry = new User('Harry');
	const ron = new User('Ron');

	harry.sayHi();

	// function, taken from other object, will receive new 'this', but variable from closure (name parameter in this case) will still have the same value
	ron.sayHi = harry.sayHi;
	ron.sayHi();
}

/*
Each function has special LexicalEnvironment object, that function references with [[Environment]] property
All variables, declared within curly brackets, and also arguments, that function receives, are stored in Environment Record object
*/
{
	function makeCounter() {
		// makeCounter[[Environment]] - references global Lexical Environment
		let count = 0;

		return function counter() {
			// counter[[Environment]] - references makeCounter Lexical Environment
			return count++; // has access to 'count' variable
		};
	}
	// we cannot access count from outside
	// we can change it only by calling counter and counter2 functions, both have access to count through closure

	const counter = makeCounter();

	console.log(counter());
	console.log(counter());
	console.log(counter());

	const counter2 = makeCounter();
	console.log(counter2());
}

// 🕮 <ltc> ca3aaa34-6e75-4af1-8655-bbb964f399f7.md

/*
Execution context
	- Line where excution stopped
  - current 'this' // undefined
	- Lexical Environment
		- Environment Record - local variables and arguments inisde this block of code as properties
		- [[Environment]] -> Lexical Environment
*/
