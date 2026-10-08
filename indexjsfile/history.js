const authClient = window.supabaseClient;
const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");
const authStatus = document.getElementById("auth-status");
const authMessage = document.getElementById("auth-message");
const historyPanel = document.getElementById("history-panel");
const historyStatus = document.getElementById("history-status");
const historyList = document.getElementById("history-list");
const HISTORY_TABLE = "abbreviation_history";

function showAuthError(error) {
	console.error(error);
	authMessage.textContent = "認証または履歴の処理に失敗しました。Supabaseの設定を確認してください。";
}

async function loadHistory() {
	const { data, error } = await authClient
		.from(HISTORY_TABLE)
		.select("id, input_word, result_word, created_at")
		.order("created_at", { ascending: false })
		.limit(50);

	if (error) {
		historyStatus.textContent = "履歴を読み込めませんでした。履歴テーブルとRLSの設定を確認してください。";
		console.error(error);
		return;
	}

	historyList.replaceChildren();
	if (!data.length) {
		historyStatus.textContent = "まだ履歴はありません。略称を作るとここに表示されます。";
		return;
	}

	historyStatus.textContent = "最近の50件を表示しています。";
	for (const item of data) {
		const row = document.createElement("li");
		const result = document.createElement("strong");
		const input = document.createElement("span");
		const time = document.createElement("time");

		result.textContent = item.result_word;
		input.textContent = ` ← ${item.input_word}`;
		time.dateTime = item.created_at;
		time.textContent = new Date(item.created_at).toLocaleString("ja-JP");
		row.append(result, input, time);
		historyList.append(row);
	}
}

async function updateAuthUI(session) {
	const user = session?.user;
	loginButton.hidden = Boolean(user);
	logoutButton.hidden = !user;
	historyPanel.hidden = !user;
	authStatus.textContent = user
		? `${user.user_metadata?.full_name || user.email || "ログイン中"} としてログイン中です。`
		: "ログインすると略称の履歴を保存できます。";
	authMessage.textContent = "";

	if (user) {
		await loadHistory();
	} else {
		historyList.replaceChildren();
		historyStatus.textContent = "";
	}
}

loginButton.addEventListener("click", async () => {
	const { error } = await authClient.auth.signInWithOAuth({
		provider: "google",
		options: { redirectTo: window.location.href }
	});
	if (error) showAuthError(error);
});

logoutButton.addEventListener("click", async () => {
	const { error } = await authClient.auth.signOut();
	if (error) showAuthError(error);
});

window.saveAbbreviationHistory = async (inputWord, resultWord) => {
	const { data: { user }, error: userError } = await authClient.auth.getUser();
	if (userError) {
		showAuthError(userError);
		return;
	}
	if (!user) {
		authMessage.textContent = "履歴を保存するにはGoogleでログインしてください。";
		return;
	}

	const { error } = await authClient.from(HISTORY_TABLE).insert({
		user_id: user.id,
		input_word: inputWord,
		result_word: resultWord
	});
	if (error) {
		showAuthError(error);
		return;
	}
	await loadHistory();
};

authClient.auth.onAuthStateChange((_event, session) => {
	void updateAuthUI(session);
});

authClient.auth.getSession().then(({ data: { session }, error }) => {
	if (error) showAuthError(error);
	void updateAuthUI(session);
});
