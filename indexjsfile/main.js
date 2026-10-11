const buttons = {};
const playerInput = document.getElementById("user-input");
const resultText = document.getElementById("result-text");

document.querySelectorAll(".btn").forEach(btn => {
	buttons[btn.id] = btn;
});

// 略称を作るボタン
buttons['make-btn1'].addEventListener('click', function () {
	const inputWord = playerInput.value;
	if (inputWord !== "") {
		const shortWord = makeShortWord(inputWord); //string.js>makeShortWord(inputWord)
		resultText.textContent = shortWord;
		window.saveAbbreviationHistory?.(inputWord, shortWord);
	}	
});

// リセットボタン
buttons['make-btn2'].addEventListener('click', function () {
	resultText.textContent = "<ここに出力されます>";
	playerInput.value = "";
});

// おまかせボタン
buttons['make-btn3'].addEventListener('click', function () {
	const preparedWord = wordSel.randomWord();//string.js>
	playerInput.value = preparedWord;
});

// Xで共有ボタン
buttons['share-btn'].addEventListener('click', function () {
	const text = resultText.textContent;
	if (text && text !== "<ここに出力されます>") {
		const shareText = `略称作成サイトで「${text}」が生成されました！`;
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
		window.open(url, '_blank', 'width=550,height=420');
	}
});
