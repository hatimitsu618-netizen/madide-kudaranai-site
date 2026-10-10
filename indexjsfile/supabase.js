// Supabaseのブラウザー用設定。ここにはpublishable keyだけを置きます。
const SUPABASE_URL = "https://vprkzfcmqftnzdazdzit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_EOSxhVDsjS2_HF_iRcEHDg_kmeP5N8U";

if (!window.supabase?.createClient) {
	throw new Error("Supabase JavaScriptライブラリを読み込めませんでした。");
}

window.supabaseClient = window.supabase.createClient(
	SUPABASE_URL,
	SUPABASE_PUBLISHABLE_KEY
);
