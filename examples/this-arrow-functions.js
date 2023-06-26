'use strict';

/*
arrow function doesn't have its own 'this' value
AT THE MOMENT OF CREATION it borrows 'this' from parent function (inside which arrow function was created)
and does it permanently, that means that 'this' inside arrow function will always be the same no matter how we call it
*/

const isAdult = (age) => {
	console.log(this); // `this` will always be equal to globalThis
};

const person = {
	age: 18,
	getAgeNormal: function () {
		console.log(this);
	},
	getAge: () => {
		console.log(this);
		/*
    arrow function: in this case `globalThis` is also a parental function, so `this` will reference `globalThis`
    */
	},
	showAge() {
		console.log(this); // `this` equals person

		setTimeout(() => {
			console.log(this);
		}, 500);
		/*
		anonymous arrow function inside `setTimeout` was created inside `showAge` method
    so it borrows `this` from `showAge`, that references `person` object
    */
	},
	scores: {
		biology: 13,
		mathematic: 8,
		history: 9,

		calcAverageScore() {
			const calcSum = () => {
				console.log(this);
			};
			/* arrow function `calcSum` was created inside `calcAverageScore` -
        so it borrows its `this`. Which references 'scores' object */
			calcSum();
		},
	},
};

isAdult();

person.getAgeNormal();
person.getAge();
person.showAge();
person.scores.calcAverageScore();
