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
		question: 'What is 2+2?',
		answers: [
			{ text: '4', correct: true },
			{ text: '1', correct: false },
			{ text: '8', correct: false },
			{ text: '6', correct: false },
		],
	},
	{
		question: 'What is 4+2?',
		answers: [
			{ text: '4', correct: false },
			{ text: '1', correct: false },
			{ text: '8', correct: false },
			{ text: '6', correct: true },
		],
	},
	{
		question: 'What is 12-4?',
		answers: [
			{ text: '4', correct: false },
			{ text: '1', correct: false },
			{ text: '8', correct: true },
			{ text: '6', correct: false },
		],
	},
];
