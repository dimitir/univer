//add event construct for modern browsers or IE
//which fires the callback with a pre-converted target reference
function addEvent(node, type, callback) {
	if (node.addEventListener) {
		node.addEventListener(type, function (e) { callback(e, e.target); }, false);
	} else if (node.attachEvent) {
		node.attachEvent("on" + type, function (e) {
			callback(e, e.srcElement);
		});
	}
}

//identify whether a field should be validated
//ie. true if the field is neither readonly nor disabled,
//and has either "pattern", "required" or "aria-invalid"
function shouldBeValidated(field) {
	return (
		!(field.getAttribute("readonly") || field.readonly) &&
		!(field.getAttribute("disabled") || field.disabled) &&
		(field.getAttribute("pattern") || field.getAttribute("required"))
	);
}


function getSumImputsValue(objName) {
	let SumTrueImputsValue = 0;
	for (let key in objName) {
		SumTrueImputsValue += objName[key];
	}
	return SumTrueImputsValue;
}


function doProgresBarDrow(valueSum, pageNumber) {
	let totalObjectItem = Object.keys(fieldsImputState[pageNumber]).length;
	let process = totalObjectItem - valueSum;
	let showPercent = 100 - process / totalObjectItem * 100;

	if (pageNumber == page1) {
		let s = document.querySelectorAll("#stepsVerification__oneStepMove");
		for (let o = s.length; o--;) {
			s[o].style.width = showPercent + "%";
		}

		if (valueSum > 0) {
			showPercent = Math.trunc(showPercent);
			showPercent = "<div>" + showPercent + "%" + "</div>";
			let moveBlock = document.getElementById('stepsVerification__oneStepMove');
			moveBlock.innerHTML = showPercent;
		}


		if (valueSum === 2) {
			document.getElementById('stepsVerification__buttonGo').disabled = false;
		}


		if (valueSum === 3) {
			document.getElementById('stepsVerification__textAboveBarOneStep').textContent = "Всі поля заповнені!";
			document.getElementById('stepsVerification__textAboveBarOneStep').style.color = "#71D958";
		}
	}

	if (pageNumber == page2) {
		let s = document.querySelectorAll("#stepsVerification__twoStepMove");
		for (let o = s.length; o--;) {
			s[o].style.width = showPercent + "%";
		}

		if (valueSum > 0) {
			showPercent = Math.trunc(showPercent);
			showPercent = "<div>" + showPercent + "%" + "</div>";
			let moveBlock = document.getElementById('stepsVerification__twoStepMove');
			moveBlock.innerHTML = showPercent;
		}

		if (valueSum === 2) {
			document.getElementById('stepsVerification__buttonResult').disabled = false;
		}

		if (valueSum === 3) {
			document.getElementById('stepsVerification__textAboveBarTwoStep').textContent = "Всі поля заповнені!";
			document.getElementById('stepsVerification__textAboveBarTwoStep').style.color = "#71D958";
		}
	}
}



function getNumPage(nameInputCurent) {
	if (fieldsImputState[page1].hasOwnProperty(nameInputCurent)) {
		page = page1;
	}

	if (fieldsImputState[page2].hasOwnProperty(nameInputCurent)) {
		page = page2;
	}

	return page;
}







//field testing and validation function
function instantValidation(field) {
	//if the field should be validated
	if (shouldBeValidated(field)) {
		//the field is invalid if:
		//it's required but the value is empty
		//it has a pattern but the (non-empty) value doesn't pass
		var invalid =
			(field.getAttribute("required") && !field.value) ||
			(field.getAttribute("pattern") &&
				field.value &&
				!new RegExp(field.getAttribute("pattern")).test(field.value));
		//add or remove the attribute is indicated by
		//the invalid flag and the current attribute state
		//  if (!invalid && !field.getAttribute("aria-invalid")) {

		let eventTargerName = event.target.name;
		let sumValue = 0;
		let page = 0
		// process haw many free plase left

		// get step page
		page = getNumPage(eventTargerName);

		let currentElement = document.getElementsByName(eventTargerName)[0];





		// when value is true
		if (!invalid) {
			field.setAttribute("aria-invalid", "false");
			currentElement.style.borderColor = "#71D958";
			currentElement.style.borderWidth = "2px";
			currentElement.nextElementSibling.style.visibility = "hidden";
			// field.removeAttribute("aria-invalid");

			fieldsImputState[page][eventTargerName] = 1;
			sumValue = getSumImputsValue(fieldsImputState[page]);
			doProgresBarDrow(sumValue, page);
		}

		else if (invalid) {
			field.setAttribute("aria-invalid", "true");

			currentElement.style.borderColor = "#EB5757";
			currentElement.style.borderWidth = "2px";
			currentElement.nextElementSibling.style.visibility = "visible";

			//  was true but chenge to false
			if (fieldsImputState[page][eventTargerName] === 1) {
				fieldsImputState[page][eventTargerName] = 0;
				sumValue = getSumImputsValue(fieldsImputState[page]);
				doProgresBarDrow(sumValue, page);
			}

		}
	}
}

//now bind a delegated change event
//== THIS FAILS IN INTERNET EXPLORER <= 8 ==//
//addEvent(document, 'change', function(e, target)


//now bind a change event to each applicable for field
let fields = [
	document.getElementsByClassName("stepsVerification__Input")
];


let fieldsPageOne = [
	document.getElementsByClassName("stepOneVerification__Input")
];


let fieldsPageTwo = [
	document.getElementsByClassName("stepTwoVerification__Input")
];

const page1 = 'page1';
const page2 = 'page2';

let nameForm = 0;
let fieldsImputState = new Object();
fieldsImputState[page1] = {};
fieldsImputState[page2] = {};

for (let a = fields.length, i = 0; i < a; i++) {
	for (let b = fields[i].length, j = 0; j < b; j++) {
		// nameForm = fields[i][j].name;
		// console.log(  fields[0][2] );
		// fieldsImputState[page1][nameForm] = 0;

		addEvent(fields[i][j], "change", function (e, target) {
			instantValidation(target);
		});
	}
}


for (let a = fieldsPageOne.length, i = 0; i < a; i++) {
	for (let b = fieldsPageOne[i].length, j = 0; j < b; j++) {
		nameForm = fieldsPageOne[i][j].name;
		fieldsImputState[page1][nameForm] = 0;
	}
}



for (let a = fieldsPageTwo.length, i = 0; i < a; i++) {
	for (let b = fieldsPageTwo[i].length, j = 0; j < b; j++) {
		nameForm = fieldsPageTwo[i][j].name;
		fieldsImputState[page2][nameForm] = 0;
	}
}













