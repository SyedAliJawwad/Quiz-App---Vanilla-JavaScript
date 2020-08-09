const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answserElement = document.getElementById('answer-buttons');

let shuffledQuestions;
let currentQuestionIndex;
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startGame() {
	console.log('started');
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	questionContainer.classList.remove('hide');
	setNextQuestion();
}
function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answserElement.appendChild(button);
	});
}

function resetState() {
	clearStatusClass(document.body);
	nextButton.classList.add('hide');
	while (answserElement.firstChild) {
		answserElement.removeChild(answserElement.firstChild);
	}
}
function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatusClass(document.body, correct);
	Array.from(answserElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct);
	});
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	} else {
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

const questions = [
	{
		question:
			'Which built-in method combines the text of two strings and returns a new string?',
		answers: [
			{ text: 'append()', correct: false },
			{ text: 'concat()', correct: true },
			{ text: 'attach()', correct: false },
			{ text: 'None of the above', correct: false },
		],
	},
	{
		question: 'Can you assign a anonymous function to a variable?',
		answers: [
			{ text: 'True', correct: true },
			{ text: 'False', correct: false },
		],
	},
	{
		question: 'How do you create a function in JavaScript?',
		answers: [
			{ text: 'function myFunc(){}', correct: true },
			{ text: 'function:myFunc(){}', correct: false },
			{ text: 'function = myFunc(){}', correct: false },
		],
	},
	{
		question: 'Which of the following code creates an object?',
		answers: [
			{ text: 'var book = Object()', correct: false },
			{ text: 'var book = new object();', correct: true },
			{ text: 'var book = new OBJECT(); ', correct: false },
			{ text: 'var book = new BOOK();', correct: false },
		],
	},
	{
		question: 'Inside which HTML element do we put the JavaScript?',
		answers: [
			{ text: '<scripting>', correct: false },
			{ text: '<script>', correct: true },
			{ text: '<javascript>', correct: false },
			{ text: '<js>', correct: false },
		],
	},
	{
		question:
			'What is the correct syntax for referring to an external script called "xxx.js"?',
		answers: [
			{ text: '<script name = abc.js>', correct: false },
			{ text: '<script href = abc.js>', correct: false },
			{ text: '<script src = abc.js> ', correct: true },
		],
	},
	{
		question:
			'Which of the following function of Array object adds and/or removes elements from an array?',
		answers: [
			{ text: 'toSource()', correct: false },
			{ text: 'sort()', correct: false },
			{ text: 'splice()', correct: true },
			{ text: 'unshift()', correct: false },
		],
	},
	{
		question: 'Is JavaScript a case-sensitive language?',
		answers: [
			{ text: 'True', correct: true },
			{ text: 'False', correct: false },
		],
	},
	{
		question:
			'Which of the following is a valid type of functions javascript supports?',
		answers: [
			{ text: 'named function', correct: false },
			{ text: 'anonymous fucntion', correct: false },
			{ text: 'Both of the above ', correct: true },
			{ text: 'None of the above ', correct: false },
		],
	},
	{
		question: 'How can you get the type of arguments passed to a function?',
		answers: [
			{ text: 'using typeof operator', correct: true },
			{ text: 'using getTypeOF function', correct: false },
		],
	},
	{
		question:
			'Which of the following type of variable is visible everywhere in your JavaScript code?',
		answers: [
			{ text: 'local variable', correct: false },
			{ text: 'global variable', correct: true },
			{ text: 'Both of the above', correct: false },
			{ text: 'None of the above', correct: false },
		],
	},
];
