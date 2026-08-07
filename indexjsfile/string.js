//略称作成関数
const makeShortWord = (inputWord) => {
	//def const, let
	let shortWord = "";
	let randFloatSum = 0;
	const inputWordLength = inputWord.length;
	
	//inputWordから1/2の確率で文字を選ぶ
	for (const wordLitter of inputWord) {
		const randFloat = Math.random();
		randFloatSum += randFloat;	//for終了時０からinputWordの文字数の間の乱数
		
		if (randFloat < 0.5) {
			shortWord += wordLitter;
		}
	}
	
	//一文字も選ばれない場合
	if (shortWord === "") {
		//文字数以下の整数をランダムに代入
		const inputWordIndexNumber = Math.floor(randFloatSum);
		shortWord += inputWord[inputWordIndexNumber];
	}
	
	return shortWord;
}

const wordSel = {
	//お任せリストのコピーを用意する関数
	wordListAndCopy: ( () => {
		//お任せワードリスト
		const wordList = [
			'マクドナルド',
			'セブンイレブン',
			'パーリーピーポー',
			'HOW ARE YOU?',
			'はい、えどてんせい',
			'パブロ・ディエゴ・ホセ・フランシスコ・デ・パウラ・ホアン・ネポムセーノ・マリーア・デ・ロス・レメディオス・' + 
			'クリスピン・クリスピアーノ・デ・ラ・サンティシマ・トリニダード・ルイス・イ・ピカソ',
			'あいちはパチンコ店がとってもおおく、いっぱいある！',
			'うんどうかいのランチタイム',
			'ミセス・グリーンアップル',
			'RADWINPS',
			'つきにかわっておしおきよ！',
			'チーズ牛丼をひとつおねがいします',
			'次回、城之内死す！',
			'松屋のうまトマハンバーグ定食',
			'プレステーション5',
			'今来たけど三行で説明よろしく',
			'めいたんていコナン',
			'メイドと言ったらアキバのアイドルみたいなもんですからねーそれはちょっと世間は許してくｒえゃすぇんよ',
			'自己防衛、投資、あと海外移住、日本脱出だよね',
			'マツダー！！！、だぁあれを撃っている！！ふざけるなあぁぁ！',
			'エアーコンディショナー',
			'リニアモーターカー',
			'世にも奇妙な物語',
			'連合国軍最高司令官司令部',
			'寿限無寿限無五劫のすりきれ海砂利水魚の水行末・雲来末・風来末、食う寝るところに住むところ'+
			'やぶらこうじのぶらこうじパイポ・パイポ・パイポのシューリンガンシューリンガンのグーリンダイ'+
			'グーリンダイのポンポコピーのポンポコナの長久命の長助',
			'先生はトイレではありません！',
			'リモートコントローラー',
			'クラヴィチェンバロ・コル・ピアノ・エ・フォルテ'
		];

		const wordListCopy = [...wordList]; //コピー
		return {wordList, wordListCopy};
	} )(),

	//選ばれていない中から一つランダムで選ぶ関数
	randomWord() {
		const data = this.wordListAndCopy;//read おまかせlist and copy
		const wordListLength = data.wordList.length;
		const randomIntIndex = Math.floor(Math.random() * wordListLength);
		const selectedWord = data.wordList[randomIntIndex];

		if (wordListLength === 1) {
			data.wordList  = [...data.wordListCopy];//すべて選びきったら初期化
			console.log('OK');
		} else {
			data.wordList.splice(randomIntIndex, 1);//選んだものを消去
			console.log('delete');
		}

		return selectedWord;//お任せワードを一つ返す
	}
};