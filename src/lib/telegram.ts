// Sends a message directly to your Telegram chat via the Bot API.
// This runs in the browser (no backend needed), which is why this
// project can now be a fully static site.
//
// SECURITY NOTE: your bot token is bundled into the site's public JS.
// Anyone who inspects your site's network requests or source could
// extract it and send messages through your bot. The only real risk
// is spam/noise in your own Telegram chat — the token can't be used
// to access anything else of yours. If that's a concern later, this
// call would need to move behind a small serverless function instead.

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

export async function sendTelegramNotification(text: string): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn(
      'Telegram not configured: set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in your .env file.'
    );
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    // Fail silently from the user's perspective — a Telegram hiccup
    // shouldn't block them from viewing service details.
    console.error('Telegram notification failed:', error);
  }
}
