const buttons = {};
const playerInput = document.getElementById("user-input");
const resultText = document.getElementById("result-text");

document.querySelectorAll(".btn").forEach(btn => {
	buttons[btn.id] = btn;
});

//略称を作るボタン
buttons['make-btn1'].addEventListener('click', function () {
	const inputWord = playerInput.value;
	if (inputWord !== "") {
		const shortWord = makeShortWord(inputWord); //string.js>makeShortWord(inputWord)
		resultText.textContent = shortWord;
	}	
});

//リセットボタン
buttons['make-btn2'].addEventListener('click', function () {
	resultText.textContent = "<ここに出力されます>";
	playerInput.value = "";
});

//おまかせボタン
buttons['make-btn3'].addEventListener('click', function () {
	const preparedWord = wordSel.randomWord();//string.js>
	playerInput.value = preparedWord;
});
