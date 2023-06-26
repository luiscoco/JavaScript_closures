'use strict';
// undefinedObject.foo();

/*
try...catch construct allows to “catch” errors so the script can, instead of dying, continue to run and do something more reasonable like fixing the error
we can handle the error inside the 'catch' block, using information that is passed as first argument (error object)
*/

{
	try {
		undefinedObject.foo();
		// throw new Error('error happened!');
	} catch (err) {
		console.log(err.name);
		console.log(err.message);
		console.log(err.stack);
	}

	/*
  JS engine reads the code first (parses it) and only then executes.
  Errors that occur during the reading phase, are called parsing errors
  they cannot be processed inside the code because engine simple doesn't understand the code and therefore cannot execute it

  Thus, try ...catch can only process the errors that occur in a valid code.
  Such errors are called execution errors, or 'exceptions'
  */

	// 🕮 <ltc> 05fd2bfd-a6f7-44cf-ba0c-a146bf87000c.md

	/*
  We can use try ... catch, if we suppose, that the code can possibly work incorrectly in some cases
  E.g. we process some external data, for example, obtained from a server
  */

	// if we caught the error, we can continue code execution
	console.log('Continue execution');
}

// # custom errors, re-throwing

{
	// there are some built-in types of errors in JS that will have pre-defined messages, like ReferenceError, SyntaxError etc
	// let error = new ReferenceError(message);

	// custom errors are convenient to use, if we want to handle them somewhere in other place in our code
	// scenario: if we encountered a bug (so, the error is likely to occur here) we add `try... catch` and throw an error that will explicitly tell us, what happened

	try {
		errorProne(Infinity);
	} catch (e) {
		// handle all 'passed through' errors on the top level
		if (
			e.message ===
			'argument is undefined, and I really need it for some reason'
		) {
			console.log(e);
		} else {
			throw e;
		}
	}

	// somewhere higher in the code, when we are using 'errorProne' function:
	function errorProne(arg) {
		// prompt user for data (emulated)
		const receivedData = arg;

		try {
			errorProneValidation(receivedData);
		} catch (e) {
			console.log(e);
			if (e.message === 'argument must be a number') {
				console.log('invalid argument passed');
			} else {
				throw e;
			}
			// if this is some unknown error, that we want to handle higher in the code, we can pass it through (re-throw) to the next level, using 'throw' operator
		}
	}

	function errorProneValidation(arg) {
		// throw new Error('unexpected error'); // will eventually kill the script, bubbling to the top level
		if (!arg)
			throw new Error(
				'argument is undefined, and I really need it for some reason'
			);

		if (!(typeof arg === 'number' && isFinite(arg)))
			throw new Error('argument must be a number');

		console.log(arg);
	}
}

// # `finally` block
// is executed always. Code within 'finally' is guaranteed to run, even if 'return' or 'throw' happened within 'try' block
{
	function example(num) {
		let diff, result;

		function fib(n) {
			if (n < 0 || Math.trunc(n) !== n) {
				throw new Error('Should be a non-negative number');
			}
			return n <= 1 ? n : fib(n - 1) + fib(n - 2);
		}

		let start = Date.now();

		try {
			result = fib(num);
		} catch (e) {
			result = 0;
		} finally {
			// we use `finally` block to calculate the execution time in any case
			diff = Date.now() - start;
		}

		console.log(result ?? 'error happened');
		console.log(`Execution took ${diff}ms`);
	}
	example(10);
}

// 🕮 <ltc> a545d524-2ec3-40b0-b914-4704de30e7df.md
